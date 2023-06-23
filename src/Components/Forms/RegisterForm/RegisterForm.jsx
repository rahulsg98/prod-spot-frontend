import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import './RegisterForm.css';
import mailImage from '../../../assets/Email.png';
import passImage from '../../../assets/Password.png';
import userImage from '../../../assets/User.png';
import mobileImage from '../../../assets/Mobile.png';
import axios from "axios";
import useProductContext from "../../../context/useProductContext";
import BASEURL from '../../../constants/base';

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const { setPopup } = useProductContext();
  const navigate = useNavigate();

  const { redirectLogin } = props;

  const onClose = () => {
    setPopup(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      mobile,
      name,
    };

    try {
      const response = await axios.post(`${BASEURL}/register`, data);
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      setEmail("");
      setPassword("");
      setMobile("");
      setName("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
    onClose();
  };
  return (
    <div className="register-field">
        <form className="register-form">
          <div className='user-section'> 
            <img src={userImage} alt='user' /> 
            <input className='input' name='username' type='text' value={name} onChange={handleNameChange} placeholder='Name'></input>
          </div>
          <div className='mail-section'>
            <img src={mailImage} alt='email' />
            <input className='input' name='email' type='email' value={email} onChange={handleMailChange} placeholder='Email'></input>
          </div>
          <div className='mobile-section'> 
            <img src={mobileImage} alt='mobile' /> 
            <input className='input' name='mobile' type='number' value={mobile} onChange={handleMobileChange} placeholder='Mobile'></input>
          </div>
          <div className='pass-section'> 
            <img src={passImage} alt='password' /> 
            <input className='input' name='password' type='password' value={password} onChange={handlePasswordChange} placeholder='Password'></input>
          </div>
          <p>Already have an account? <span onClick={redirectLogin} className='underline'>Log in</span> </p>
          <button className='submit' onClick={handleSubmit}>Signup</button>
        </form>
      </div>
  )
}

export default RegisterForm;