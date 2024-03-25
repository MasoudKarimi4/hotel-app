import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// These imports are all components / pages 
import SignIn from "./components/Login";
import CreateAccount from "./components/accounts/CreateAccount";
import HotelApp from "./components/HotelApp"

import CustomerSignIn from "./components/accounts/Customer"
import EmployeeSignIn from "./components/Employee"


function App() {
 return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/hotel-app" element={<HotelApp />} />
            <Route path="/customer" element={<CustomerSignIn />} />
            <Route path="/employee" element={<EmployeeSignIn />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
 );
}

export default App;
