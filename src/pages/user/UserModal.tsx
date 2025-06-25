import {
  Form,
  type GetProp,
  Input,
  message,
  Modal,
  Select,
  TreeSelect,
  Upload,
  type UploadProps,
  type UploadFile,
} from 'antd'
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react'
import type { IDept, IRole, IUser } from '../../types/api.ts'
import api from '../../api'
import roleApi from '../../api/roleApi.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'

export interface UserRef {
  showModal: (type: 'create' | 'edit', data?: IUser) => void
}

interface CreatUserProps {
  ref: RefObject<UserRef | null>
  updateUserList: () => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传JPG或PNG格式图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 0.5
  if (!isLt2M) {
    message.error('图片大小不能超过500kb')
  }
  return isJpgOrPng && isLt2M
}

const UserModal = ({ ref, updateUserList }: CreatUserProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [action, setAction] = useState<string>('create')
  const [deptList, setDeptList] = useState<IDept[]>([])
  const [roleList, setRoleList] = useState<IRole[]>([])
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false)
      const { code, data, msg } = info.file.response
      if (code === 0) {
        setImageUrl(data.file)
      } else {
        message.error(msg)
      }
    }
  }

  useEffect(() => {
    getDeptList()
    getRoleList()
  }, [])

  const showModal = (type: 'create' | 'edit', data?: IUser) => {
    setAction(type)
    setIsModalOpen(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (action === 'create') {
        await api.createUser(values)
        message.success('创建成功')
      } else if (action === 'edit') {
        await api.updateUser(values)
        message.success('编辑成功')
      }
      handleCancel()
      updateUserList()
    } catch (error) {
      // 表单验证失败会进入catch
      console.log('表单验证失败:', error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({ showModal }))

  // 获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptmentList()
    setDeptList(data)
  }
  // 获取角色列表
  const getRoleList = async () => {
    const data = await roleApi.getAllRoleList()
    setRoleList(data)
  }

  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      open={isModalOpen}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
    >
      <Form labelAlign={'right'} labelCol={{ span: 4 }} form={form} style={{ marginTop: 20 }}>
        <Form.Item hidden name="userId">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="userName"
          rules={[
            { required: true, message: '请输入部门名称' },
            { min: 5, max: 12, message: '用户名长度应在5-12个字符之间' },
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          label="用户邮箱"
          name="userEmail"
          rules={[
            { required: true, message: '请输入用户邮箱' },
            { type: 'email', message: '请输入正确的邮箱' },
          ]}
        >
          <Input placeholder="请输入用户邮箱" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { len: 11, message: '请输入11位手机号' },
            { pattern: /1[1-9]\d{9}/, message: '请输入1开头的11位手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="部门" name="deptName" rules={[{ required: true, message: '请选择部门' }]}>
          <TreeSelect
            style={{ width: '100%' }}
            styles={{
              popup: { root: { maxHeight: 400, overflow: 'auto' } },
            }}
            placeholder="请选择部门"
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: 'deptName' }}
            treeData={deptList}
          ></TreeSelect>
        </Form.Item>
        <Form.Item label="岗位" name="job">
          <Input placeholder="请输入岗位" />
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Select placeholder="请选择状态">
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="系统角色" name="role">
          <Select placeholder="请选择角色">
            {roleList.map(role => (
              <Select.Option key={role._id} value={role.roleName}>
                {role.roleName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="用户头像" name="userImg">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/users/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '100%' }} />
            ) : (
              <button style={{ border: 0, background: 'none' }} type="button">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
