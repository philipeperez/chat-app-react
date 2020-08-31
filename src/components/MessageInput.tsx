import React, { FC, KeyboardEvent, useEffect, useRef, useContext } from "react";
import { Form, Mentions } from "antd";
import { Store } from "antd/lib/form/interface";
import { ChatContext } from "../providers/chat-provider";

const { Option } = Mentions;

type MessageInputProps = {
  onMessageSubmit: (message: string) => void;
};

export const MessageInput: FC<MessageInputProps> = React.memo(
  ({ onMessageSubmit }) => {
    const isComponentMounted = useRef(true);
    const { onlineUsers } = useContext(ChatContext);
    useEffect(() => {
      return () => {
        isComponentMounted.current = false;
      };
    }, []);
    const [form] = Form.useForm();
    const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (isComponentMounted) inputRef.current?.focus();
    }, [inputRef]);

    const handleKeyupMessageInput = (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        form.submit();
      }
    };

    const submitForm = (values: Store) => {
      const { message } = values;
      if (!message) return;
      onMessageSubmit(message);
      form.resetFields();
      inputRef.current?.focus();
    };

    return (
      <Form form={form} onFinish={submitForm} style={{ textAlign: "left" }}>
        <Form.Item name="message">
          <div onKeyPress={handleKeyupMessageInput}>
            <Mentions placeholder="Type a message" ref={inputRef}>
              {onlineUsers.map((user) => (
                <Option key={user.id} value={user.name}>
                  {user.name}
                </Option>
              ))}
            </Mentions>
          </div>
        </Form.Item>
      </Form>
    );
  }
);
