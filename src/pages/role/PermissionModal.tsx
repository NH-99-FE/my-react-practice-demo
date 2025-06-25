import { Form, message, Modal, Tree, type TreeDataNode, type TreeProps } from 'antd'
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react'
import type { IMenu, IPermission, IRole } from '../../types/api.ts'

import api from '../../api'
import roleApi from '../../api/roleApi.ts'

export interface SetPermissionRef {
  showModal: (data: IRole) => void
}

interface SetPermissionProps {
  ref: RefObject<SetPermissionRef | null>
  updateRoleList: () => void
}

const PermissionModal = ({ ref, updateRoleList }: SetPermissionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<IMenu[]>([])
  const [permission, setPermission] = useState<IPermission>()
  const [roleInfo, setRoleInfo] = useState<IRole | null>(null)

  // 初始化数据
  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }

  const showModal = (data: IRole) => {
    setIsModalOpen(true)
    setRoleInfo(data)
    setCheckedKeys(data.permissionList.checkedKeys)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePermission(permission)
      message.success('设置成功')
    }
    handleCancel()
    updateRoleList()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue, checkInfo) => {
    setCheckedKeys(checkedKeysValue as string[])
    console.log('onCheck', checkedKeysValue, checkInfo)
    const checkedKeysTemp: string[] = []
    const halfCheckedKeysTemp: string[] = []
    checkInfo.checkedNodes.map(node => {
      const menuNode = node as unknown as IMenu
      if (menuNode.menuType === 2) {
        checkedKeysTemp.push(menuNode._id)
      } else {
        halfCheckedKeysTemp.push(menuNode._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkedKeysTemp,
        halfCheckedKeys: [
          ...new Set([...halfCheckedKeysTemp, ...(checkInfo.halfCheckedKeys as string[])]),
        ],
      },
    })
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({ showModal }))

  return (
    <Modal
      title="设置权限"
      open={isModalOpen}
      width={600}
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
        <Form.Item label="角色名称" className="font-bold">
          {roleInfo?.roleName}
        </Form.Item>
        <Form.Item label="权限">
          <Tree
            checkable
            defaultExpandAll
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList as unknown as TreeDataNode[]}
            fieldNames={{ key: '_id', children: 'children', title: 'menuName' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PermissionModal
