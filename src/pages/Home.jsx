import React, { useState } from 'react'
import {createUserWithEmailAndPassword, reauthenticateWithRedirect, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from '../firebase'
import { Navigate, useNavigate } from 'react-router-dom'
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
            setError("Email and password both are required")
            return
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials) => {
            const user =  userCredentials.user;
            console.log(user)
            navigate('Private')
        })
        .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message
             setError(errorMessage)
             console.log({error})
        })
        
    }
    function handleSignin(){
        if(!email || !password){
            setError("Email and password both are required")
            return ;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log()

        })


        .catch((error) => {
            const errorCode = error.code;
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
      <div className='border text-center p-20' >
        <form action="" className=''>
            {isSignUpActive && <legend className='text-4xl font-semibold mb-5'>SignUp</legend>}
            {!isSignUpActive && <legend className='text-4xl font-semibold mb-5'>SignIn</legend>}
            <fieldset>
                <ul>
                    <li className=''>
                        <label className='text-left'  htmlFor="email">Email</label> <br />
                        <input className='border p-2' type="email" id='email' onChange={handleEmailChange} />

                    </li>
                    <li>
                        <label  className='text-left' htmlFor="password">Password</label>
                        <br />
                        <input className='border p-2' type="password" id='password' onChange={handlePasswordChange} />

                    </li>
                   
                </ul>
                {isSignUpActive && (
                    <button type='button' className='mt-5 p-2 border bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold' onClick={handleSignup} >SignUp</button>
                )}
                {!isSignUpActive && (
                    <button type='button' className='mt-5 p-2 border bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold' onClick={handleSignin} >SignIn</button>
                )}
            </fieldset>
            {error &&  error}
            {isSignUpActive && <a onClick={handleMethodChange} >Already have an account? Sign In</a>}
            {!isSignUpActive && <a onClick={handleMethodChange} >Do not have an account? Sign Up</a>}
        </form>
      </div>
    </>
  )
}

export default Home
