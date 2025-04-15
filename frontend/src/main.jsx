// import { createContext, StrictMode, useState } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import { isAdminAuthenticated } from "../../backend/middlewares/auth.js";

// export const Context=createContext({isAdminAuthenticated:false});
// const Appwarper=()=>{
//   const[isAuthenticated,setIsAuthenticated]=useState(false);
//   const[user,setuser]=useState({});
//   return (
    // <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setuser}}>
      // <App/>
    // </Context.Provider>
//   )
// }

// createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    // <Appwarper />
  // </React.StrictMode>
// );
import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);