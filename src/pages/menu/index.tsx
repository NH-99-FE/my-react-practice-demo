import { Button, Form, Input, message, Modal, Select, Space } from 'antd'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import type { IMenu } from '../../types/api.ts'
import api from '../../api'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils'
import CreatMenu, { type CreateMenu } from './CreatMenu.tsx'

const Menu = () => {
  const [data, setData] = useState<IMenu[]>([])
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
            <Button
              type="primary"
              onClick={() => {
                handleSubCreate(record._id)
              }}
            >
              新增
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record)
              }}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(record._id)
              }}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  // 获取部门列表
  const getMenuDate = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
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
    <div>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <Form layout="inline" form={form} initialValues={{ menuState: 1 }}>
          <Form.Item name="menuName" label="菜单名称" className="font-bold">
            <Input placeholder="请输入菜单名称" className="font-medium" />
          </Form.Item>
          <Form.Item name="menuState" label="菜单状态" className="font-bold">
            <Select placeholder="请选择菜单状态" className="font-medium" style={{ width: 80 }}>
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={2}>禁止</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="mr-5" onClick={getMenuDate}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">菜单列表：</div>
        <div>
          <Button type={'primary'} className="mr-3" onClick={handleCreate}>
            新增
          </Button>
          <Button>重置</Button>
        </div>
      </div>
      <Table rowKey="_id" columns={columns} dataSource={data} pagination={false} />
      <CreatMenu ref={menuCreatRef} updateDeptList={getMenuDate} />
    </div>
  )
}

export default Menu
