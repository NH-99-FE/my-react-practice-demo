import { Form, Input, message, Modal } from 'antd'
import { type RefObject, useImperativeHandle, useState } from 'react'
import api from '../../api/roleApi.ts'
import type { IRole } from '../../types/api.ts'

export interface CreateRoleRef {
  showModal: (type: 'create' | 'edit', data?: IRole | { parentId: string }) => void
}

interface CreatMenuProps {
  ref: RefObject<CreateRoleRef | null>
  updateRoleList: () => void
}

const CreatMenu = ({ ref, updateRoleList }: CreatMenuProps) => {
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
    const valid = await form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createRole(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateRole(form.getFieldsValue())
      message.success('编辑成功')
    }
    handleCancel()
    updateRoleList()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({ showModal }))

  return (
    <Modal
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      open={isModalOpen}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
    >
      <Form
        labelAlign={'right'}
        labelCol={{ span: 4 }}
        form={form}
        style={{ marginTop: 20 }}
        initialValues={{ menuType: 1, menuState: 1 }}
      >
        <Form.Item hidden name="_id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="角色名称" name="roleName">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreatMenu
