import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/user/Login';
import Navbar from './component/Navbar';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth';
import Home from './component/home';
<<<<<<< HEAD
import CreateTeam from './component/team/CreateTeam';
import Closed from './component/evaluation/closed';
=======
>>>>>>> d13bcabc1dd12628f767d0fbcf2c37852af6c368
import Chat from './component/chat/chat';
import QuillEditor from './component/team/QuillEditor';
import Closed from './component/evaluation/closed';

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
              <Navbar />
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
        <Route
          path="/post"
          element={AuthHoc(
            <>
              <Navbar />
              <QuillEditor />
            </>,
            true
          )}
        ></Route>
        <Route
          path="/chat"
          element={AuthHoc(
            <>
              <Navbar />
              <Chat />
<<<<<<< HEAD
            </>,
            true
          )}
        ></Route>
=======
            </>, true
          )}>
        </Route> 
        <Route 
          path='/closeD'
          element={AuthHoc(
            <>
              <Navbar />
              <Closed />
            </>, true
          )}>
        </Route> 
>>>>>>> d13bcabc1dd12628f767d0fbcf2c37852af6c368
      </Routes>
    </BrowserRouter>
  );
};

export default App;
