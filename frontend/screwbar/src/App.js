import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/user/Login';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth'



const App = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route 
          path='/login'
          element={AuthHoc(
            <>
              <Login />
            </>,
            false
          )}
          />
        <Route 
          path='/signup'
          element={AuthHoc(
            <>
              <Signup />
            </>, true
          )}>
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App;
