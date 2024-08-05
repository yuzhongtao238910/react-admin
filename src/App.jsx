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
import { useSelector, useDispatch} from "react-redux"
import { Layout, Menu, theme, Spin, Button } from "antd";
import { useState, useEffect } from "react"
import { useRoutes, Outlet, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
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
  "List":     List
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
    console.log(key1, key2)
    // console.log(238910)
    // setTimeout(() => {
      setOpenedKeys(key1)
      setSelectedKeys(key2)
    // }, 0)
    
  }, [menus])
  useEffect(() => {
    
  }, [location.pathname])
  return (
    <Layout>
      <Sider
        style={{height: '100vh'}}
      >
        <div style={{
          height: "64px",
          backgroundColor: 'red'
        }}>
          238910
        </div>
        <Menu theme="dark" mode="inline" 
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
        />
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
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogin = () => {
    dispatch({
      type: "SET_USER",
      data: "238910"
    })
    navigate("/");
  }
  return (
    <div>
      <Button type="primary" onClick={handleLogin}>登录</Button>
    </div>
  )
}
function com(name) {
  const Component = mapKey[name]
  return (<Component />)
}

function App() {
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
  ]
  // const eel = genRoutes(menu?.tree || [])
  // console.log(eel, 220)
  let element = useRoutes(r);
  // console.log(r, 207)
  // return element;
  
  useEffect(() => {
    // console.log(23)
    fetch("/menu.json").then(res => res.json()).then(res => {
      flatMethod(res)
      dispatch({
        type: "SET_TREE_DATA",
        data: res
      })
    })
  }, [])
  // <div>
  //   <LayoutView></LayoutView>
  // </div>
  if (user.username) {
    return (
      element
    )
  } else {
    // return <Navigate to="/login" replace={true} />
    return <Login />
  }
}

export default App
