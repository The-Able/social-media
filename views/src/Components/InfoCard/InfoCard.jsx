import React from 'react'
import './InfoCard.css'
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { logout } from '../../actions/AuthAction'

const InfoCard = () => {
    const[modalOpened, setModalOpened] = React.useState(false)
 
    const dispatch = useDispatch()
    const params = useParams()

    const profileUserId =params.id;
    const [profileUser, setProfileUser] = React.useState({})

    const {user} = useSelector((state) => state.authReducer.authData)

    React.useEffect(() => {
        const fetchProfileUser = async () =>{
            if(profileUserId === user._id)
            {
                setProfileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser();
    },[user])

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
    <div className="InfoCard">
        <div className="infoHead">
            <h3>Profile Info</h3>

            {user._id === profileUserId ?
            (<div>

            <UilPen width="2rem" height="1.2rem" onClick={()=> setModalOpened(true)} />
            
            <ProfileModal 
                       modalOpened={modalOpened} 
                       setModalOpened={setModalOpened} 
                       data={user}
                       />
            
            </div>) : null }
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span>{profileUser.relationship}</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in </b>
            </span>
            <span>{profileUser.livesin}</span>
        </div>
        <div className="info">
            <span>
                <b>Works at </b>
            </span>
            <span>{profileUser.worksAt}</span>
        </div>
        <button 
               className="button logout-button"
               onClick={handleLogOut}
               >
                Logout
        </button>
    </div>
  )
}

export default InfoCard