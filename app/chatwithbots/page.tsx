"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState<{ id: number; sender: string; text: string }[]>([]);  // Local state for messages
  const [newMessage, setNewMessage] = useState('');  // Message being typed
  const [loading, setLoading] = useState(false);  // Loading state

  // Function to send the initial request to start the chat session
  const startChat = async () => {
    try {
      await axios.post('http://localhost:4000/chat/start');
      setMessages([{ id: 0, sender: 'system', text: 'Chat started successfully' }]);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  // Effect to start the chat when the component mounts
  useEffect(() => {
    startChat(); // Start the chat session on mount
  }, []);

  // Function to send a new message to the backend
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return; // Don't send empty messages

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
    };

    setMessages([...messages, newMsg]); // Add the new message to the chat
    setNewMessage('');  // Clear the input
    setLoading(true);  // Set loading while awaiting the response

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:4000/chat/message', {
        message: newMsg.text,
      });

      const reply = {
        id: messages.length + 2,
        text: response.data.response,  // AI response
        sender: 'ai',
      };

      setMessages([...messages, newMsg, reply]);  // Add both user and AI responses
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setLoading(false);  // Turn off loading
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-purple-600 text-white font-bold text-center">
        Chat Application
      </div>

      {/* Messages Display Area */}
      <div className="flex-grow overflow-y-auto p-4 bg-white shadow-inner">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-md w-fit ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Input Area */}
      
            <form onSubmit={handleSendMessage} className='w-full mt-4 flex items-center gap-2 '>
                        <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow p-2 border rounded-md"
                    disabled={loading}  // Disable input when loading
                    />
                    <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
                    disabled={loading}  // Disable button when loading
                    >
                    {loading ? 'Sending...' : 'Send'}
                    </button>
        </form>
      
    </div>
  );
};

export default Chat;
