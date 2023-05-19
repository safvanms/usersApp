import React, { useEffect, useState } from 'react'
import './Header.css'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Header({ userInfo, page }) {
  const [open, setOpen] = useState(false)
  const [friends, setFriends] = useState([])
  const [quickLogin, setQuickLogin] = useState([])

  const { id } = useParams()

  // fetching the users for the quick Login 

  useEffect(() => {
    const fetchFriends = async () => {
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

  //setting up 2 friends for Quick Login

  useEffect(() => {
    if (friends.length > 0) {
      setQuickLogin([friends[0], friends[1]])
    }
  }, [friends])


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dialogStyle = {
    bottom: '100px',
    left: '35%',
    borderRadius: '15px',
    width: '250px',
    height: 'fit-content',
  }

  const styles = {
    pro_pic: {
      width: '100px',
      borderRadius: '50%',
      marginBottom:"5px"
    },
  }

  return (
    <>
      <div className="profile-header">
        <p>{page}</p>
        <div className="user-name-section" onClick={handleClickOpen}>
          <img
            style={{ width: '35px', borderRadius: '50px' }}
            src={userInfo.pic}
            alt="user"
          />
          <p>{userInfo.name}</p>
        </div>
      </div>


      <Dialog
        className="account-dialog"
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: dialogStyle,
        }}
      >
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img style={styles.pro_pic} src={userInfo.pic} alt="" />
          <Typography variant="h6" style={{ marginTop: '5px' }}>
            {userInfo.name}
          </Typography>
          <Typography>{userInfo.mail}</Typography>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {quickLogin &&
              quickLogin.map((user) => (
               <Link style={{textDecoration:"none" , color:"black"}} to={`/profile/${user.id}/profile`} > <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderTop: '1px solid lightGrey',
                    padding: '5px',
                    width: '140px',
                    gap:"5px",
                    cursor:"pointer"
                  }}
                >
                  <img
                    style={{ width: '30px', borderRadius: '50px' }}
                    src={user?.profilepicture}
                    alt="avatar"
                  />
                  <Typography >{user?.name}</Typography>
                </div>
                </Link>
              ))}
          </div>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/">
            <Button
              style={{
                backgroundColor: '#f10707cc',
                color: '#ffffff',
                borderRadius: '12px',
                textTransform:"none"
              }}
              onClick={handleClose}
            >
              Sign out
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      
    </>
  )
}
