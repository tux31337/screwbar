import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/user/Login';
import Navbar from './component/Navbar';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth';
import Home from './component/home';
import Chat from './component/chat/chat';
import QuillEditor from './component/team/QuillEditor';
import Closed from './component/evaluation/closed';
import CreateTeam from './component/team/CreateTeam';

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
            </>,

            true
          )}
        ></Route>

        <Route
          path="/closeD"
          element={AuthHoc(
            <>
              <Navbar />
              <Closed />
            </>,
            true
          )}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
