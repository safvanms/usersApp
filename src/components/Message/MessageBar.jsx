import React, { useEffect, useState } from 'react'
import './message.css'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ChatPage from '../ChatPage/ChatPage'

export default function MessageBar() {
  const [friends, setFriends] = useState([])
  const [openMessage, setOpenMessage] = useState(false)
  const [chatWindow, setChatWindow] = useState(false)
  const [user, setUser] = useState('')

  const { id } = useParams()

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.get('https://panorbit.in/api/users.json')
        const data = response.data.users
        const friendsList = data.filter((user) => user.id !== parseInt(id))
        setFriends(friendsList)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchFriends()
  }, [id])

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage)
  }

  const handleOpenChatBox = (id) => {
    setChatWindow(true)
    setUser(id)
  }

  return (
    <>
      <div className={openMessage ? 'expanded-chat' : ''}>
        <div className="message-bar" onClick={handleOpenMessage}>
          <div className="message-head">
            <ModeCommentOutlinedIcon style={{ fontSize: '22px' }} />
            <p>Chats</p>
          </div>
          {openMessage ? (
            <span>
              <KeyboardArrowDownIcon />
            </span>
          ) : (
            <span>
              <KeyboardArrowUpOutlinedIcon />
            </span>
          )}
        </div>
        {openMessage && friends && (
          <div className="other-users">
            {friends.map((friend) => (
              <div className="chat-list" key={friend.id}>
                <div onClick={() => handleOpenChatBox(friend.id)}>
                  <img src={friend.profilepicture} alt={friend.name} />
                  <p>{friend.name}</p>
                </div>
                <span></span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chat page opens here */}

      {chatWindow && (
        <div className="chat-window">
          <ChatPage setChatWindow={setChatWindow} user={user} />
        </div>
      )}
    </>
  )
}
