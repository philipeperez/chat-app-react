import React, { FC, useContext, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  Row,
  Card,
  Space,
  Typography,
} from "antd";
import { blue, green } from "@ant-design/colors";
import { Store } from "antd/lib/form/interface";
import { ChatContext } from "../providers/chat-provider";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const { Title, Link } = Typography;
const { Content } = Layout;

export const Home: FC = () => {
  const [form] = Form.useForm();
  const { connected, connecting, login } = useContext(ChatContext);
  const history = useHistory();

  const onSubmit = (formValues: Store) => {
    const username = formValues.username as string;
    login(username);
  };

  useEffect(() => {
    form.getFieldInstance("username").focus();
    if (process.env.NODE_ENV === "development") {
      form.setFieldsValue({ username: "Philipe" });
      form.submit();
    }
  }, [form]);

  useEffect(() => {
    if (!connected) return;
    history.push(ROUTES.CHAT);
  }, [connected, history]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="space-around" align="middle" style={{ marginTop: "15%" }}>
          <Title style={{ textAlign: "center" }}>
            Chat App
            <br />
            <span style={{ fontSize: 18 }}>
              A simple chat app built with{" "}
              <Link href="https://nodejs.org/" target="_blank">
                Nodejs
              </Link>{" "}
              and{" "}
              <Link href="https://reactjs.org/" target="_blank">
                Reactjs
              </Link>{" "}
            </span>
          </Title>
        </Row>
        <Row justify="space-around" align="middle">
          <Card
            headStyle={{ backgroundColor: blue.primary, color: "white" }}
            title="Login Form"
            bordered={false}
            style={{ width: 500, marginLeft: 20, marginRight: 20 }}
          >
            <Form form={form} onFinish={onSubmit}>
              <Space style={{ width: "100%" }} direction="vertical">
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Username" disabled={connecting} />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ backgroundColor: green[6], borderColor: green[6] }}
                    block
                    disabled={connecting}
                    loading={connecting}
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};
