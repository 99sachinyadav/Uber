import { createContext, useState } from "react";
export const CaptionDataContext = createContext();

const CaptionContext = ({ children }) => {
  const [caption, setcaption] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    status: "",
    vehicals: {
      capacity: "",
      color: "",
      plate: "",
      vehicalType: "",  
    },
  });
 


  return (
    <CaptionDataContext.Provider value={{ caption, setcaption}}>
      {children}
    </CaptionDataContext.Provider>
  );
};

export default CaptionContext;
