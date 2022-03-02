import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/user/Login';
import Navbar from './component/Navbar';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth';
import Home from './component/home';
import CreateTeam from './component/team/CreateTeam';
<<<<<<< HEAD
import Closed from './component/evaluation/closed';
=======
import Chat from './component/chat/chat';
import QuillEditor from './component/team/QuillEditor';


>>>>>>> 96a5265d83c85496f7a382e6ebe4d43d252bb912

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={AuthHoc(
            <>
              <Login />
            </>,
            false
          )}
        />
        <Route
          path="/signup"
          element={AuthHoc(
            <>
              <Signup />
            </>,
            false
          )}
        ></Route>
        <Route
          path="/home"
          element={AuthHoc(
            <>
              <Navbar />
              <Home />
<<<<<<< HEAD
            </>,
            true
          )}
        ></Route>
        <Route
          path="/post"
          element={AuthHoc(
            <>
              <Navbar />
              <CreateTeam />
            </>,
            true
          )}
        ></Route>
        <Route
          path="/closed"
          element={AuthHoc(
            <>
              <Navbar />
              <Closed />
            </>,
            true
          )}
        ></Route>
=======
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
>>>>>>> 96a5265d83c85496f7a382e6ebe4d43d252bb912
      </Routes>
    </BrowserRouter>
  );
};

export default App;
