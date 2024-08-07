import instance from "./utils/request"
import {
  Home as HomeView,
  Item1,
  Item2,
  Item3,
  Item4,
  Item5,
  Item6,
  Sub1,
  List
} from "./pages"
import Money from "./pages/money"
import Person from "./pages/person"
import { useSelector, useDispatch} from "react-redux"
import { Button, Checkbox, Form, Input } from 'antd';
import { Dropdown, Avatar, Layout, Menu, theme, Spin } from "antd";
import { useState, useEffect } from "react"
import { useRoutes, Outlet, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {
  getOpenedKeys,
  getSelectedKeys,
  flatMethod,
  ifHasChild,
  getPath 
} from "./utils"
const mapKey = {
  "HomeView": HomeView,
  "Item1":    Item1,
  "Item2":    Item2,
  "Item3":    Item3,
  "Item4":    Item4,
  "Item5":    Item5,
  "Item6":    Item6,
  "Sub1":     Sub1,
  "List":     List,
  "Person": Person,
  "Money": Money
}
const { Header, Content, Footer, Sider } = Layout;
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const items = [
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '7',
            label: 'Option 7',
          },
          {
            key: '8',
            label: 'Option 8',
          },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: '11',
        label: 'Option 11',
      },
      {
        key: '12',
        label: 'Option 12',
      },
    ],
  },
];
const genItems = array => {
  let res = []
  for(let i = 0; i < array.length; i++) {
    const node = array[i]
    // debugger
    // console.log(getPath(node.id))
    // debugger
    const curNode = {
      key: node.key,
      // label: node.label
      label: ifHasChild(node.id) ? node.label : <Link to={getPath(node.id)}>{node.label}</Link>
    }
    res.push(curNode)
    if (Array.isArray(node.children) && node.children.length) {
      curNode.children = genItems(node.children)
    }
  }
  return res
}

