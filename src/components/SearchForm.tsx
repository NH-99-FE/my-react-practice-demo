import { Button, Form, type FormInstance } from 'antd'
import type { ReactNode } from 'react'

interface SearchFormProps {
  form: FormInstance
  submit: () => void
  reset: () => void
  initialValues?: object
  children?: ReactNode
}

const SearchForm = ({ form, submit, reset, children, initialValues }: SearchFormProps) => {
  return (
    <Form layout="inline" form={form} initialValues={initialValues}>
      {children}
      <Form.Item>
        <Button type="primary" className="mr-5" onClick={submit}>
          查询
        </Button>
        <Button onClick={reset}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
