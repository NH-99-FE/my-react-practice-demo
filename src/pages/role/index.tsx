import { Button, Form, Input, Table } from 'antd'

const Role = () => {
  const [form] = Form.useForm()
  const handleReset = () => {
    form.resetFields()
  }
  return (
    <>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <Form layout="inline" form={form}>
          <Form.Item name="roleName" label="角色名称" className="font-bold">
            <Input placeholder="请输入角色名称" className="font-medium" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="mr-5">
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">角色列表：</div>
        <div>
          <Button type={'primary'} className="mr-3">
            新增
          </Button>
          <Button>重置</Button>
        </div>
      </div>
      <Table rowKey="_id" />
    </>
  )
}

export default Role
