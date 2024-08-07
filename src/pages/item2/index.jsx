import { useRef, useEffect } from "react"
import { echarts } from '@/graphs';
const Item2 = () => {
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
export default Item2