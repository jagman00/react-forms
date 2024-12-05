import { useState } from "react";


export default function SignUpForm({setToken}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!username || !password) {
            setError("Username and password cannot be blank.");
            return;
        }

        if (username.length < 6 || password.length < 6) {
            setError("Username and password must be at least 6 characters long.");
            return;
          }

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
              headers: {"Content-Type": "application/json"},
              method: "POST",
              body: JSON.stringify({username, password}),
            });
            const result = await response.json();
            setToken(result.token)
            console.log(result.token);
            
            setSuccessMessage("Account created successfully!");
            setError(null);
            //clear username and password fields after submission
            setUsername("");
            setPassword("");

          } catch (error) {
            console.error(error);
          }  
    }
      
return (
<>
    <h2>Sign Up!</h2>
    {error && <p style={{color: "red"}}>{error}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
    <form onSubmit={handleSubmit}>
    <div className="padding">
    <label>
    Username: 
    <input 
        value={username} 
        onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError(null);}} />
    </label>
    </div>
              
    <div className="padding">
    <label>
    Password: 
    <input 
        type="password" 
        value={password} 
        onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(null);}} />
    </label>
    </div>
    <br />
    <button>Submit</button>
    </form>
</>
 );
}