import {
  useRoutes,
  Outlet,
  useLocation,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default Home
