import React, { useEffect, useState } from "react";
import botImage from "../../assets/bot.png";
import { Menu } from "antd";
import { ImportOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import { useUser } from "../../context/UserContext";

import MenuItem from "../MenuItem";

const Nav = () => {
    const [menuItems, setMenuItems] = useState([
        // {
        //     key: "new-chat",
        //     label: "New Chat",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 512 512"
        //             className="w-5"
        //         >
        //             <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
        //         </svg>
        //     ),
        // },
        // {
        //     key: "chat",
        //     label: "Chat",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 576 512"
        //             className="w-5"
        //         >
        //             <path d="M284 224.8a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 284 224.8zm-110.5 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 173.6 224.8zm220.9 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 394.5 224.8zm153.8-55.3c-15.5-24.2-37.3-45.6-64.7-63.6-52.9-34.8-122.4-54-195.7-54a406 406 0 0 0 -72 6.4 238.5 238.5 0 0 0 -49.5-36.6C99.7-11.7 40.9 .7 11.1 11.4A14.3 14.3 0 0 0 5.6 34.8C26.5 56.5 61.2 99.3 52.7 138.3c-33.1 33.9-51.1 74.8-51.1 117.3 0 43.4 18 84.2 51.1 118.1 8.5 39-26.2 81.8-47.1 103.5a14.3 14.3 0 0 0 5.6 23.3c29.7 10.7 88.5 23.1 155.3-10.2a238.7 238.7 0 0 0 49.5-36.6A406 406 0 0 0 288 460.1c73.3 0 142.8-19.2 195.7-54 27.4-18 49.1-39.4 64.7-63.6 17.3-26.9 26.1-55.9 26.1-86.1C574.4 225.4 565.6 196.4 548.3 169.5zM285 409.9a345.7 345.7 0 0 1 -89.4-11.5l-20.1 19.4a184.4 184.4 0 0 1 -37.1 27.6 145.8 145.8 0 0 1 -52.5 14.9c1-1.8 1.9-3.6 2.8-5.4q30.3-55.7 16.3-100.1c-33-26-52.8-59.2-52.8-95.4 0-83.1 104.3-150.5 232.8-150.5s232.9 67.4 232.9 150.5C517.9 342.5 413.6 409.9 285 409.9z" />
        //         </svg>
        //     ),
        //     // children : chats.map(chat => ({
        //     //     key : `chat/${chat.id}`,
        //     //     label : chat.chat_name,
        //     // }))
        // },
        {
            key: "import",
            label: "Import data",
            icon: <ImportOutlined style={{ fontSize: "20px" }} />,
        },
        {
            key: "visualization",
            label: "Visualization",
            icon: <NodeIndexOutlined style={{ fontSize: "20px" }} />,
        },
        // {
        //     key: "about",
        //     label: "About us",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 576 512"
        //             className="w-5"
        //         >
        //             <path d="M512 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l448 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80l-64 0zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0z" />
        //         </svg>
        //     ),
        // },
    ]);
    const navigate = useNavigate();
    const { token } = useUser();
    const [chats, setChats] = useState([]);

    const handleOnClick = (e) => {
        // console.log(e.key)
        navigate(e.key)
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await API.get("/chat/all-chats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const chats = response.data.map((chat) => ({
                        key: `chat/${chat.id}`,
                        label: <MenuItem text={chat.chat_name} id={chat.id} onDelete={handleDelete}/>,
                    }));
                    setChats(chats);
                    console.log(chats)

                    setMenuItems((prevItems) =>
                        prevItems.map((item) =>
                            item.key === "chat"
                                ? { ...item, children: chats }
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchChats();
    }, []);

    const handleDelete = (id) => {
        setChats((prevChats) => {
            const updatedChats = prevChats.filter((chat) => chat.key !== `chat/${id}`);
            setMenuItems((prevItems) =>
                prevItems.map((item) =>
                    item.key === "chat" ? { ...item, children: updatedChats } : item
                )
            );
            return updatedChats;
        });
    }

    return (
        <div className="flex flex-col justify-center items-start w-full overflow-auto">
            {/* <div className="flex text-lg w-full py-4 pl-4 font-semibold items-center gap-3 mb-6">
                <img src={botImage} className="w-10"></img>
                <h1>Cardio Chatbot</h1>
            </div> */}
            <Menu
                onClick={handleOnClick}
                mode="inline"
                items={menuItems}
                className="text-base bg-inherit font-base default-font mx-0 px-0 select-none"
                inlineIndent={32}
            ></Menu>
        </div>
    );
};

export default Nav;
