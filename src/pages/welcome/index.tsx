const Welcome = () => {
  return (
    <div className="bg-white p-3 rounded-xl flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-3">欢迎使用</h1>
        <h2 className="text-xl font-bold mb-3">企业管理系统</h2>
        <h3>一款好用的产品</h3>
      </div>
      <div className="bg-[url('/imgs/welcome-bg.png')] bg-cover bg-center bg-no-repeat h-80 w-100"></div>
    </div>
  )
}

export default Welcome
