import { Card, Tag, Input, Tabs, Row, Col, List, Space, Avatar, Popover, QRCode   } from "antd";
import {  useState } from "react";
const { Meta } = Card;
const tagInitVal = [
  { value: "足球", color: "magenta" },
  { value: "跑步", color: "volcano" },
  { value: "web前端", color: "orange" },
  { value: "90后", color: "gold" },
];
const data = [
  {
    title: '平平无奇篮球小菜鸡',
    description: "人菜瘾又大，后仰跳投只剩下投了，完全跳不起来"
  },
  {
    title: '没事看看电脑，不过不打游戏',
    description: "因为吃鸡进房子，我就会头晕，王者荣耀只能全心全力的打一局"
  },
  {
    title: '电视剧迷，看到根本停不下来',
    description: "那必须是武侠电视剧啊"
  },
  {
    title: '军事超级爱好者，上了战场能活1秒钟',
    description: "看德三吗？幻想了上了一波战场，一枪没放直接为国捐躯"
  },
];
const Person = () => {
  const content = (
  <div>
    <QRCode
    errorLevel="H"
    value="hello"
    icon="/qr.jpg"
  />
  </div>
);
  // const [tags, setTag] = useState(tagInitVal);
  const [isInput, setInput] = useState(false);
  const [value, setVal] = useState("");
  return (
  	<div className="person-container">
      <Row gutter={6}>
        <Col span={6}>
          <Card
            cover={
              <img
                alt="example"
                src="/people.svg"
              />
            }
          >
            {/*<Popover content={content} title="欢迎扯蛋">*/}
            <Meta title="于忠涛" description="" />
            {/*</Popover>*/}

            {/*<div>
              <p>

                Web前端
                <span>123</span>
              </p>
              <p>

                广东·深圳
              </p>
              <p>

                <a
                  href="https://www.cnblogs.com/kongyijilafumi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  博客地址
                </a>
              </p>
              <p>

                <a
                  href="https://github.com/kongyijilafumi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  github地址
                </a>
              </p>
              <p>

                <a
                  href="https://jq.qq.com/?_wv=1027&k=pzP2acC5"
                  target="_blank"
                  rel="noreferrer"
                >
                  qq交流群
                </a>
              </p>
            </div>
            <div className="tags">
              <div className="title">标签</div>
              
            </div>*/}
          </Card>
        </Col>
        <Col span={18}>
          <Card>
             <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`/${index+1}.png`} />}
          title={<span>{item.title}</span>}
          description={item.description}
        />
      </List.Item>
    )}
  />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Person