import React from 'react'
import ProfileLeft from '../../Components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import PostSide from '../../Components/PostSide/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import './Profile.css'


const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location="profilePage" />
          <PostSide />
        </div>
        <RightSide />
    </div>
  )
}

export default Profile