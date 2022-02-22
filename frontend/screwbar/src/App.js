import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/user/Login';
import token from './action/token';
import Signup from './component/user/Signup';


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route 
          path='/login'
          element={
            <>
              <Login />
            </>
          }>

        </Route>  
        <Route 
          path='/signup'
          element={
            <>
              <Signup />
            </>
          }>

        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App;
