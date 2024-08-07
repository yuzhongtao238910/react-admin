import { Card, Col, Row, Statistic } from 'antd';
import { useRef, useEffect } from "react"
import { Space, Table, Tag, Collapse  } from 'antd';
const Item6 = () => {
	return (
		<Space direction="vertical" size={16}>
    <Card
      title="Default size card"
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card
      size="small"
      title="Small size card"
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
	)
}
export default Item6