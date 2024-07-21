import React from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Private() {

  const handleSignout = () => {
    signOut(auth)
    .then(() => {
      alert("You have been signed out")
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    })
  }
  
  
  
  return (
    <>
      <div className='flex flex-col border-1 border-red-600 items-center justify-center h-screen bg-gray-300' >
        <h1 className='text-6xl'>Welcome</h1>
        <p className='text-xl'>Welcome to  React Tutorial.</p>
        <button className='mt-5 p-2 border bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold ' onClick={handleSignout}>Sign Out</button>
      </div>
    </>
  )
}

export default Private
