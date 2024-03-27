import * as React from 'react';
import { useNavigate } from 'react-router-dom';



export default function EmployeeApp() {
  // navigate is how you go to other pages 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div>
      {/* Your JSX content for the editing page goes here */}
      <h1>Employee App </h1>
    </div>
  );
}
