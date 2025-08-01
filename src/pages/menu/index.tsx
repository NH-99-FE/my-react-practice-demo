import { Form, Input, message, Modal, Select, Space } from 'antd'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import type { IMenu } from '../../types/api.ts'
import api from '../../api'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils'
import MenuModal, { type CreateMenu } from './MenuModal.tsx'
import SearchForm from '../../components/SearchForm.tsx'
import { AuthButton } from '../../components/AuthButton.tsx'

const Menu = () => {
  const [data, setData] = useState<IMenu[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const menuCreatRef = useRef<CreateMenu>(null)
  useEffect(() => {
    getMenuDate()
  }, [])

  const columns: TableColumnsType<IMenu> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: (text: number) => {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[text]
      },
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => {
        return formatDate(text)
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string) => {
        return formatDate(text)
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '200',
      render: (_, record) => {
        return (
          <Space>
            <AuthButton
              auth="menu@create"
              type="primary"
              onClick={() => {
                handleSubCreate(record._id)
              }}
            >
              新增
            </AuthButton>
            <AuthButton
              auth="menu@edit"
              type="primary"
              onClick={() => {
                handleEdit(record)
              }}
            >
              编辑
            </AuthButton>
            <AuthButton
              auth="menu@delete"
              danger
              onClick={() => {
                handleDelete(record._id)
              }}
            >
              删除
            </AuthButton>
          </Space>
        )
      },
    },
  ]

  // 获取菜单列表
  const getMenuDate = async () => {
    setLoading(true)
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
    setLoading(false)
  }

  const handleSubCreate = (id: string) => {
    menuCreatRef.current?.showModal('create', { parentId: id })
  }

  const handleEdit = (record: IMenu) => {
    menuCreatRef.current?.showModal('edit', record)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '删除菜单',
      content: '确认删除该菜单吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDelOk(id)
      },
    })
  }

  const handleDelOk = async (id: string) => {
    await api.deleteMenu({ _id: id })
    message.success('删除成功')
    getMenuDate()
  }

  const handleReset = () => {
    form.resetFields()
    getMenuDate()
  }

  const handleCreate = () => {
    menuCreatRef.current?.showModal('create')
  }

  return (
    <>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <SearchForm
          form={form}
          initialValues={{ menuState: 1 }}
          submit={getMenuDate}
          reset={handleReset}
        >
          <Form.Item name="menuName" label="菜单名称" className="font-bold">
            <Input placeholder="请输入菜单名称" className="font-medium" />
          </Form.Item>
          <Form.Item name="menuState" label="菜单状态" className="font-bold">
            <Select placeholder="请选择菜单状态" className="font-medium" style={{ width: 80 }}>
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={2}>禁止</Select.Option>
            </Select>
          </Form.Item>
        </SearchForm>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">菜单列表：</div>
        <div>
          <AuthButton auth="menu@create" type={'primary'} className="mr-3" onClick={handleCreate}>
            新增
          </AuthButton>
        </div>
      </div>
      <Table
        bordered
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
      <MenuModal ref={menuCreatRef} updateDeptList={getMenuDate} />
    </>
  )
}

export default Menu
