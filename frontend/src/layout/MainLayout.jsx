import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const MainLayout = () => {
  const {token, logout} = useUser() 
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  useEffect(() => { 
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])
  
  const handleLogout = () => {
    logout() 
    // navigate()
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed) // Đảo ngược giá trị collapsed
  }
  return (
    <div className='flex flex-row h-screen max-h-screen '>
      <nav className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-1/5'} max-h-full bg-gray-200 shadow-2xl flex flex-col justify-between`}> 
        <div className='flex flex-col justify-between'>
          <span onClick={toggleSidebar} className='cursor-pointer p-7 text-xl -mb-7 -mt-5' style={{ fontWeight: 'bold' }}> 
            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: '24px', fontWeight: 'bold' }} /> : <MenuFoldOutlined style={{ fontSize: '24px', fontWeight: 'bold' }} />} 
          </span>
          <Nav />
        </div>
        
        <div className='w-full text-center font-semibold py-4 pr-4 cursor-pointer rounded-lg flex items-center justify-center gap-x-2 shadow-md ease-in-out bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 transform transition duration-300'
          onClick={handleLogout}
        >
          {/* Chỉ hiển thị icon khi sidebar bị ẩn */}
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 '>
              <path d="M502.6 233.4l-128-128c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L402.7 224H192c-13.3 0-24 10.7-24 24s10.7 24 24 24h210.7l-62 62c-9.4 9.4-9.4 24.6 0 33.9 9.4 9.4 24.6 9.4 33.9 0l128-128c9.3-9.4 9.3-24.6 0-34zM352 416H128c-22.1 0-40-17.9-40-40V136c0-22.1 17.9-40 40-40h224c13.3 0 24-10.7 24-24s-10.7-24-24-24H128C74.7 48 32 90.7 32 144v240c0 53.3 42.7 96 96 96h224c13.3 0 24-10.7 24-24s-10.7-24-24-24z"/>
            </svg>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5'>
                <path d="M502.6 233.4l-128-128c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L402.7 224H192c-13.3 0-24 10.7-24 24s10.7 24 24 24h210.7l-62 62c-9.4 9.4-9.4 24.6 0 33.9 9.4 9.4 24.6 9.4 33.9 0l128-128c9.3-9.4 9.3-24.6 0-34zM352 416H128c-22.1 0-40-17.9-40-40V136c0-22.1 17.9-40 40-40h224c13.3 0 24-10.7 24-24s-10.7-24-24-24H128C74.7 48 32 90.7 32 144v240c0 53.3 42.7 96 96 96h224c13.3 0 24-10.7 24-24s-10.7-24-24-24z"/>
              </svg>
              <p className='text-gray-700 hover:text-gray-900'>Log Out</p>
            </>
          )}
        </div>
      </nav>
      
      <main className='flex flex-col w-full h-full overflow-hidden '>
        <div className=''>
          <Header />
        </div>
        <div className=' flex-1   overflow-y-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout