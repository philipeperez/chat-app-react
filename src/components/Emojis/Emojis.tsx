import React, { FC, useState } from "react";
import { SmileOutlined, CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Button, Popover, Tooltip } from "antd";
import { categories, getEmojisByCategory } from "./emojiSource";

const { TabPane } = Tabs;

type EmojisProps = {
  onSelectEmoji: (emoji: string) => void;
};

export const Emojis: FC<EmojisProps> = ({ onSelectEmoji }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <Popover
      trigger="click"
      visible={popoverVisible}
      arrowPointAtCenter={true}
      overlayStyle={{ width: "80%", textAlign: "justify" }}
      content={
        <Tabs
          centered
          // renderTabBar={(props, TabBar) => (
          //   <TabBar
          //     animated
          //     centered
          //     defaultActiveKey="1"
          //     {...props}
          //     style={{
          //       position: "absolute",
          //       width: "95%",
          //       backgroundColor: "white",
          //     }}
          //   />
          // )}
          style={{
            height: 300,
            overflowY: "auto",
          }}
        >
          {categories.map((category, i) => {
            return (
              <TabPane
                key={i + 1}
                tab={
                  <Tooltip title={category.name}>
                    <FontAwesomeIcon
                      style={{ marginLeft: 10, marginRight: 10 }}
                      size="2x"
                      icon={category.icon}
                    />
                  </Tooltip>
                }
              >
                <div
                  style={{
                    textAlign: "justify",
                    textJustify: "inter-character",
                  }}
                >
                  {getEmojisByCategory(category.name).map((emojiObj, i) => (
                    <div
                      key={i}
                      onClick={(e) => onSelectEmoji(emojiObj.char)}
                      style={{ float: "left" }}
                    >
                      <span
                        key={i}
                        style={{ cursor: "pointer", fontSize: 30, margin: 5 }}
                        role="img"
                        aria-label={emojiObj.name}
                      >
                        {emojiObj.char}
                      </span>
                    </div>
                  ))}
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      }
    >
      <Button
        onClick={() => setPopoverVisible(!popoverVisible)}
        type="primary"
        icon={popoverVisible ? <CloseOutlined /> : <SmileOutlined />}
      />
    </Popover>
  );
};
