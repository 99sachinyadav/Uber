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
export  const backendUrl =  import.meta.env.VITE_BACKENDURL
const App = () => {

  return (
    <div>
      <Routes>
        <Route
          path="/start"
          element={
            <UserProtect>
              <Start backendUrl={backendUrl} />
            </UserProtect>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/caption-signin" element={<CaptionSignUp backendUrl={backendUrl } />} />
        <Route path="/caption-login" element={<Captionlogin backendUrl={backendUrl}/>} />
        <Route path="/riding" element={<Riding/>} />
        <Route path="/captionriding" element={<CaptionRiding backendUrl={backendUrl}/>} />
        <Route path="/signin" element={<UserSignin backendUrl={backendUrl} />} />
        <Route path="/login" element={<Userlogin />} />
        <Route
          path="/captionstart"
          element={
            <CaptionProtect>
              <CaptionStart backendUrl={backendUrl} />
            </CaptionProtect>
          }
        />
        <Route
          path="/userlogout"
          element={
            <UserProtect>
              <UserLogout backendUrl={backendUrl}/>
            </UserProtect>
          }
        />
        <Route
          path="/captionlogout"
          element={
            <CaptionProtect>
              <Captionlogout backendUrl={backendUrl} />
            </CaptionProtect>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
