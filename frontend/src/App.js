import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./components/Login";
import EmployeeApp from "./components/EmployeeApp";
import DeleteCustomers from './components/DeleteCustomers';
import UpdateCustomers from './components/UpdateCustomers'; 
import DeleteHotels from './components/DeleteHotels'; // Import the component
import UpdateHotels from './components/UpdateHotels'; // Import the component
import ViewRoomsByArea from './components/ViewRoomsByArea'; // Import the component
import ViewRoomCapacityByHotel from './components/ViewRoomCapacityByHotel'; // Import the component
import TransformBookingToRenting from './components/TransformBookingToRenting'; // Import the component









import CustomerApp from "./components/CustomerApp";
import CreateAccount from "./components/accounts/CreateAccount";
import CustomerSignIn from "./components/accounts/Customer";
import EmployeeSignIn from "./components/Employee";
import ChainView from './components/ChainView';
import DeleteEmployees from './components/DeleteEmployees'; // Adjust the import path as needed
import UpdateEmployees from './components/UpdateEmployees'; // Adjust the import path as needed
import DeleteRooms from './components/DeleteRooms';
import UpdateRooms from './components/UpdateRooms';



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
            <Route path="/employee-app/delete-customers" element={<DeleteCustomers />} />
            <Route path="/employee-app/update-customers" element={<UpdateCustomers />} />
            <Route path="/employee-app/delete-employees" element={<DeleteEmployees />} />
            <Route path="/employee-app/update-employees" element={<UpdateEmployees />} />
            <Route path="/employee-app/delete-hotels" element={<DeleteHotels />} />
            <Route path="/employee-app/update-hotels" element={<UpdateHotels />} />
            <Route path="/employee-app/delete-rooms" element={<DeleteRooms />} />
            <Route path="/employee-app/update-rooms" element={<UpdateRooms />} />
            <Route path="/view-rooms-by-area" element={<ViewRoomsByArea />} />
            <Route path="/view-room-capacity-by-hotel" element={<ViewRoomCapacityByHotel />} />
            <Route path="/transform-booking-to-renting" element={<TransformBookingToRenting />} />
            <Route path="/chains" element={<ChainView />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
