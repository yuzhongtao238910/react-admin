import { Suspense, lazy } from 'react'
const modules = import.meta.glob(['../pages/**/*.js', '../pages/**/*.jsx'])
const map = {}
Object.keys(modules).forEach((item) => {
  const key = item.slice(2).split('/')
  const comKey = key.at(-2)
  const yy = comKey.slice(0, 1).toUpperCase() + comKey.slice(1)
  const Com = lazy(() => import(`../pages/${comKey}/index.jsx`))
  map[yy] = (
    <Suspense fallback={<h1>loading</h1>}>
      <Com />
    </Suspense>
  )
})
console.log(map)
export default map
