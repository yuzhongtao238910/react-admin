import { Outlet } from "react-router-dom";
export const Home = () => {
	return (
		<div>
		  kkk
		  <Outlet />
		</div>
	)
}
export const Item1 = () => {
	return (
		<div>11111</div>
	)
}
export const Item2 = () => {
	return (
		<div>222</div>
	)
}
export const Sub1 = () => {
	return (
		<div>
			 sub1
			<Outlet />
		</div>
	)
}
export const Item3 = () => {
	return (
		<div>33333</div>
	)
}
export const Item4 = () => {
	return (
		<div>44444</div>
	)
}
export const List  = () => {
	return (
		<div>
			<h2>list</h2>
			<Outlet />
		</div>
	)
}
export const Item5 = () => {
	return (
		<div>55555</div>
	)
}
export const Item6 = () => {
	return (
		<div>k66666kk</div>
	)
}
