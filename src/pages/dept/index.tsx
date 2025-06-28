import { Form, Input, message, Modal, Space } from 'antd'
import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import type { IDept } from '../../types/api.ts'
import api from '../../api'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils'
import DeptModal, { type CreateDept } from './DeptModal.tsx'
import SearchForm from '../../components/SearchForm.tsx'
import { AuthButton } from '../../components/AuthButton.tsx'

const Dept = () => {
  const [data, setData] = useState<IDept[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const deptCreatRef = useRef<CreateDept>(null)
  useEffect(() => {
    getDeptData()
  }, [])

  const columns: TableColumnsType<IDept> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200,
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: '150',
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
              auth="dept@create"
              type="primary"
              onClick={() => {
                handleSubCreate(record._id)
              }}
            >
              新增
            </AuthButton>
            <AuthButton
              auth="dept@edit"
              type="primary"
              onClick={() => {
                handleEdit(record)
              }}
            >
              编辑
            </AuthButton>
            <AuthButton
              auth="dept@delete"
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

  // 获取部门列表
  const getDeptData = async () => {
    setLoading(true)
    const data = await api.getDeptmentList(form.getFieldsValue())
    setData(data)
    setLoading(false)
  }

  const handleSubCreate = (id: string) => {
    deptCreatRef.current?.showModal('create', { parentId: id })
  }

  const handleEdit = (record: IDept) => {
    deptCreatRef.current?.showModal('edit', record)
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
    await api.deleteDept({ _id: id })
    message.success('删除成功')
    getDeptData()
  }

  const handleReset = () => {
    form.resetFields()
    getDeptData()
  }

  const handleCreate = () => {
    deptCreatRef.current?.showModal('create')
  }

  return (
    <>
      <div className="rounded-md bg-white px-4 py-2 dark:bg-gray-800">
        <SearchForm form={form} submit={getDeptData} reset={handleReset}>
          <Form.Item name="deptName" label="部门名称" className="font-bold">
            <Input placeholder="请输入部门名称" className="font-medium" />
          </Form.Item>
        </SearchForm>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-white px-4 py-3 dark:bg-gray-800">
        <div className="font-bold">部门列表：</div>
        <div>
          <AuthButton auth="dept@create" type={'primary'} className="mr-3" onClick={handleCreate}>
            新增
          </AuthButton>
        </div>
      </div>
      <Table bordered rowKey="_id" columns={columns} dataSource={data} loading={loading} />
      <DeptModal ref={deptCreatRef} updateDeptList={getDeptData} />
    </>
  )
}

export default Dept
