import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Profile.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MessageBar from '../Message/MessageBar'

function Profile() {
  const { id } = useParams()

  const [user, setUser] = useState([])

  // fetching users data from given api

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
    fetchData()
  }, [id])

  const userInfo = {
    name: user.name,
    pic: user.profilepicture,
    mail: user.email,
  }

  return (
    <>
      {user && (
        <div className="profile-container">
          <Sidebar />
          <div className="header-section">
            <Header userInfo={userInfo} page="Profile" />
            <div className="profile-sec">
              <div className="avatar-sec">
                <img src={user.profilepicture} alt="avatar" />
                <h2>{user.name}</h2>

                {/* Profile left section */}

                <div className="personal-details">
                  <ul>
                    <li>
                      <span className="key">Username : </span>
                      <span className="value">{user.username}</span>
                    </li>
                    <li>
                      <span className="key">e-mail : </span>
                      <span className="value">{user.email}</span>
                    </li>
                    <li>
                      <span className="key">Phone : </span>
                      <span className="value">{user.phone}</span>
                    </li>
                    <li>
                      <span className="key">Website : </span>
                      <span className="value">{user.website}</span>
                    </li>
                  </ul>
                </div>
                <h3>Company</h3>
                <div className="company-details">
                  <ul>
                    <li>
                      <span className="key">Name : </span>
                      <span className="value">{user.company?.name}</span>
                    </li>
                    <li>
                      <span className="key">catchphrase : </span>
                      <span className="value">{user.company?.catchPhrase}</span>
                    </li>
                    <li>
                      <span className="key">bs : </span>
                      <span className="value">{user.company?.bs}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profile Right section */}

              <div className="map-sec">
                <h3>Address :</h3>
                <div className="address-sec">
                  <ul>
                    <li>
                      <span className="key">Street : </span>
                      <span className="value">{user.address?.street}</span>
                    </li>
                    <li>
                      <span className="key">Suite : </span>
                      <span className="value">{user.address?.suite}</span>
                    </li>
                    <li>
                      <span className="key">City : </span>
                      <span className="value">{user.address?.city}</span>
                    </li>
                    <li>
                      <span className="key">Zipcode : </span>
                      <span className="value">{user.address?.zipcode}</span>
                    </li>
                  </ul>
                </div>

                {/* Map section  */}
                {/* Map is set by the React leaflet */}

                <div className="map">
                  <div>
                    {user?.address?.geo?.lat && user?.address?.geo?.lng && (
                      <MapContainer
                        center={[user.address.geo.lat, user.address.geo.lng]}
                        zoom={5}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[
                            user.address.geo.lat,
                            user.address.geo.lng,
                          ]}
                        />
                      </MapContainer>
                    )}
                    <div className="lat-lng">
                      <p>
                        Lat:<span> {user.address?.geo?.lat}</span>
                      </p>
                      <p>
                        Long:<span> {user.address?.geo?.lat}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message list in the Profile page */}

          <div className="chat-sec">
            <MessageBar user={user} />
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
