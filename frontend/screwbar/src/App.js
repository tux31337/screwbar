import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/user/Login';
import Navbar from './component/Navbar';
import Signup from './component/user/Signup';
import AuthHoc from './hoc/auth';
import Home from './component/home';
import Chat from './component/chat/chat';
import MypageNavbar from './component/mypage/mypageNavbar';
import QuillEditor from './component/team/QuillEditor';
import Closed from './component/evaluation/closed';
import CreateTeam from './component/team/CreateTeam';
import MyTeam from './component/mypage/myTeam';
import Chatting from './component/chat/Chatting';
import Test from './component/Test';
import NewPw from './component/user/NewPw';
import FindPw from './component/user/FindPw';
import FindId from './component/user/FindId';
import Navbar2 from './component/Navbar2';

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
              <Navbar2 />
              <Signup />
            </>,
            false
          )}
        ></Route>
        <Route
          path="/"
          element={AuthHoc(
            <>
              <Test />
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
            false
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
          path="/myTeam"
          element={AuthHoc(
            <>
              <Navbar2 />
              <MypageNavbar />
              <MyTeam />
            </>
          )}
        ></Route>
        <Route
          path="/modifyProfile"
          element={AuthHoc(
            <>
              <Navbar2 />
              <MypageNavbar />
            </>
          )}
        ></Route>
        <Route
          path="/modifyPw"
          element={AuthHoc(
            <>
              <Navbar2 />
              <MypageNavbar />
            </>
          )}
        ></Route>
        <Route
          path="/chatting"
          element={AuthHoc(
            <>
              <Navbar />
              <Chatting />
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
          path="/FindId"
          element={AuthHoc(
            <>
              <FindId />
            </>,
            false
          )}
        ></Route>
        <Route
          path="/FindPw"
          element={AuthHoc(
            <>
              <FindPw />
            </>,
            false
          )}
        ></Route>
        <Route
          path="/NewPw"
          element={AuthHoc(
            <>
              <NewPw />
            </>,
            false
          )}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
