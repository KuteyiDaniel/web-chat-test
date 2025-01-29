// import { render, screen, fireEvent } from "@testing-library/react";
// import ChatSpace from "./ChatSpace"; 

// describe("ChatSpace Component Tests", () => {
//   const mockUser = { name: "John" };

//   beforeEach(() => {
//     // Clear localStorage before each test
//     localStorage.clear();
//   });

//   test("renders messages in the correct order", () => {
//     const mockMessages = [
//       { id: 1, text: "Hello", user: { name: "Jane" }, timestamp: 1000 },
//       { id: 2, text: "Hi there", user: { name: "John" }, timestamp: 2000 },
//     ];

//     // Mock localStorage
//     localStorage.setItem(
//       "chat_room",
//       JSON.stringify({ messages: mockMessages })
//     );

//     render(<ChatSpace user={mockUser} />);

//     const firstMessage = screen.getByText(/Hello/);
//     const secondMessage = screen.getByText(/Hi there/);

//     expect(firstMessage).toBeInTheDocument();
//     expect(secondMessage).toBeInTheDocument();
//   });

//   test("shows 'View Older Messages' when scrolled to the top", () => {
//     const mockMessages = new Array(50).fill(null).map((_, index) => ({
//       id: index,
//       text: `Message ${index + 1}`,
//       user: { name: index % 2 === 0 ? "John" : "Jane" },
//       timestamp: Date.now() + index,
//     }));

//     localStorage.setItem(
//       "chat_room",
//       JSON.stringify({ messages: mockMessages })
//     );

//     const { container } = render(<ChatSpace user={mockUser} />);
//     const chatBox = container.querySelector(".chat-box"); // based on DOM structure

//     fireEvent.scroll(chatBox, { target: { scrollTop: 0 } });

//     const viewOlderPrompt = screen.getByText(/View Older Messages/);
//     expect(viewOlderPrompt).toBeInTheDocument();
//   });

//   test("adds a new message when submitted", () => {
//     render(<ChatSpace user={mockUser} />);

//     const input = screen.getByPlaceholderText(/Type a message/);
//     const sendButton = screen.getByText(/Send/);

//     fireEvent.change(input, { target: { value: "Hello, World!" } });
//     fireEvent.click(sendButton);

//     const newMessage = screen.getByText(/Hello, World!/);
//     expect(newMessage).toBeInTheDocument();
//   });

//   test("loads older messages when 'View Older Messages' is clicked", () => {
//     const mockMessages = new Array(100).fill(null).map((_, index) => ({
//       id: index,
//       text: `Message ${index + 1}`,
//       user: { name: index % 2 === 0 ? "John" : "Jane" },
//       timestamp: Date.now() + index,
//     }));

//     localStorage.setItem(
//       "chat_room",
//       JSON.stringify({ messages: mockMessages })
//     );

//     render(<ChatSpace user={mockUser} />);

//     const viewOlderPrompt = screen.getByText(/View Older Messages/);
//     fireEvent.click(viewOlderPrompt);

//     const olderMessage = screen.getByText(/Message 1/);
//     expect(olderMessage).toBeInTheDocument();
//   });

//   test("persists messages in localStorage", () => {
//     render(<ChatSpace user={mockUser} />);

//     const input = screen.getByPlaceholderText(/Type a message/);
//     const sendButton = screen.getByText(/Send/);

//     fireEvent.change(input, { target: { value: "Persist this message!" } });
//     fireEvent.click(sendButton);

//     const storedData = JSON.parse(localStorage.getItem("chat_room"));
//     expect(storedData.messages).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ text: "Persist this message!" }),
//       ])
//     );
//   });
// });
