import React from 'react'
import './InfoCard.css'
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from '../ProfileModal/ProfileModal';

const InfoCard = () => {
    const[modalOpened, setModalOpened] = React.useState(false)
 
    return (
    <div className="InfoCard">
        <div className="infoHead">
            <h3>Your Info</h3>
            <div>

            <UilPen width="2rem" height="1.2rem" onClick={()=> setModalOpened(true)} />
            
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
            
            </div>
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span>Single</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in </b>
            </span>
            <span>Moon</span>
        </div>
        <div className="info">
            <span>
                <b>Works at </b>
            </span>
            <span>Unemployed</span>
        </div>
        <button className="button logout-button">Logout</button>
    </div>
  )
}

export default InfoCard