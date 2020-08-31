import React, { FC } from "react";
import { List, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "../types";
import { blue } from "@ant-design/colors";

type OnlineUsersProps = {
  users: User[];
};

const { Title } = Typography;

export const OnlineUserList: FC<OnlineUsersProps> = React.memo(({ users }) => {
  return (
    <List
      dataSource={users}
      header={<Title level={4}>Online Users ({users.length})</Title>}
      renderItem={(user: User) => (
        <List.Item style={{ textAlign: "left" }}>
          <List.Item.Meta
            title={user.name}
            avatar={
              <Avatar icon={<UserOutlined style={{ color: blue.primary }} />} />
            }
          />
        </List.Item>
      )}
    />
  );
});
