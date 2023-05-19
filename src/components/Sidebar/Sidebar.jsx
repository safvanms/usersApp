import React from 'react'
import './sidebar.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function Sidebar() {
  const { id } = useParams()
  const location = useLocation();

  const sidebarOptions = [
    {
      option: 'Profile',
      link: `/profile/${id}/profile`,
    },
    {
      option: 'Posts',
      link: `/profile/${id}/posts`,
    },
    {
      option: 'Gallery',
      link: `/profile/${id}/gallery`,
    },
    {
      option: 'ToDo',
      link: `/profile/${id}/todo`,
    },
  ]

  return (
    <div className="sidebar">
      {sidebarOptions.map((elem, index) => {
          const isActive = location.pathname === elem.link;
        return (
          <div className='sidebar-option' key={index}>
            <NavLink
              activeClassName="active"
              to={elem.link}
              style={{ textDecoration: 'none' }}
            >
              <p>{elem.option}{isActive && <div className="active-mark">
                <ChevronRightIcon style={{color:"#bbbb", fontSize:"23px"}}/>
                </div>}</p>
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}
