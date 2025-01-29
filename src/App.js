import React, {useEffect, useState} from "react";
import UserNamePrompt from "./components/UserNamePrompt";

import "./App.css";
import {chatStore} from "./store/chatStore";
import {addUser, loadDataFromStorage} from "./store/chatReducer";
import ChatSpace from "./components/ChatSpace";

const App = () => {

  const [ user, setUser ] = useState(null);
  const handleUserNameSubmit = (name) => {
    let userObj = {
      name,
      id: Date.now(),
    }
    sessionStorage.setItem("user_data", JSON.stringify(userObj));




    try {
      let savedUsers = [];
      let savedData = localStorage.getItem("chat_room");

      if (savedData != null) {
        let data = JSON.parse(savedData);
        if (data.users && data.users.length > 0) {
          savedUsers = [ ...data.users ]

        }

        savedUsers.push(userObj)
        savedData.users = savedUsers;
      } else {
        savedData = {
          messages: [],
          users: [
              userObj
          ]
        }
      }

      localStorage.setItem("chat_room", JSON.stringify(savedData))
    } catch (e) {}


    chatStore.dispatch(addUser(userObj))
    setUser(userObj)

   /* localStorage.setItem("userName", name);
    setUserName(name);
    setIsUserNameSet(true);*/
  };


  useEffect(() => {
    let savedData = localStorage.getItem("chat_room");
    if (savedData != null) {
      savedData = JSON.parse(savedData);
    } else {
      savedData = {
        messages: [],
        users: []
      }
    }

    console.log({ savedData })
    chatStore.dispatch(loadDataFromStorage(savedData))

    if (sessionStorage.getItem("user_data") != null) {
      let userData = JSON.parse(sessionStorage.getItem("user_data"))
      setUser(userData)
    }
  }, []);

  return (
    <div className="app">
      {user == null ? (
              <UserNamePrompt onUserNameSubmit={handleUserNameSubmit}/>
          ) :
          <ChatSpace user={user}/>
      }
    </div>
  );
};

export default App;
