import { Form, Input, InputNumber, message, Modal, Radio, TreeSelect } from 'antd'
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react'
import api from '../../api'
import type { IMenu } from '../../types/api.ts'
import { InfoCircleOutlined } from '@ant-design/icons'

export interface CreateMenu {
  showModal: (type: 'create' | 'edit', data?: IMenu | { parentId: string }) => void
}

interface CreatMenuProps {
  ref: RefObject<CreateMenu | null>
  updateDeptList: () => void
}

const CreatMenu = ({ ref, updateDeptList }: CreatMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuList, setMenuList] = useState<IMenu[]>([])
  const [action, setAction] = useState<string>('create')
  const [form] = Form.useForm()

  useEffect(() => {}, [])

  const showModal = (type: 'create' | 'edit', data?: IMenu | { parentId: string }) => {
    setAction(type)
    setIsModalOpen(true)
    getMenuList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleOk = async () => {
    const valid = form.validateFields()
    if (!valid) return
    if (action === 'create') {
      await api.createMenu(form.getFieldsValue())
      message.success('创建成功')
    } else if (action === 'edit') {
      await api.updateMenu(form.getFieldsValue())
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

  // 获取menuList
  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }

  return (
    <>
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
          <Form.Item label="上级菜单" name="parentId">
            <TreeSelect
              style={{ width: '100%' }}
              styles={{
                popup: { root: { maxHeight: 400, overflow: 'auto' } },
              }}
              treeData={menuList}
              placeholder="请选择父级菜单"
              treeDefaultExpandAll
              fieldNames={{ label: 'menuName', value: '_id' }}
            />
          </Form.Item>
          <Form.Item label="菜单类型" name="menuType">
            <Radio.Group>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
              <Radio value={3}>页面</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="menuName"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              return form.getFieldValue('menuType') === 2 ? (
                <Form.Item label="权限标识" name="menuCode">
                  <Input placeholder="请输入权限标识" />
                </Form.Item>
              ) : (
                <>
                  <Form.Item label="菜单图标" name="icon">
                    <Input placeholder="请输入菜单图标" />
                  </Form.Item>
                  <Form.Item label="路由地址" name="path">
                    <Input placeholder="请输入路由地址" />
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>
          <Form.Item label="组件名称" name="component">
            <Input placeholder="请输入组件名称" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="orderBy"
            tooltip={{ title: '排序值越大越往后', icon: <InfoCircleOutlined rev={undefined} /> }}
          >
            <InputNumber placeholder="请输入排序值" />
          </Form.Item>
          <Form.Item label="菜单状态" name="menuState">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreatMenu
