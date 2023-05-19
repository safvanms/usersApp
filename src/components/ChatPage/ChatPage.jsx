import React, { useEffect, useState } from 'react'
import './chatPage.css'
import axios from 'axios'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'

export default function ChatPage({ user, setChatWindow }) {
  const [messager, setMessager] = useState('')

  const id = user ;

 // feetching the users for the chat list
  
  useEffect(() => {
    async function getMessager() {
      try {
        const response = await axios.get('https://panorbit.in/api/users.json')
        const data = response.data.users
        const chat = data.filter((user) => user.id === parseInt(id))
        setMessager(chat)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getMessager()
  }, [id])

  return (
    <div className="chatpage">
      {messager &&
        messager.map((elem) => (
          <div className="chat-page-header">
            <div>
              <img src={elem.profilepicture} alt={elem.name} />
              <p>{elem.name}</p>
            </div>
            <div
              className="close-chat-window"
              onClick={() => setChatWindow(false)}
            >
              <span>
                <KeyboardArrowDownIcon />
              </span>
              <span>
                <CloseIcon />
              </span>
            </div>
          </div>
        ))}
      <div className="chat-page-container">
        <div className="messages">
          <div>
            <p>Lorem sdsjhbn asifsf</p>
            <p>Lorem sdsjhbn asisf jnjsf fjdfjs</p>
          </div>

          <div>03:02</div>

          <div>
            <p>Lorem sdsjhbn as</p>
            <p>Lorem </p>
          </div>

          <div>
            <input />
            <SendIcon style={{ fontSize: '22px', color: '#3d56c8' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