function LayoutView() {

  // 
  
  const dispatch = useDispatch()
  const location = useLocation()
  

  const menu = useSelector(state => state.menu)
  // console.log(menu)
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onSubMenuChange = evt => {
    console.log(evt, "sub")
    setOpenedKeys(evt)
  }
  const onMenuItemClick = (e) => {
    console.log('click ', e);
    setSelectedKeys(e.key)
  };
  const [menus, setMenus] = useState([])
  const [openedKeys, setOpenedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    const aa = genItems(menu?.tree || [])
    // console.log(aa)
    setMenus(aa)
    setLoading(false)
    // console.log("---")
    // setMenus(items)
    // fetch("/menu.json").then(res => res.json()).then(res => {
    //   setMenus(items)
    // })
  }, [menu])
  useEffect(() => {
    // debugger
    const key1 = getOpenedKeys(location.pathname)
    const key2 = getSelectedKeys(location.pathname)
    // console.log(key1, key2)
    // console.log(238910)
    // setTimeout(() => {
      setOpenedKeys(key1)
      setSelectedKeys(key2)
    // }, 0)
    
  }, [menus])
  useEffect(() => {
    
  }, [location.pathname])
  const navigate = useNavigate();
  const changePass = () => {
    console.log("修改密码")
  }
  const logOut = () => {
    console.log("退出")
    dispatch({
      type: "REMOVE_USER"
    })
    dispatch({
      type: "REMOVE_TREE_DATA"
    })
    dispatch({
      type: "REMOVE_FLAT_DATA"
    })
    localStorage.removeItem("token")
    navigate(`/login?pathname=${encodeURIComponent(location.pathname)}`)
  }
  const itemDrop = [
    {
      label: <span onClick={changePass}>修改密码</span>,
      key: '0',
    },
    {
      label: <span onClick={logOut} style={{width: "100%"}}>退出登录</span>,
      key: '1',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  const handleClickDrop = evt => {
    // console.log(evt)
  }
  // console.log(location)
  if (location.pathname === '/') {
    return <Navigate to="/sub/item1" replace={true} />
  }
  return (
    <Layout>
      <Sider
        style={{height: '100vh', backgroundColor: "#fff"}}
      >
        <div style={{
          height: "64px",
        }}>
          <img style={{
            width: '100%',
            height: '100%',

          }} src="/33.jpg" />
        </div>
        <Menu mode="inline" 
        openKeys={openedKeys}
        selectedKeys={selectedKeys}
        onClick={onMenuItemClick}
        onOpenChange={onSubMenuChange}
        items={menus} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Dropdown
    menu={{
      items: itemDrop,
    }}
    trigger={['click']}
    onClick={handleClickDrop}
  >
          <Avatar
            style={{
              backgroundColor: '#87d068',
              float: 'right',
              marginTop: '16px',
              marginRight: '16px',
              cursor: 'pointer'
            }}
            icon={<UserOutlined />}
          />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              height: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Spin tip="Loading" size="small" fullscreen={true} spinning={loading}>
              {content}
            </Spin>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
function Home() {
  return (
    <div>
      home
    </div>
  )
}

function Login() {
  const location = useLocation()
  // console.log(location)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogin = () => {
    dispatch({
      type: "SET_USER",
      data: "238910"
    })
    if (location.search) {
      navigate(`${decodeURIComponent(location.search.slice(10))}`);
    } else {
      navigate("/");
    }
    
  }
  const onFinish = async (values) => {
  console.log('Success:', values);
  // debugger
  const res = await instance.get("http://localhost:9090/login", {
    params: {
      username: values.username,
      password: values.password
    }
  })
  // console.log(res)
  const { username, token} = res.data
  // debugger
  localStorage.setItem("token", token)
    dispatch({
      type: "SET_USER",
      data: username
    })
    if (location.search) {
      navigate(`${decodeURIComponent(location.search.slice(10))}`);
    } else {
      navigate("/");
    }
    
};
const onFinishFailed = (errorInfo) => {
  // console.log('Failed:', errorInfo);
};
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/*<Button type="primary" onClick={handleLogin}>登录</Button>*/}
      <Form
        name="basic"
        labelCol={{
      span: 8,
        }}
        wrapperCol={{
      span: 16,
        }}
        style={{
      maxWidth: 600,
        }}
        initialValues={{
      remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
function com(name) {
  const Component = mapKey[name]
  return (<Component />)
}
const Any = () => {
  return (
    <div>304</div>
  )
}

const buildMenuTree = array => {
  const map = {};  
  array.forEach(item => {  
    map[item.id] = { ...item }; // 复制对象并初始化 children 数组  
  }); 
  const tree = [];  
  array.forEach(item => {  
    // 根节点的 parentId 通常设为 null 或 0（在这个例子中为 0）  
    if (item.parentId === 0) {  
      tree.push(map[item.id]); // 将根节点添加到树中  
    } else {  
      // 查找父节点并添加当前节点到父节点的 children 数组中  
      if (map[item.parentId]) {  
        if (map[item.parentId].children) {
          map[item.parentId].children.push(map[item.id]);  
        } else {
          map[item.parentId].children = []
          map[item.parentId].children.push(map[item.id]);  
        }
        
      }  
    }  
  });  
        
  return tree;  
}

function App() {
  const [loading, setLoading] = useState(true)
  const genRoutes = array => {
    let res = []
    for(let i = 0; i < array.length; i++) {
      const node = array[i]
      const Component = mapKey[node.element]
      let curNode = {
        path: node.key,
        element: com(node.element) ,
      }
      // console.log(node)
      res.push(curNode)
      if (Array.isArray(node.children) && node.children.length) {
        curNode.children = genRoutes(node.children)
      }
    }
    return res
  }

  const menu = useSelector(state => state.menu)
  const user = useSelector(state => state.user)
  
  const dispatch = useDispatch()
  const r = [
    {
      path: "/",
      element: <LayoutView />,
      children: genRoutes(menu?.tree || [])
    },
    { path: "login", element: <Login /> },
    { path: "*", element: <Any></Any>}
  ]
  // const eel = genRoutes(menu?.tree || [])
  // console.log(eel, 220)
  let element = useRoutes(r);
  // console.log(r, 207)
  // return element;
  // SET_FLAT_DATA
  // SET_TREE_DATA
  useEffect(() => {
    
  }, [menu.tree])
  useEffect(() => {
    console.log("++++")
    // console.log(23)
    if (user.username) {
        if (!menu.tree.length) {
          instance.get("http://localhost:9090/api/menu").then(res => {
            // console.log(res, 318)
            const menuTree = buildMenuTree(res.data)
            // console.log(menuTree, 489)
            flatMethod(menuTree)
            dispatch({
              type: "SET_FLAT_DATA",
              data: res.data
            })
            dispatch({
              type: "SET_TREE_DATA",
              data: menuTree
            })
          })
       }
    } else {
      if (localStorage.getItem("token") && !menu.tree.length) {
        instance.get("http://localhost:9090/api/menu").then(res => {
            // console.log(res, 318)
            const menuTree = buildMenuTree(res.data)
            // console.log(menuTree, 489)
            flatMethod(menuTree)
            dispatch({
              type: "SET_FLAT_DATA",
              data: res.data
            })
            dispatch({
              type: "SET_TREE_DATA",
              data: menuTree
            })
            // setLoading(false)
            setTimeout(() => {
              setLoading(false)
            }, 500)
          }).catch(err => {
            localStorage.removeItem("token")
            setTimeout(() => {
              setLoading(false)
            }, 500)
          })
      } else {
       setTimeout(() => {
              setLoading(false)
            }, 500)
      }
      // console.log("1111")
      // fetch("/menu.json").then(res => res.json()).then(res => {
      //   flatMethod(res)
      //   dispatch({
      //     type: "SET_TREE_DATA",
      //     data: res
      //   })
      // })
    }
    
  }, [menu.tree, user.username])
  // console.log("999999", localStorage.getItem("token"))
  // <div>
  //   <LayoutView></LayoutView>
  // </div>
  if (loading) {
    return (
      <Spin tip="Loading" size="small" fullscreen={true} spinning={loading}>
      </Spin>
    )
  }
  if (localStorage.getItem("token")) {
    return (
      element
    )
  } else {
    // return <Navigate to="/login" replace={true} />
    return <Login />
  }
}

export default App
