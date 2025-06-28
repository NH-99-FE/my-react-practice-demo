import React from 'react'
import { Button, Result } from 'antd'

const NotFound403: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/'
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有访问该页面的权限."
      extra={
        <Button type="primary" onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound403
