import { Button } from 'antd'
import storage from '../../utils/storage.ts'
export default function Welcome() {
  const handlerStorage = (type: number) => {
    switch (type) {
      case 1:
        storage.set('user', { name: 'jack', age: 18 })
        break
      case 2:
        console.log(storage.get('user'))
        break
      case 3:
        storage.remove('user')
        console.log('删除成功')
        break
      case 4:
        storage.clear()
        console.log('清空成功')
        break
      default:
    }
  }
  return (
    <div>
      <h1>Hello World!</h1>
      <Button onClick={() => handlerStorage(1)}>写入</Button>
      <Button onClick={() => handlerStorage(2)}>读取</Button>
      <Button onClick={() => handlerStorage(3)}>删除</Button>
      <Button onClick={() => handlerStorage(4)}>清空</Button>
    </div>
  )
}
