const ListToObjectList = (data = []) => {
  let obj = {}
  data.map(item => {
    obj[item.id] = item
  })
  return obj
}
export default ListToObjectList
