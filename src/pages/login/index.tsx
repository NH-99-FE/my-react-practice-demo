import { Button, Checkbox, Form, Input, Flex } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import api from '../../api'
import type { ILoginParams } from '../../types/api.ts'
import storage from '../../utils/storage.ts'

const Login = () => {
  const onFinish = async (values: ILoginParams) => {
    const data = await api.login(values)
    storage.set('token', data)
    window.location.href = '/'
  }
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div>
        <h1 className="text-center my-5 text-2xl font-medium">系统登录</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ width: '300px' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="">忘记密码</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="mb-2">
              登录
            </Button>
            我没有账户 <a href="">去注册!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
