import React from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Private() {

  const handleSignout = () => {
    signOut(auth)
    .then(() => alert("You have been signed out"))
    .catch(error => {
      console.log(error);
      alert(error.message);
    })
  }
  
  
  
  return (
    <>
      <div>
        <h1>Private Page</h1>
        <button onLostPointerCapture={handleSignout}>Sign Out</button>
      </div>
    </>
  )
}

export default Private
