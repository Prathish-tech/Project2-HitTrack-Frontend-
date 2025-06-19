import './App.css';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Practice from './pages/Practice';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Navbar /> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/learn' element={<Learn/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/practice' element={<Practice/>}/>
      <Route path='/profile' element={<Profile/>}/>
   </Routes>
 </BrowserRouter>
 )
}

export default App;