import { useState } from 'react'
import './App.css'
import Authenticate from './Components/Authenticate'
import SignUpForm from './Components/SignUpForm'


function App() {

  const [token, setToken] = useState(null);

  return (
  <>
  
    <div className='signUp'>
      <SignUpForm token={token} setToken={setToken} />

      <Authenticate token={token} setToken={setToken} />
    </div>
  
  </>
  )
}

export default App
