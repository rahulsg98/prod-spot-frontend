import {Routes, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/Main/Main';
import { Provider } from './context/ProductContext';

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Main />}></Route>  
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </Provider>
  )
}

export default App;