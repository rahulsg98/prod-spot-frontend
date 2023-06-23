import './Register.css';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className='title'>
        <h1>Feedback</h1>
        <p>Add your products and give us your valuable feedback</p>
      </div>
      <RegisterForm 
        redirectLogin ={()=>{
          navigate('/login');
        }}
      />
    </div>
  )
}

export default Register;