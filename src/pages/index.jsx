import { Outlet } from "react-router-dom";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { echarts } from '../graphs';
import { useRef, useEffect } from "react"
export const Home = () => {
	return (
		<div>
		  kkk
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
