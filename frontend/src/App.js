import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// These imports are all components / pages 
import SignIn from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import HotelApp from "./components/HotelApp"


function App() {
 return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/hotel-app" element={<HotelApp />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
 );
}

export default App;
