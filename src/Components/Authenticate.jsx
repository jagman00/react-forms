import { useState } from "react"

export default function Authenticate({token}) {

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
          const response = await fetch(
            "https://fsa-jwt-practice.herokuapp.com/authenticate",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          console.log("Authenticate Result: ", result);
    
          // Check for jwt malformed
          if (result.message && result.message.toLowerCase().includes("jwt malformed")) {
            setError("JWT Malformed: Invalid token.");
            setSuccessMessage(null); // Clear any success message
          } else if (response.ok) {
            setSuccessMessage(result.message);
            setError(null); // Clear any error
          } else {
            setError(result.error || "Authentication failed.");
            setSuccessMessage(null); // Clear any success message
          }
        } catch (error) {
          setError("Network error or unexpected issue occurred.");
          setSuccessMessage(null); // Clear any success message
        }
    }

    return( 
    <>
    <h2>Authenticate:</h2>
    {successMessage && <p className="success-message">{successMessage}</p>}
    {error && <p className="error-message">{error}</p>}
    <button onClick={handleClick}>Authenticate Token!</button>

    </>
    )
  }