import React, { useState } from 'react'
import {createUserWithEmailAndPassword, reauthenticateWithRedirect, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from '../firebase'
function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUpActive, setIsSignUpActive] = useState(true)
    const [error, setError] = useState("")

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
      <div className='border text-center' >
        <form action="" className=''>
            {isSignUpActive && <legend>SignUp</legend>}
            {!isSignUpActive && <legend>SignIn</legend>}
            <fieldset>
                <ul>
                    <li className=''>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={handleEmailChange} />

                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={handlePasswordChange} />

                    </li>
                   
                </ul>
                {isSignUpActive && (
                    <button type='button' onClick={handleSignup} >SignUp</button>
                )}
                {!isSignUpActive && (
                    <button type='button' onClick={handleSignin} >SignIn</button>
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
