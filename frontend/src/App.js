import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./components/Login";
import EmployeeApp from "./components/EmployeeApp";
import CustomerApp from "./components/CustomerApp";
import CreateAccount from "./components/accounts/CreateAccount";
import CustomerSignIn from "./components/accounts/Customer";
import EmployeeSignIn from "./components/Employee";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/customer-app" element={<CustomerApp />} />
            <Route path="/employee-app" element={<EmployeeApp />} />
            <Route path="/customer" element={<CustomerSignIn />} />
            <Route path="/employee" element={<EmployeeSignIn />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
