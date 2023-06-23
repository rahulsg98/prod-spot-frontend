import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import useProductContext from '../../../context/useProductContext';
import './Navbar.css';
import userImage from '../../../assets/UserImage.png';

const Navbar = () => {
    const navigate = useNavigate();
    const {loggedIn, setLoggedIn } = useProductContext();

    useEffect(() => {
        if (localStorage.getItem("token")) {
          setLoggedIn(true);
        }
      }, [setLoggedIn]);      
    
      const onHeaderLogin = () => {
        navigate("/login");
      };
    
      const logoutHeader = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
      };
    
      const onHeaderSignup = () => {
        navigate("/register");
      };
  return (
    <div className='navbar'>
      <span className='navbar-header'>Feedback</span>
      {loggedIn ? (
        <div className='navbar-loggedIn'>
          <p className='navbar-logout-button' onClick={logoutHeader}>
            Log out
          </p>
          <span>Hello! </span>
          <img src={userImage} alt="user" />
        </div>
      ) : (
        <div className='navbar-tail'>
          <p className='navbar-login-button' onClick={onHeaderLogin}>
            Login
          </p>
          <p className='navbar-signup-button' onClick={onHeaderSignup}>
            Signup
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;