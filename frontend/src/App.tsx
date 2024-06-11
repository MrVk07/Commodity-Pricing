import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/molecules/Navbar';
import HomeScreen from './components/screens/HomeScreen';
import Category from './components/screens/Category';
import Loading from './components/screens/loader/Loading';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/:category' element={<Category />} />
      </Routes>
    </Router>
  )
}

export default App