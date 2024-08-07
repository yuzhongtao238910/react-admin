import {Suspense, lazy} from "react"
const modules = import.meta.glob(['../pages/**/*.js', '../pages/**/*.jsx'])
console.log(modules)
const map = {}
Object.keys(modules).forEach(item => {
	const key = item.slice(2).split("/")
	// console.log(key.at(-2))
	const comKey = key.at(-2)
	console.log(comKey)
	const yy = comKey.slice(0,1).toUpperCase() + comKey.slice(1)
	const Com = lazy(() => import(`../pages/${comKey}/index.jsx`))
	// console.log(Com)
	map[yy] = (
		<Suspense fallback={<h1>loading</h1>}>
			<Com />
		</Suspense>
		)
})
console.log(map)
export default map