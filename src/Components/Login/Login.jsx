import LoginForm from '../Forms/LoginForm/LoginForm';
import './Login.css';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className='title'>
        <h1>Feedback</h1>
        <p>Add your products and give us your valuable feedback</p>
      </div>
      <LoginForm
        redirectSignup={() => {
          navigate("/register");
        }}
      />
    </div>
  )
}

export default Login;