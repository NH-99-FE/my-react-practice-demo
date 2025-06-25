import { Button, Form, Input, message, Modal, Space, Table, type TableColumnsType } from 'antd'
import api from '../../api'
import { useAntdTable } from 'ahooks'
import { useState } from 'react'
import type { IUser, IUserSearchParams } from '../../types/api.ts'
import { formatDate } from '../../utils'

const User = () => {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])

  const columns: TableColumnsType<IUser> = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户名称', dataIndex: 'userName', key: 'userName' },
    { title: '用户邮箱', dataIndex: 'userEmail', key: 'userEmail' },
    { title: '用户角色', dataIndex: 'role', key: 'role' },
    { title: '用户状态', dataIndex: 'state', key: 'state' },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
              danger
              onClick={() => {
                handleSingleDelete(Number(record.userId))
              }}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  const handleEdit = (record: IUser) => {
    console.log(record)
  }

  const handleSingleDelete = (userId: number) => {
    Modal.confirm({
      title: '删除用户',
      content: '确认删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDelete(userId)
      },
    })
  }

  const handlePatchConfirm = () => {
    Modal.confirm({
      title: '批量删除用户',
      content: '确认删除这些用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDelete()
      },
    })
  }

  // 删除
  const handleDelete = async (userId?: number) => {
    if (userId) {
      await api.deleteUser({ userIds: [userId] })
    } else {
      await api.deleteUser({ userIds })
    }
    message.success('删除成功')
    setUserIds([])
    reset()
  }

  const getUserData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IUserSearchParams
  ) => {
    const data = await api.getUserList({ ...formData, pageNum: current, pageSize })
    return {
      list: data.list,
      total: data.page.total,
    }
  }

  const { tableProps, search } = useAntdTable(getUserData, {
    defaultPageSize: 10,
    form,
  })

  const { submit, reset } = search

  return (
    <>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <Form layout="inline" form={form}>
          <Form.Item name="deptName" label="用户名称" className="font-bold">
            <Input placeholder="请输入用户名称" className="font-medium" />
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
        <div className="font-bold">用户列表：</div>
        <div>
          <Button type={'primary'} className="mr-3" onClick={submit}>
            新增
          </Button>

          <Button
            type={'primary'}
            danger
            onClick={handlePatchConfirm}
            disabled={!userIds || userIds.length === 0}
          >
            批量删除
          </Button>
        </div>
      </div>
      <Table
        bordered
        rowKey="userId"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: userIds,
          onChange: (selectedRowKeys: React.Key[]) => {
            setUserIds(selectedRowKeys as number[])
          },
        }}
        columns={columns}
        {...tableProps}
      />
    </>
  )
}

export default User
