import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import EmptyPage from './EmptyPage'
import MessageBar from '../Message/MessageBar'


function ToDo() {
  const { id } = useParams()

  const [user, setUser] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://panorbit.in/api/users.json')
        const data = response.data.users
        const userData = data.find((user) => user.id === parseInt(id))
        setUser(userData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  fetchData();
}, [id])


  const userInfo = {
    name: user.name,
    pic: user.profilepicture,
  }

  return (
    <div className='emptyPages-container'>
      {user && (
        <div className="profile-container">
          <Sidebar />
            <div className="header-section">
              <Header userInfo={userInfo} page='ToDo' />
              <EmptyPage/>
            </div>
        </div>
      )}
      <div className="chat-section">
        <MessageBar user={user} />
      </div>
    </div>
  )
}

export default ToDo 
