import { Form, Input, message, Modal, Select, TreeSelect } from 'antd'
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react'
import api from '../../api'
import type { IDept, IUser } from '../../types/api.ts'

export interface CreateDept {
  showModal: (type: 'create' | 'edit', data?: IDept | { parentId: string }) => void
}

interface CreatDeptProps {
  ref: RefObject<CreateDept | null>
  updateDeptList: () => void
}

const CreatDept = ({ ref, updateDeptList }: CreatDeptProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deptList, setDeptList] = useState<IDept[]>([])
  const [userList, setUserList] = useState<IUser[]>([])
  const [action, setAction] = useState<string>('create')
  const [form] = Form.useForm()

  useEffect(() => {
    getAllUserList()
  }, [])

  const showModal = (type: 'create' | 'edit', data?: IDept | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
    getDeptDate()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleOk = async () => {
    const valid = form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createDept(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateDept(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    updateDeptList()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({ showModal }))

  // 获取部门列表
  const getDeptDate = async () => {
    const data = await api.getDeptmentList()
    setDeptList(data)
  }

  // 获取用户列表
  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      open={isModalOpen}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
    >
      <Form labelAlign={'right'} labelCol={{ span: 4 }} form={form} style={{ marginTop: 20 }}>
        <Form.Item hidden name="_id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="上级部门" name="parentId">
          <TreeSelect
            style={{ width: '100%' }}
            styles={{
              popup: { root: { maxHeight: 400, overflow: 'auto' } },
            }}
            treeData={deptList}
            placeholder="请选择上级部门"
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
          />
        </Form.Item>
        <Form.Item
          label="部门名称"
          name="deptName"
          rules={[{ required: true, message: '请输入部门名称' }]}
        >
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item
          label="负责人"
          name="userName"
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <Select>
            {userList.map(user => (
              <Select.Option key={user._id} value={user.userName}>
                {user.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreatDept
