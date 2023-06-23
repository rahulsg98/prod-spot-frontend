import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import mailImage from '../../../assets/Email.png';
import passImage from '../../../assets/Password.png';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProductContext from "../../../context/useProductContext";
import BASEURL from "../../../constants/base";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setPopup, setLoggedIn } = useProductContext();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${BASEURL}/login`, data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        setPopup(false);
        setLoggedIn(true);
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Invalid Credentials", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      } else {
        toast.error("Something went wrong");
        return;
      }
    }
  };

  const { redirectSignup } = props;

  return (
    <div className="login-field">
        <form className="login-form">
          <div className='mail-section'>
            <img src={mailImage} alt='email' />
            <input className='input' name='email' type='email' value={email} onChange={handleEmailChange} placeholder='Email'></input>
          </div>
          <div className='pass-section'> 
            <img src={passImage} alt='password' /> 
            <input className='input' name='password' type='password' value={password} onChange={handlePasswordChange} placeholder='Password'></input>
          </div>
          <p>Don&apos;t have an account? <span onClick={redirectSignup} className='underline'>Sign up</span> </p>
          <button className='submit' onClick={handleSubmit}>Log in</button>
        </form>
        <ToastContainer />
      </div>
  )
}

export default LoginForm;