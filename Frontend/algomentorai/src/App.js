import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import './App.css';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSignOutAlt, faRedo } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png'; 
import SignUpForm from './signup';
import LoginPage from './logins';  // Import your SignIn page


const Sidebar = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch topics from the backend
    axios
      .get("http://localhost:8000/api/topics/")
      .then((response) => {
        setTopics(response.data.topics);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  const handleLogout = () => {
    // Handle logout (e.g., clearing session, redirecting to login)
    if (window.confirm("Are you sure you want to logout?")) {
      window.location.href = "/"; // Redirect to login page
      localStorage.clear(); // Optionally clear any stored authentication data
    }
  };

  return (
    <div className="sidebar">
      <a href="#" onClick={handleLogout} className="logout-link">
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
        Logout
      </a>

      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 className="title">AlgoMentorAI</h2>

      <ul className="topics-list">
        {topics.map((topic, index) => (
          <li key={index}>
            <button
              className="topic-button"
              onClick={() => onSelectTopic(topic)}
            >
              {topic}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Chat Window component with auto-scroll to the latest message
const ChatWindow = ({ messages, onRefreshChat }) => {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {/* Refresh button on the top-right */}
      <button className="refresh-button" onClick={onRefreshChat}>
        <FontAwesomeIcon icon={faRedo} />
      </button>

      {/* Render chat messages */}
      {messages.map((msg, index) => (
        <div key={index} className={`chat-bubble ${msg.isUser ? 'user-message' : 'bot-message'}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

// Input Area component (unchanged)
const InputArea = ({ topic, onNewMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      onNewMessage({ text: message, isUser: true });

      try {
        const response = await axios.post('http://localhost:8000/api/chat/', {
          message: message,
          topic: topic,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        onNewMessage({ text: response.data.response, isUser: false });
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
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
          if (e.key === "Enter") handleSendMessage();
        }}
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

// Chat Application component (Main Chat Interface)
const ChatApp = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleRefreshChat = () => {
    setMessages([]); // Clear chat messages when refresh button is clicked
  };

  return (
    <div className="container">
      <Sidebar onSelectTopic={handleSelectTopic} />
      <div className="main-area">
        <ChatWindow messages={messages} onRefreshChat={handleRefreshChat} />
        <InputArea topic={selectedTopic} onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
};

// Main App component with routing (unchanged)
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </Router>
  );
};

export default App;
