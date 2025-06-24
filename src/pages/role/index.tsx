import { Button, Form, Input, message, Modal, Space, Table, type TableColumnsType } from 'antd'
import type { IRole, IRoleSearchParams } from '../../types/api.ts'
import { formatDate } from '../../utils'
import api from '../../api/roleApi.ts'
import { useAntdTable } from 'ahooks'
import CreateRole, { type CreateRoleRef } from './CreateRole.tsx'
import { useRef } from 'react'

const Role = () => {
  const [form] = Form.useForm()
  const roleRef = useRef<CreateRoleRef>(null)

  const columns: TableColumnsType<IRole> = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => formatDate(text),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string) => formatDate(text),
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
                handleEdit(record)
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleSetPermission(record._id)
              }}
            >
              设置权限
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

  const handleCreate = () => {
    roleRef.current?.showModal('create')
  }

  const handleEdit = (record: IRole) => {
    roleRef.current?.showModal('edit', record)
  }

  const handleSetPermission = (id: string) => {
    console.log(id)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '删除部门',
      content: '确认删除该部门吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDelOk(id)
      },
    })
  }

  const handleDelOk = async (id: string) => {
    await api.deleteRole({ _id: id })
    message.success('删除成功')
    submit()
  }

  const getRoleDate = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IRoleSearchParams
  ) => {
    const data = await api.getRoleList({ ...formData, pageNum: current, pageSize })
    return {
      list: data.list,
      total: data.page.total,
    }
  }

  const { tableProps, search } = useAntdTable(getRoleDate, {
    defaultPageSize: 10,
    form,
  })
  const { submit, reset } = search

  return (
    <>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <Form layout="inline" form={form}>
          <Form.Item name="roleName" label="角色名称" className="font-bold">
            <Input placeholder="请输入角色名称" className="font-medium" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="mr-5" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">角色列表：</div>
        <div>
          <Button type={'primary'} className="mr-3" onClick={handleCreate}>
            新增
          </Button>
          <Button>重置</Button>
        </div>
      </div>
      <Table bordered rowKey="_id" columns={columns} {...tableProps} />
      <CreateRole ref={roleRef} updateRoleList={submit} />
    </>
  )
}

export default Role
