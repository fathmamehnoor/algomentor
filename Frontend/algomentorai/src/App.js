import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import './App.css';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; 
import logo from './assets/logo.png'; 
import SignUpForm from './signup';
import LoginPage from './logins';  // Import your SignIn page

// Sidebar component
const Sidebar = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch topics from the backend
    axios.get('http://localhost:8000/api/topics/')
      .then(response => {
        setTopics(response.data.topics);
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 className="title">AlgoMentorAI</h2>
      <ul className="topics-list" >
        {topics.map((topic, index) => (
          <li key={index}>
            <button className="topic-button" onClick={() => onSelectTopic(topic)}>
              {topic}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Chat Window component with auto-scroll to the latest message
const ChatWindow = ({ messages }) => {
  const chatWindowRef = useRef(null);

  // Auto scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {/* Ensure that messages are rendered in the correct order */}
      {messages.map((msg, index) => (
        <div key={index} className={`chat-bubble ${msg.isUser ? 'user-message' : 'bot-message'}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

// Input Area component
const InputArea = ({ topic, onNewMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Add user message to the chat immediately
      onNewMessage({ text: message, isUser: true });
      
      try {
        const response = await axios.post('http://localhost:8000/api/chat/', {
          message: message,
          topic: topic,
        }, {
          withCredentials: true, // Important if you're using cookies for auth
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Add bot response to the chat
        onNewMessage({ text: response.data.response, isUser: false });
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage(""); // Clear input after sending the message
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
          if (e.key === "Enter") handleSendMessage(); // Send message when pressing "Enter"
        }}
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} /> {/* Send Arrow Icon */}
      </button>
    </div>
  );
};

// Chat Application component (Main Chat Interface)
const ChatApp = () => {
  const [selectedTopic, setSelectedTopic] = useState(''); // State to store selected topic
  const [messages, setMessages] = useState([]); // State to store chat messages

  // Function to handle when a topic is selected
  const handleSelectTopic = (topic) => {
    console.log('Selected topic:', topic);
    setSelectedTopic(topic); // Update the state with the selected topic
  };

  // Function to add a new message
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="container">
      <Sidebar onSelectTopic={handleSelectTopic} />
      <div className="main-area">
        <ChatWindow messages={messages} /> {/* Pass messages to ChatWindow */}
        <InputArea topic={selectedTopic} onNewMessage={handleNewMessage} /> {/* Pass the handler */}
      </div>
    </div>
  );
};

// Main App component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} /> {/* Route for SignIn page */}
        <Route path="/" element={<LoginPage />} /> {/* Route for ChatApp */}
        <Route path="/chat" element={<ChatApp />} /> {/* Route for ChatApp */}
      </Routes>
    </Router>
  );
};

export default App;
