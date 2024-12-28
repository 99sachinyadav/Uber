import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaptionSignUp from "./pages/CaptionSignUp";
import Captionlogin from "./pages/Captionlogin";
import UserSignin from "./pages/UserSignin";
import Userlogin from "./pages/Userlogin";
import Start from "./pages/Start";
import UserProtect from "./pages/UserProtect";
import { UserLogout } from "./pages/UserLogout";
import CaptionStart from "./pages/CaptionStart";
import CaptionProtect from "./pages/CaptionProtect";
import Captionlogout from "./pages/Captionlogout";
import Riding from "./pages/Riding";
import CaptionRiding from "./pages/CaptionRiding";
export  const backendUrl = "https://uber3.onrender.com"
// "https://uber-backend-5ype.onrender.com"
const App = () => {

  return (
    <div>
      <Routes>
        <Route
          path="/start"
          element={
            <UserProtect>
              <Start   />
            </UserProtect>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/caption-signin" element={<CaptionSignUp   />} />
        <Route path="/caption-login" element={<Captionlogin  />} />
        <Route path="/riding" element={<Riding/>} />
        <Route path="/captionriding" element={<CaptionRiding  />} />
        <Route path="/signin" element={<UserSignin   />} />
        <Route path="/login" element={<Userlogin />} />
        <Route
          path="/captionstart"
          element={
            <CaptionProtect>
              <CaptionStart   />
            </CaptionProtect>
          }
        />
        <Route
          path="/userlogout"
          element={
            <UserProtect>
              <UserLogout  />
            </UserProtect>
          }
        />
        <Route
          path="/captionlogout"
          element={
            <CaptionProtect>
              <Captionlogout   />
            </CaptionProtect>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
