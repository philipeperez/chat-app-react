import React, { createContext, useState, useContext, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import { User, Message, MessageType } from "../types";
import { UserContext } from "./user-provider";

type ChatProviderValue = {
  messages: Message[];
  onlineUsers: User[];
  connecting: boolean;
  connected: boolean;
  error: string;
  sendMessage: (message: string) => void;
  logout: () => void;
  login: (username: string) => void;
};

const contextInitialValue: ChatProviderValue = {
  messages: [],
  onlineUsers: [],
  connecting: false,
  connected: false,
  error: "",
  sendMessage(message: string) {},
  logout() {},
  login() {},
};

const ChatContext = createContext(contextInitialValue);

const ChatProvider: React.FC = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [error, setError] = useState("");
  const logout = () => socket?.disconnect();
  const login = (username: string) => setUser({ name: username });
  const socketOptions: SocketIOClient.ConnectOpts = {
    query: `user=${user?.name}`,
  };
  const sendMessage = (message: string) => {
    socket?.emit("msgToServer", message);
  };

  useEffect(() => {
    console.log("USER", user);
    if (!user) return;
    setConnecting(true);
    setSocket(
      SocketIOClient(
        "https://chat-app-nestjs-vue.herokuapp.com/",
        socketOptions
      )
    );
    return () => {
      socket?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    socket.on("disconnect", () => {
      console.log("DISCONNECTED");
      setUser(null);
      setConnected(false);
    });

    socket.on("connect", () => {
      console.log("CONECTADO", socket);
      user!.id = socket.id;
      setConnecting(false);
      setConnected(true);
    });

    socket.on("msgToClient", (newMessage: Message) => {
      console.log("newIncomingMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("onlineUserlistUpdated", (onlineUsersList: User[]) => {
      console.log("setOnlineUsers", onlineUsersList);
      setOnlineUsers(onlineUsersList);
    });

    socket.on("userConnected", (newMessage: Message) => {
      console.log("onUserConnect", newMessage);
      newMessage.type = MessageType.UserConnected;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket?.on("userDisconnected", (newMessage: Message) => {
      console.log("onUserDisconnect", newMessage);
      newMessage.type = MessageType.UserDisconnected;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  const chatProviderValue: ChatProviderValue = {
    messages,
    onlineUsers,
    connecting,
    connected,
    error,
    sendMessage,
    login,
    logout,
  };
  return (
    <ChatContext.Provider value={chatProviderValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
