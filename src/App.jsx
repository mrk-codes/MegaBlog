import { useDispatch } from 'react-redux'
import './App.css'
import { useState } from 'react'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {Outlet} from 'react-router-dom'
import { login, logout } from './store/authSlice'


function App() {
//  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else
      {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error("Error fetching current user:", error);
    })
    .finally(() => {
      setLoading(false);
    })
  },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap justify-center items-center bg-orange-400'>
    <b className='text-4xl'><u>MEGABLOG</u></b>
    <div className='w-full block '>
      <Header />
      <main>
        TODO: <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
  )
  : null
}

export default App
