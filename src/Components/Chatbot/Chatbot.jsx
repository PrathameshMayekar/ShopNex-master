// src/components/Chatbot.jsx
import React, { useState } from 'react';
import './Chatbot.css';  // Add some basic styles
import intents from './intents.json';  // Import intents from the same folder

const Chatbot = () => {
  const [messages, setMessages] = useState([{ user: "bot", text: "Hello! How can I assist you?" }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true); // State to manage visibility of the chatbot

  const getResponse = (userInput) => {
    let matchedIntent = null;

    intents.intents.forEach(intent => {
      intent.patterns.forEach(pattern => {
        const regex = new RegExp(pattern, 'i'); // Case insensitive matching
        if (regex.test(userInput)) {
          matchedIntent = intent;
        }
      });
    });

    if (matchedIntent) {
      const randomResponse = matchedIntent.responses[Math.floor(Math.random() * matchedIntent.responses.length)];
      return randomResponse;
    } else {
      return intents.intents.find(intent => intent.tag === "noanswer").responses[0];
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: "user", text: input }]);

    // Get the response based on user input
    const botResponse = getResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { user: "bot", text: botResponse }]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        Open Chatbot
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h3>Chatbot</h3>
        <button onClick={toggleChatbot} className="close-button">X</button>
      </div>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={handleKeyPress} // Handle Enter key
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
