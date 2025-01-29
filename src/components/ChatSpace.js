import { useEffect, useMemo, useRef, useState } from "react";
import { chatStore } from "../store/chatStore";
import { addMessage, loadDataFromStorage } from "../store/chatReducer";
import ChatHeader from "./ChatHeader";
import { FiArrowUp } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

const ChatSpace = ({ user }) => {
  const [message, setMessage] = useState("");

  const onMessageChange = (e) => {
    let value = e.target.value;
    setMessage(value);
  };

  const [messages, setMessages] = useState([]);
  const sortMessages = (messages) => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  };

  let chatContainer = useRef(null);

  const scrollToContainerEnd = () => {
    if (chatContainer.current) {
      const dummyElement = document.createElement("div");
      chatContainer.current.appendChild(dummyElement);
      dummyElement.scrollIntoView({ behavior: "smooth" });
      chatContainer.current.removeChild(dummyElement);
    }
  };

   // Load messages from localStorage on page refresh
   useEffect(() => {
    const storedData = localStorage.getItem("chat_room");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      chatStore.dispatch(loadDataFromStorage(parsedData));
      setMessages(parsedData.messages);
      scrollToContainerEnd(); // Scroll to the end on page load
    }
  }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    scrollToContainerEnd();
    let onStorageChange = (event) => {
      if (event.key === "chat_room") {
        let value = event.newValue;
        if (value) {
          let data = JSON.parse(value);
          chatStore.dispatch(loadDataFromStorage(data));
          setMessages(data.messages);
          scrollToContainerEnd();
        }
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  useEffect(() => {
    setMessages(chatStore.getState().chat.messages);
    scrollToContainerEnd();
  }, [chatStore.getState().chat]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    let newMessage = {
      id: Date.now(),
      text: message,
      user,
      timestamp: Date.now(),
    };

    chatStore.dispatch(addMessage(newMessage));

    let storeData = chatStore.getState();

    localStorage.setItem("chat_room", JSON.stringify(storeData.chat));
    setMessage("");

    setMessages(storeData.chat.messages);

    scrollToContainerEnd();
  };

  const [messageSize, setMessageSize] = useState(25);


    // const slicedMessages = useMemo(() => { //useMemo for whenever the dependency changes
    //     let sortedMessages = sortMessages(messages)
    //     let sliceStart = sortedMessages.length - messageSize;
    //     if (sliceStart < 0) { sliceStart = 0 }
    //     return [...sortedMessages].slice(sliceStart)
    // }, [messages, messageSize])

  const slicedMessages = useMemo(() => { //refreshes values whenever dependencies change
    let sortedMessages = sortMessages(messages);
    console.log(sortedMessages)
    // Slice messages from the difference between the total messages and the max message size
    let sliceStart = sortedMessages.length - messageSize;
    if (sliceStart < 0) {
      sliceStart = 0;
    }
    return [...sortedMessages].slice(sliceStart);
  }, [messages, messageSize]);

  const updateMessageSize = () => {
    let messageStack = Math.min((messageSize * 2), messages.length);
    setMessageSize(messageStack)
  }

  return (
    <div className={"chat-space"}>
      <div className={"chat-container"}>
        <ChatHeader />
        <div ref={chatContainer} className="chat-box">
          {
            messageSize < messages.length ?
                <button className="history-button" onClick={() => updateMessageSize()}>View Older Messages <FiArrowUp/> </button>
                : <></>
          }
          {slicedMessages.map((message, index) => {
            return (
              <div
                key={index}
                className={`chat-message ${
                  message.user.name === user.name ? "sent" : "received"
                }`}
              >
                <div className={"message-user"}>{message.user.name}</div>
                <div className={"message-text"}>{message.text}</div>
                <span className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={"box-container"}>
        <form className="chat-input-form" onSubmit={(e) => onMessageSubmit(e)}>
          <input
            value={message}
            onChange={(e) => onMessageChange(e)}
            placeholder={"Type a message"}
          />

          <button className="submit-button" type="submit">Send <IoIosSend/> </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSpace;
