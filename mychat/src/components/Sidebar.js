import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
 import Chat from './Chat'

const Sidebar = ()=> {
  return ( 
    <><div className='sidebar'>
      <Navbar />
      <Search />
      <Chats />
</div>
    <Chat />
    </>

    
    // <div className='sidebar'>Sidebar</div>
  )
}

export default Sidebar