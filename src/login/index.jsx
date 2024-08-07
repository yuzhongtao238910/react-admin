import { useRoutes, Outlet, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux"
import { Button, Checkbox, Form, Input } from 'antd';
import { Dropdown, Avatar, Layout, Menu, theme, Spin } from "antd";
import instance from "@/utils/request"
function Login() {
  const location = useLocation()
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
  const res = await instance.get("http://localhost:9090/login", {
    params: {
      username: values.username,
      password: values.password
    }
  })
  const { username, token} = res.data
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
};
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center"
    }}>
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
export default Login