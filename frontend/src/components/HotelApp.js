import * as React from 'react';
import { useNavigate } from 'react-router-dom';



export default function HotelApp() {
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
      <h1>Hotel App </h1>
    </div>
  );
}
