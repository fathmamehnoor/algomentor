import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import './App.css';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; 
import logo from './assets/logo.png'; 
import SignIn from './signin';  // Import your SignIn page
import Login from './components/logins'; 

// Sidebar component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 className="title">AlgoMentorAI</h2>
    </div>
  );
};

// Chat Window component
const ChatWindow = () => {
  return (
    <div className="chat-window">
      <div className="chat-bubble user-message">Hello, how can I help you?</div>
      <div className="chat-bubble bot-message">Hi! I have a question.</div>
    </div>
  );
};

// Input Area component
const InputArea = () => {
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post("/api/chat/", { message: message, topic: "bubble sort" });
        setChatResponse(response.data.response);  // Set chat response from the backend
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setMessage("");  // Clear input after sending the message
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type a new message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();  // Send message when pressing "Enter"
        }}
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />  {/* Send Arrow Icon */}
      </button>
      {chatResponse && <div className="chat-bubble bot-message">{chatResponse}</div>}
    </div>
  );
};


// Chat Application component (Main Chat Interface)
const ChatApp = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-area">
        <ChatWindow />
        <InputArea />
      </div>
    </div>
  );
};

// Main App component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} /> {/* Route for SignIn page */}
        <Route path="/" element={<ChatApp />} /> {/* Route for ChatApp */}
      </Routes>
    </Router>
  );
};

export default App;
