import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Login";
import CreateAccount from "./components/CreateAccount";

function App() {
 return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
 );
}

export default App;
