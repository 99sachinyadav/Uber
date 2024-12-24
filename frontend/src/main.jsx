import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptionContext from "./context/captionContext.jsx";
import Socketcontext from "./context/Socketcontext.jsx";
 

createRoot(document.getElementById("root")).render(
  
    
      <Socketcontext>
        <CaptionContext>
        <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </UserContext>
        </CaptionContext>
      </Socketcontext>
      
    
  
);
