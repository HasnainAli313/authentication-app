import React, { useState } from 'react'
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth"
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUpActive, setIsSignUpActive] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSignup(){
        if(!email || !password){
            setError("Please enter email and password!")
            return
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials) => {
            const user =  userCredentials.user;
            console.log(user)
            navigate('/Private')
        })
        .catch((error) => {
             const errorMessage = error.message
             setError(errorMessage)
             console.log({error})
        })
        
    }
    function handleSignin(e){
        e.preventDefault();
        if(!email || !password){
            setError("Please enter email and password")
            return ;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            navigate('/private')

        })
        .catch((error) => {
            const errorMessage = error.message
            setError(errorMessage)
            console.log({error})
       })   
    }

    function handleMethodChange(){
        setIsSignUpActive(!isSignUpActive)
    }  




  return (
    <>
    <div className='main'>
      <div className='border rounded-xl  bg-gray-200 text-center m-10  md:w-[500px] p-5  md:p-20' >
        <form action="" className='  ' >
            {isSignUpActive && <legend className='text-4xl font-semibold '>SignUp</legend>}
            {!isSignUpActive && <legend className='text-4xl font-semibold '>SignIn</legend>}
            <fieldset className='text-center'>  
                   <div className='flex flex-col align-middle text-left w-[100%]  gap-1'>
                    
                        <label className='pb-2 pt-2 font-semibold'  htmlFor="email">Email</label> 
                        <input className='border-2 border-gray-400 outline-1 outline-blue-400   sm:w-[400px] p-2 ' type="email" id='email' onChange={handleEmailChange} />
                   
                        <label  className='pb-2 pt-2 font-semibold' htmlFor="password">Password</label>
                        <input className='border-2 border-gray-400  outline-1 outline-blue-400  sm:w-[400px] p-2 ' type="password" id='password' onChange={handlePasswordChange} />
                   
                {isSignUpActive && (
                        <button type='button' className='mt-5 p-2 border bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold sm:w-[400px] ' onClick={handleSignup} >SignUp</button>
                )}
                {!isSignUpActive && (
                        <button type='button' className='mt-5 p-2 border bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold  sm:w-[400px]' onClick={handleSignin} >SignIn</button>
                )}
                </div>
            <div >
            {error && <p className='text-red-600'>{ error}</p> }
            <div className=''>
            {isSignUpActive && <a onClick={handleMethodChange} className='text-xl no-underline text-black' >Already have an account? <span className='text-blue-500'>Sign In</span> </a>}
            {!isSignUpActive && <a onClick={handleMethodChange} className='text-xl no-underline text-black' >Do not have an account? <span className='text-blue-500'>Sign Up</span> </a>}
            </div>
            </div>
            </fieldset>
        </form>
      </div>
    </div>
    </>
  )
}

export default Home
