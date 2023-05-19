import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import ToDo from './components/EmptyPage/ToDo'
import Gallery from './components/EmptyPage/Gallery'
import Posts from './components/EmptyPage/Posts'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/profile/:id/profile' index element={<Profile />} />
          <Route path='/profile/:id/posts' index element={<Posts />} />
          <Route path='/profile/:id/gallery' index element={<Gallery />} />
          <Route path='/profile/:id/todo' index element={<ToDo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
