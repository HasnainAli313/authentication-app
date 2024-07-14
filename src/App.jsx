import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home  from './pages/Home'
// import Private  from './pages/Private'
import { useEffect, useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import { onAuthStateChanged  } from 'firebase/auth'
import {auth} from './firebase'
import Private from './pages/Private'



function App() {

  const [user,setUser] = useState(null)

  const [isFetching,setIsFetching] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
     
      if(user){
        setUser(user)
        setIsFetching(false)
      return
      }

      setUser(null)
      setIsFetching(false)
    })

    return () => unsubscribe()
    },[])

    
    if(isFetching){
      return <h2>Loading....</h2>
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
