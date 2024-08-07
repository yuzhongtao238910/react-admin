import { Dropdown, Avatar, Layout, Menu, theme, Spin } from "antd";
import { useState, useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import { useRoutes, Outlet, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import {
  getOpenedKeys,
  getSelectedKeys,
  flatMethod,
  ifHasChild,
  getPath,
} from "@/utils"
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
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
    navigate(`/login`)
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
export default LayoutView