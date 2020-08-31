import React, { FC } from "react";
import { Message, MessageType } from "../types";
import { Card, Typography } from "antd";

const { Title } = Typography;

type ChatBoxProps = {
  messages: Message[];
};

type CardMessageProps = {
  message: Message;
};

const UserEvent: FC<CardMessageProps> = ({ message }) => {
  const userDisconnected = message.type === MessageType.UserDisconnected;

  return (
    <div>
      <Card
        style={{
          borderRadius: 10,
          margin: 30,
          backgroundColor: userDisconnected ? "red" : "green",
        }}
        size="small"
        bodyStyle={{
          maxHeight: 40,
          paddingTop: 5,
        }}
        bordered={false}
      >
        <Title level={4} style={{ color: "white" }}>
          {`${message.user.name} ${message.txt}`}
        </Title>
      </Card>
    </div>
  );
};

const MessageCard: FC<CardMessageProps> = ({ message }) => {
  const date = new Date(message.time);
  return (
    <Card
      style={{
        borderRadius: 10,
        margin: 30,
        textAlign: "left",
      }}
      bodyStyle={{
        paddingTop: 10,
        paddingRight: 24,
        paddingBottom: 5,
        paddingLeft: 24,
      }}
      bordered={false}
    >
      <Title level={4}>
        {date.getHours()}:{date.getMinutes()} - {message.user.name}:{" "}
        <span style={{ fontWeight: "normal" }}>{message.txt}</span>
      </Title>
    </Card>
  );
};

export const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {[MessageType.UserConnected, MessageType.UserDisconnected].includes(
            message.type
          ) ? (
            <UserEvent message={message} />
          ) : (
            <MessageCard message={message} />
          )}
        </div>
      ))}
    </div>
  );
};
