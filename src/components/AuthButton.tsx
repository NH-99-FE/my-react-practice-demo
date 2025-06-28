import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router'

interface props {
  auth: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  danger?: boolean
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed'
  disabled?: boolean
}

export const AuthButton = (props: props) => {
  const { buttonList } = useRouteLoaderData('layout')
  // 无权限则禁用按钮
  if (!buttonList.includes(props.auth)) {
    return (
      <Button disabled {...props}>
        {props.children}
      </Button>
    )
  } else {
    return <Button {...props}>{props.children}</Button>
  }
}
