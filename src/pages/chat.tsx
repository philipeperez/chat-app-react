import React, { FC, useEffect, useContext } from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { OnlineUserList, ChatBox, MessageInput } from "../components";
import { ChatContext } from "../providers/chat-provider";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const { Footer, Sider, Content } = Layout;

export const Chat: FC = () => {
  const history = useHistory();
  const { connected, onlineUsers, messages, sendMessage, logout } = useContext(
    ChatContext
  );

  useEffect(() => {
    if (!connected) history.push(ROUTES.HOME);
  }, [connected, history]);

  useEffect(() => {
    const el = document.querySelector(".ant-layout-content");
    el!.scrollTop = el!.scrollHeight;
  }, [messages]);

  return (
    <Layout hasSider className="App" style={{ minHeight: "100vh" }}>
      <Sider breakpoint="sm" theme="light" collapsedWidth="0">
        <OnlineUserList users={onlineUsers} />
        <Button
          icon={<LogoutOutlined />}
          type="primary"
          danger
          onClick={logout}
        >
          Logout
        </Button>
      </Sider>

      <Layout>
        <Content
          style={{
            backgroundColor: "lightgray",
            overflowY: "auto",
            maxHeight: "88vh",
          }}
        >
          <ChatBox messages={messages} />
        </Content>

        <Footer>
          <MessageInput onMessageSubmit={sendMessage} />
        </Footer>
      </Layout>
    </Layout>
  );
};
