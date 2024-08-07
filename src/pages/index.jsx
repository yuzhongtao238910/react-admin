import { Outlet } from "react-router-dom";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { echarts } from '../graphs';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useRef, useEffect } from "react"
import { Space, Table, Tag, Collapse  } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export const Home = () => {
	return (
		<div>
		  <Outlet />
		</div>
	)
}
export const Item1 = () => {
	const target = useRef(null)
	useEffect(() => {
		const myChart = echarts.init(target.current);
myChart.setOption({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
});
	}, [])
	return (
		<div ref={target} style={{
			width: "500px",
			height: '300px'
		}}>
			
		</div>
	)
}
export const Item2 = () => {
	const target = useRef(null)
	useEffect(() => {
		const myChart = echarts.init(target.current);
myChart.setOption({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line'
    }
  ]
});
	}, [])
	return (
		<div ref={target} style={{
			width: "500px",
			height: '300px'
		}}>222</div>
	)
}
export const Sub1 = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}
export const Item3 = () => {
	return (
		<div>
			<Table columns={columns} dataSource={data} />;
		</div>
	)
}
export const Item4 = () => {
	return (
		 <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
	)
}
export const List  = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];
export const Item5 = () => {
	const onChange = (key) => {
    console.log(key);
  };
	return (
		<Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
	)
}
export const Item6 = () => {
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
