import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from 'antd'
import api from '../../api'
import { useAntdTable } from 'ahooks'
import { useRef, useState } from 'react'
import type { IUser, IUserSearchParams } from '../../types/api.ts'
import { formatDate } from '../../utils'
import UserModal, { type UserRef } from './UserModal.tsx'
import SearchForm from '../../components/SearchForm.tsx'

const User = () => {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])

  const userRef = useRef<UserRef>(null)

  const columns: TableColumnsType<IUser> = [
    { title: '用户ID', dataIndex: 'userId', key: 'userId' },
    { title: '用户名称', dataIndex: 'userName', key: 'userName' },
    { title: '用户邮箱', dataIndex: 'userEmail', key: 'userEmail' },
    {
      title: '系统角色',
      dataIndex: 'role',
      key: 'role',
      render: (text: number) => {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户',
        }[text]
      },
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (text: number) => {
        return {
          1: '在职',
          2: '离职',
          3: '试用期',
        }[text]
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => formatDate(text),
    },
    {
      title: '操作',
      key: 'action',
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
    userRef.current?.showModal('edit', record)
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

  const handleCreate = () => {
    userRef.current?.showModal('create')
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
        <SearchForm form={form} submit={submit} reset={reset}>
          <Form.Item name="userId" label="用户ID" className="font-bold">
            <Input placeholder="请输入用户ID" className="font-medium" />
          </Form.Item>
          <Form.Item name="userName" label="用户名称" className="font-bold">
            <Input placeholder="请输入用户名称" className="font-medium" />
          </Form.Item>
          <Form.Item name="state" label="状态" className="font-bold">
            <Select placeholder="请选择用户状态" defaultValue={1} style={{ width: 100 }}>
              <Select.Option value={0}>所有</Select.Option>
              <Select.Option value={1}>在职</Select.Option>
              <Select.Option value={2}>离职</Select.Option>
              <Select.Option value={3}>实习期</Select.Option>
            </Select>
          </Form.Item>
        </SearchForm>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">用户列表：</div>
        <div>
          <Button type={'primary'} className="mr-3" onClick={handleCreate}>
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
      <UserModal ref={userRef} updateUserList={submit} />
    </>
  )
}

export default User
