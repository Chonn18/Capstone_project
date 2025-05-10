import React, { useState } from "react";
import { MessageInput } from "@chatscope/chat-ui-kit-react"; 
import { useNavigate } from "react-router-dom"; 

const Home = () => {
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 
  const handleSendQuestion = (message) => {
    if (message.trim() !== "") {
      navigate(`/chat/${message}`);
      setMessage(""); 
    }
  };

  const handleOnSend = (message) => {
    const messageObj = {
        message: message,
        sentTime: formatDate(new Date()),
        sender: user.username,
        direction : 'outgoing'
    };

    if (ws) {
        try {
            ws.send(JSON.stringify(messageObj));
            setMessages((prevMessages) => [...prevMessages, messageObj]);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    } else {
        console.error("WebSocket connection is not established");
    }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-full p-8 ">
        <h1 className="text-2xl text-slate-800 font-bold text-center mb-8">Ask a Question</h1>
        <div className="flex justify-center items-center">
          {/* <MessageInput
            placeholder="Ask a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
            onSend={handleSendQuestion} 
          /> */}
          <MessageInput
              placeholder="Type a message..."
              className=" text-xl w-10/12 "
              autoFocus
              onSend={handleSendQuestion}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
