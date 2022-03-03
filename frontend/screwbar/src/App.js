import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/user/Login';
import Navbar from './component/Navbar';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth'
import Home from './component/home';
import CreateTeam from './component/team/CreateTeam';
import Chat from './component/chat/chat';
import QuillEditor from './component/team/QuillEditor';



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
              <Navbar />
              <Signup />
            </>, false
          )}>
        </Route>
        <Route 
          path='/home'
          element={AuthHoc(
            <>
              <Navbar />
              <Home />
            </>, false
          )}>
        </Route> 
        <Route 
          path='/post'
          element={AuthHoc(
            <>
              <Navbar />
              <QuillEditor />
            </>, true
          )}>
        </Route> 
        <Route 
          path='/chat'
          element={AuthHoc(
            <>
              <Navbar />
              <Chat />
            </>, true
          )}>
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
