export const flatMenu = []
export const flatMethod = (array) => {
  for(let i = 0; i < array.length; i++) {
    const node = array[i]
    flatMenu.push(node)
    if (Array.isArray(node.children) && node.children.length) {
      flatMethod(node.children)
    }
  }
}
 export      const ifHasChild = key => {
        let res = flatMenu.find(item => item.id == key)
        if (Array.isArray(res?.children) && res?.children?.length) {
          return true
        } else {
          return false
        }
      }
  export     const ifHasParent = (key) => {
        let res = flatMenu.find(item => item.id == key)
        if (res.parentId) {
          return true
        } else {
          return false
        }
      }
   export    const getPath = (key) => {
    // debugger
        // console.log(key)
        const array = []
        // console.log(res)
        let res = flatMenu.find(item => item.id == key)
        // console.log(res)
        if (res) {
          array.push(res.key)
        }
        while(res.parentId) {
          res = flatMenu.find(item => item.id == res.parentId)
          if (res) {
            array.unshift(res.key)
          }
        }
        // console.log(array)
        return '/' + array.join("/")
      }
 export      const buildTree = (items) => {  
        // 创建一个映射，用于快速查找每个节点  
        const map = {};  
        items.forEach(item => {  
          map[item.id] = { ...item, children: [] }; // 复制对象并初始化 children 数组  
        });  
        
        // 构建树  
        const tree = [];  
        items.forEach(item => {  
          // 根节点的 parentId 通常设为 null 或 0（在这个例子中为 0）  
          if (item.parentId === 0) {  
            tree.push(map[item.id]); // 将根节点添加到树中  
          } else {  
            // 查找父节点并添加当前节点到父节点的 children 数组中  
            if (map[item.parentId]) {  
              map[item.parentId].children.push(map[item.id]);  
            }  
          }  
        });  
        
        return tree;  
      }  

   export    const getSelectedKeys = location => {
        const splitArray = location.split("/").filter(i => !!i)
        let last = splitArray.at(-1)
        if (last) {
          // debugger
          const res = flatMenu.find(item => item.key == last)
          if (res) {
            return [res.key]
          }
        }
        return []
        
      }
    export   const getOpenedKeys = location => {
        const splitArray = location.split("/").filter(i => !!i)
        const res = []
        let last = splitArray.at(-2)
        let node = flatMenu.find(item => item.key == last)
        while (node) {
          res.push(node.key)
          node = flatMenu.find(item => item.id == node.parentId)
        }
        return res
      }