import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home  from './pages/Home'
import { useEffect, useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import { onAuthStateChanged  } from 'firebase/auth'
import {auth} from './firebase'
import Private from './pages/Private'
import Spinner from 'react-bootstrap/Spinner';



function App() {

  const [user,setUser] = useState(null)

  const [isFetching,setIsFetching] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        setUser(user)
        setIsFetching(false)

    })

    return () => unsubscribe()
    },[])

    
    if(isFetching){
      return(
       
          <div className='text-center m-28'>
          <Spinner animation="border" />;
          </div>
      

      ) 
        
    }
  
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path="/"  element={<Home/>} />
        <Route  path="/private"  element={<ProtectedRoute user={user}>
          <Private/>
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )

}
export default App
