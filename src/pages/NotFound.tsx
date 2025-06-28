import React from 'react'
import { Button, Result } from 'antd'

const App: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/'
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，此页面不存在"
      extra={
        <Button type="primary" onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  )
}

export default App
