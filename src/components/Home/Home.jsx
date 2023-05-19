import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import { svg } from '../../svg'
import { useNavigate } from 'react-router-dom'



function Home() {
  const [users, setUsers] = useState([])

  const navigate = useNavigate()
  
  // call the api on each rendering of LandingPage

  useEffect(() => {
    fetchData()
  }, [])

  // users data retrieves here

  async function fetchData() {
    try {
      const response = await axios.get('https://panorbit.in/api/users.json')
      const data = response.data
      setUsers(data.users)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

// navigate into the Profile page according to the user

  const handleUserClick = (id) => {
    navigate(`/profile/${id}/profile`);
  };

  return (
    <div className="container">
      <div className="landing-page-bg">{svg}</div>
      <div className="profile-list">
        <div className="users-list-header">
          <h3>Select an account</h3>
        </div>
        <div className="users">
          {users
            ? users.map((user) => {
                const { id, name, profilepicture } = user
                return (
                  <>
                      <div
                        className="users-list"
                        key={id}
                        onClick={() => handleUserClick(id)}
                      >
                        <img
                          className="user-avatar"
                          src={profilepicture}
                          alt="user"
                        />
                        <p>{name}</p>
                      </div>
                      <span className="line"></span>
                  </>
                )
              })
            : 'Finding Users'}
        </div>
      </div>
    </div>
  )
}

export default Home