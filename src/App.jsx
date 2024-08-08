import instance from './utils/request'
import { Suspense, lazy } from 'react'
import Login from './login'
import Any from './any'
import mapKeys from './utils/dymanic.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Spin } from "antd"
import {
  useRoutes,
  Outlet,
  useLocation,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import {
  getOpenedKeys,
  getSelectedKeys,
  flatMethod,
  ifHasChild,
  getPath,
} from './utils'
import LayoutView from './pages/layout'


const buildMenuTree = (array) => {
  const map = {}
  array.forEach((item) => {
    map[item.id] = { ...item } // 复制对象并初始化 children 数组
  })
  const tree = []
  array.forEach((item) => {
    // 根节点的 parentId 通常设为 null 或 0（在这个例子中为 0）
    if (item.parentId === 0) {
      tree.push(map[item.id]) // 将根节点添加到树中
    } else {
      // 查找父节点并添加当前节点到父节点的 children 数组中
      if (map[item.parentId]) {
        if (map[item.parentId].children) {
          map[item.parentId].children.push(map[item.id])
        } else {
          map[item.parentId].children = []
          map[item.parentId].children.push(map[item.id])
        }
      }
    }
  })

  return tree
}

const genRoutes = (array) => {
  let res = []
  for (let i = 0; i < array.length; i++) {
    const node = array[i]
    const Component = mapKeys[node.element]
    let curNode = null
    if (Component) {
      curNode = {
        path: node.key,
        element: Component,
      }
      res.push(curNode)
    }

    if (Array.isArray(node.children) && node.children.length) {
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
  const menu = useSelector((state) => state.menu)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  let element = useRoutes([
    {
      path: '/',
      element: <LayoutView />,
      children: genRoutes(menu?.tree || []),
    },
    { path: 'login', element: <Login /> },
    { path: '*', element: <Any></Any> },
  ])
  useEffect(() => {
    if (user.username) {
      if (!menu.tree.length) {
        instance.get('http://localhost:9090/api/menu').then((res) => {
          const menuTree = buildMenuTree(res.data)
          flatMethod(menuTree)
          dispatch({
            type: 'SET_FLAT_DATA',
            data: res.data,
          })
          dispatch({
            type: 'SET_TREE_DATA',
            data: menuTree,
          })
        })
      }
    } else {
      if (localStorage.getItem('token') && !menu.tree.length) {
        instance
          .get('http://localhost:9090/api/menu')
          .then((res) => {
            const menuTree = buildMenuTree(res.data)
            flatMethod(menuTree)
            dispatch({
              type: 'SET_FLAT_DATA',
              data: res.data,
            })
            dispatch({
              type: 'SET_TREE_DATA',
              data: menuTree,
            })
            setTimeout(() => {
              setLoading(false)
            }, 500)
          })
          .catch((err) => {
            localStorage.removeItem('token')
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
      <Spin
        tip="Loading"
        size="small"
        fullscreen={true}
        spinning={loading}
      ></Spin>
    )
  }
  if (localStorage.getItem('token')) {
    return element
  } else {
    return <Login />
  }
}

export default App
