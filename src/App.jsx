import instance from "./utils/request"
import {Suspense, lazy} from "react"
// import Sub1 from "./pages/sub1"
// import Item6 from "./pages/item6"
// import Item5 from "./pages/item5"
// import Item4 from "./pages/item4"
// import Item3 from "./pages/item3"
// import Item2 from "./pages/item2"
// import List from "./pages/list"
// import Home from "./pages/home"
import Login from "./login"
import Any from "./any"
// import Item1 from "./pages/item1"
// import Money from "./pages/money"
// import Person from "./pages/person"

import mapKeys from "./utils/dymanic.jsx"
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
  getPath,
} from "./utils"
import LayoutView from "./pages/layout"
const mapKey = {
  "Home": lazy(() =>import("./pages/home/index.jsx")),
  "Item1":    lazy(() =>import("./pages/item1/index.jsx")),
  "Item2":    lazy(() =>import("./pages/item2/index.jsx")),
  "Item3":    lazy(() =>import("./pages/item3/index.jsx")),
  "Item4":    lazy(() =>import("./pages/item4/index.jsx")),
  "Item5":    lazy(() =>import("./pages/item5/index.jsx")),
  "Item6":    lazy(() =>import("./pages/item6/index.jsx")),
  "Sub1":     lazy(() =>import("./pages/sub1/index.jsx")),
  "List":     lazy(() =>import("./pages/list/index.jsx")),
  "Person": lazy(() =>import("./pages/person/index.jsx")),
  "Money": lazy(() =>import("./pages/money/index.jsx"))
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




const genRoutes = array => {
// console.log(array)
  // debugger
  let res = []
  for(let i = 0; i < array.length; i++) {
    const node = array[i]
    const Component = mapKeys[node.element]
    // console.log(node.element, 85)
    let curNode = null
    if (Component) {
//       console.log(
// <Suspense fallback={<h1>loading</h1>}>
//           <Component />
//         </Suspense>
//         )
    curNode = {
      path: node.key,
      element: Component
      // (
        // <Suspense fallback={<h1>loading</h1>}>
        //   <Component />
        // </Suspense>
        // )
    }
    res.push(curNode)
    }
    
    
    
    if (Array.isArray(node.children) && node.children.length) {
      // console.log(node.children, 105)
      if (!curNode) {
        console.log(node.element)
      }
      curNode.children = genRoutes(node.children)
    }
  }
  return res
}


function App() {
  const [loading, setLoading] = useState(true)
  const menu = useSelector(state => state.menu)
  const user = useSelector(state => state.user)
  
  const dispatch = useDispatch()
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutView />,
      children: genRoutes(menu?.tree || [])
    },
    { path: "login", element: <Login /> },
    { path: "*", element: <Any></Any>}
  ]);
  useEffect(() => {
    if (user.username) {
        if (!menu.tree.length) {
          instance.get("http://localhost:9090/api/menu").then(res => {
            const menuTree = buildMenuTree(res.data)
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
            const menuTree = buildMenuTree(res.data)
            flatMethod(menuTree)
            dispatch({
              type: "SET_FLAT_DATA",
              data: res.data
            })
            dispatch({
              type: "SET_TREE_DATA",
              data: menuTree
            })
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
    }
    
  }, [menu.tree, user.username])
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
    return <Login />
  }
}

export default App
