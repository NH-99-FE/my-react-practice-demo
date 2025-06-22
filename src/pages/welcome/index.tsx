const Welcome = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-white p-3">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-3 text-2xl font-bold">欢迎使用</h1>
        <h2 className="mb-3 text-xl font-bold">企业管理系统</h2>
        <h3>一款好用的产品</h3>
      </div>
      <div className="h-80 w-100 bg-[url('/imgs/welcome-bg.png')] bg-cover bg-center bg-no-repeat"></div>
    </div>
  )
}

export default Welcome
