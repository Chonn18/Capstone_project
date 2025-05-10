import React, { useEffect, useRef, useState } from "react";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import API from "../../API";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const {token, user} = useUser()
    const [url, setUrl] = useState('')
    const { chatId } = useParams() 

    useEffect(() => {
        const establishWebSocketConnection = async () => {
            try {
                // const url = chatId 
                //     ? `ws://localhost:8000/chat/chat-ws/${chatId}/${token}` 
                //     : `ws://localhost:8000/chat/chat-ws/${token}`;
                const socket = new WebSocket(url);
                socket.onopen = () => {
                    console.log("WebSocket connection established");
                    setWs(socket);
                };
                socket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };
                socket.onmessage = (event) => {
                    // console.log(event)
                    const data = JSON.parse(event.data)
                    // console.log(data)
                    const responseMessage = {
                        message: data.message,
                        sentTime: new Date().toLocaleString(),
                        sender: "Bot", 
                        direction : 'incoming',
                        chat: data.chat_data?.chat_name || 'Chat'
                    };
                    setMessages((prevMessages) => [...prevMessages, responseMessage]);
                };
                socket.onclose = () => {
                    console.log("WebSocket connection closed");
                };
                return () => {
                    socket.close();
                };
            } catch (error) {
                console.error("Failed to establish WebSocket connection:", error);
            }
        }
        establishWebSocketConnection()
    }, [url])

    useEffect(() => {
       
        const fetchHistory = async () => {
            try {
                const response = await API.get(`/chat/chat-history/${chatId}`)
                if (response.status===200) {
                    const history = response.data
                    // console.log(history)
                    setMessages(history.map(message => ({
                        message: message.content,
                        sentTime: message.sent_at,
                        senderId: message.sender_id,
                        direction: message.sender_type === 'user' ? 'outgoing' : 'incoming'
                    })))
                }
            } catch (error) {
                console.error(error)
            }
        }
        if (!chatId) {
            setUrl(`ws://localhost:8000/chat/chat-ws?token=${token}`)
            setMessages([])
        } else {
            console.log(chatId)
            setUrl(`ws://localhost:8000/chat/chat-ws?token=${token}&chat_id=${chatId}`);
            fetchHistory()
        }
    
    }, [chatId]);

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
        <div className="h-screen-chat">
            <div className="relative h-full">
                <MainContainer className="h-full">
                    <ChatContainer>
                        <MessageList>
                            {(messages.length > 0) && messages.map((message, index) => (
                                <Message
                                    key={index}
                                    model={{
                                        message: message.message,
                                        sentTime: message.sentTime,
                                        sender: message.sender,
                                        direction: message.direction
                                    }}
                                    title={message.sentTime}
                                />
                            ))}
                        </MessageList>
                        <MessageInput
                            placeholder="Type a message..."
                            className=""
                            autoFocus
                            onSend={handleOnSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};

export default Chat;
