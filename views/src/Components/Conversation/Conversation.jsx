import React from 'react'
import {getUser} from '../../api/UserRequest'

const Conversation = ({data, currentUser, online}) => {

    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
       
        const userId = data?.members?.find((id)=>id!==currentUser)
        console.log(userId);
        const getUserData = async() => {
            try {
                const {data} = await getUser(userId)
                setUserData(data)
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [])
    
  return (
    <>
      <div className="follower conversation">
        <div>
           {online && <div className="online-dot"></div>}
          <img
            src={userData?.profileImage? process.env.REACT_APP_PUBLIC_FOLDER + userData.profileImage : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Conversation