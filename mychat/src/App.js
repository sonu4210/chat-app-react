import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './components/Search';
import Sidebar from './components/Sidebar';
import {BrowserRouter ,Routes,Route, Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {currentUser}= useContext(AuthContext) 

  console.log("auth", currentUser);
  const ProtectedRoute=({children})=>{
    console.log("auth1", currentUser);
    if(!currentUser){
      return<Navigate to='/login'/>
    }
    return children
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='login' element={<Login />}/>
        </Route>
        <Route path='register' element={<Register />}/>
      </Routes>
      </BrowserRouter>
        {/* <Register />  
      {/* <Login /> */}
       {/* <Home /> */}
      {/* <Search /> 
      <Sidebar /> */} 
    </div>
  );
}

export default App;
