import { Dropdown, Modal } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useState } from "react";
import API from "../../API";
import { toaster } from "../ui/toaster";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const MenuItem = ({ 
    text = "", 
    id, 
    onDelete
}) => {
    const [isOpenRename, setIsOpenRename] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [chatName, setChatName] = useState(text);
    const [updatedChatName, setUpdatedChatName] = useState(text);
    const onClick = ({ key }) => {
        // console.log(key);
        if (key === "rename") {
            setIsOpenRename(true);
        } else {
            showDeleteConfirm()
        }
    };
    const items = [
        {
            key: "rename",
            label: "Rename chat",
        },
        {
            key: "delete",
            danger: true,
            label: "Delete chat",
        },
    ];

    const onSubmitRename = async () => {
        try {
            const response = await API.put(`/chat/update-chat/${id}`, {
                chat_name: updatedChatName,
            });
            if (response.status === 200) {
                setChatName(updatedChatName);
                toaster.create({
                    title: "Rename successful",
                    type: "success",
                });
                setIsOpenRename(false);
            }
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Rename failed",
                type: "error",
            });
        }
    };

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this chat?",
            icon: <ExclamationCircleFilled />,
            content: "Delete chat will also erase its messages history",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                console.log("OK");
                await onSubmitDelete()
                onDelete(id)
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const onSubmitDelete = async () => {
        try {
            const response = await API.delete(`/chat/delete-chat/${id}`);
            if (response.status === 200) {
                toaster.create({
                    title: "Delete successful",
                    type: "success",
                });
                setIsOpenDelete(false);
            }
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Delete failed",
                type: "error",
            });
        }
    };

    const onCancel = () => {
        setIsOpenRename(false);
        setUpdatedChatName(text);
    };
    return (
        <div className="w-full">
            <div className="flex justify-between gap-4 items-center w-full">
                
                <p className="flex-1 truncate text-left">{chatName}</p>
                <Dropdown
                    menu={{ items, onClick }}
                    trigger={["click"]}
                    className="text-base"
                >
                    <div className="cursor-pointer rounded-xl">
                        <BsThreeDots />
                    </div>
                </Dropdown>
            </div>
            <Modal
                title="Rename chat"
                open={isOpenRename}
                centered
                onCancel={onCancel}
                onOk={onSubmitRename}
            >
                <Field>
                    <Input
                        placeholder="Enter new chat name"
                        value={updatedChatName}
                        className="border border-gray-200 px-2"
                        onChange={(e) => setUpdatedChatName(e.target.value)}
                    />
                </Field>
            </Modal>
        </div>
    );
};

export default MenuItem;
