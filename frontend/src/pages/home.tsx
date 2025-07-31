export default function Home() {
  // 从localStorage获取用户信息
  const token = localStorage.getItem('access_token')
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hello World! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            欢迎来到首页
          </p>
          
          {token && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                登录成功！
              </h2>
              <p className="text-gray-600">
                Token: {token.substring(0, 20)}...
              </p>
            </div>
          )}
          
          <button 
            onClick={() => {
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
              window.location.href = '/login'
            }}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
}