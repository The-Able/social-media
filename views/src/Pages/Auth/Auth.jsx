import React from 'react'
import './Auth.css'
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.authReducer.loading)
  
  const[isSignUp, setIsSignUp] = React.useState(true)

  const[formData, setFormData] = React.useState({firstname:"", lastname:"", username:"", password:"", confirmpass: ""})

  const[passMatch, setPassMatch] = React.useState(true)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(isSignUp) {
      formData.password === formData.confirmpass 
      ? dispatch(signUp(formData))
      : setPassMatch(false);
     } else {
      dispatch(logIn(formData));
     }
  }
  const resetForm = () => {
    setPassMatch(true)
    setFormData({
      firstname:"", lastname:"", username:"", password:"", confirmpass: ""
    })
  }


    return (
        <div className="Auth">
          
          {/* Left Side */}

          <div className="a-left">
            <img src={Logo} alt="" />
            <div className="Webname">
              <h1>Sajib</h1>
              <h6>Just Messing with MERN Stack!</h6>
            </div>
          </div>

          {/* Right Side Form */}
          
          <div className="a-right">
          <form className="infoForm authForm" onSubmit={handleSubmit}>
            <h3>{ isSignUp ? 'Sign Up' : 'Log In'}</h3>

            { isSignUp && 
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={formData.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
              />
            </div>
            }

            <div>
              <input
                type="text"
                className="infoInput"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
    
            <div>
              <input
                type="password"
                className="infoInput"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              { isSignUp && 
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmpass}
              />
              }
            </div>

            <span style={{
              display: passMatch ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px'
            }}>
              * Password and Confirm Password ain't Same!
            </span>
    
            <div>
                <span style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => {setIsSignUp((prev)=> !prev); resetForm()}}>
                  {isSignUp ? 'Already have an account? Login!' : "Don't have an account? Sign Up!"}
                </span>
            </div>
            <button className="button infoButton" type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>

        </div>
      );
    };
    

export default Auth