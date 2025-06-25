import { Form, message, Modal } from 'antd'
import { type RefObject, useImperativeHandle, useState } from 'react'
import type { IRole, IUser } from '../../types/api.ts'
import api from '../../api/roleApi.ts'

export interface UserRef {
  showModal: (type: 'create' | 'edit', data?: IUser | { parentId: string }) => void
}

interface CreatUserProps {
  ref: RefObject<UserRef | null>
  updateUserList: () => void
}

const UserModal = ({ ref, updateUserList }: CreatUserProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [action, setAction] = useState<string>('create')
  const [form] = Form.useForm()

  const showModal = (type: 'create' | 'edit', data?: IRole | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleOk = async () => {
    const valid = form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createRole(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateRole(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    updateUserList()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({ showModal }))

  return (
    <Modal>
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      open={isModalOpen}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消" okText="确认"
    </Modal>
  )
}

export default UserModal
