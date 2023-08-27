import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Link, Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { PopupWidget } from 'react-calendly'
import { RiTodoLine } from 'react-icons/ri'

const Main = () => {
  return (
    <div>
      <Navbar>
        <Container sx={{ mt: 10 }}>
          <Outlet />
        </Container>
        <PopupWidget
          url="https://calendly.com/shahtaz"
          rootElement={document.getElementById("root")}
          text="Make a meet"
          textColor="#ffffff"
          color="#00a2ff"
        />
      </Navbar>
      <div className='fixed top-32 right-0'>
        <Link to='/react-drag-and-drop'
          className='py-3 px-6 bg-green-500 hover:bg-green-400 transition duration-300 text-white flex items-center- gap-2 border-l-[6px] border-yellow-400 rounded-l'>
          <RiTodoLine className='mt-1' />todo</Link>
      </div>
    </div>
  )
}

export default Main
