import { useState } from "react";
import "./Holder.css"; // Import your CSS file

const Holder = () => {
  
  const [response, setResponse] = useState(null);
 

  const [requestData] = useState({
    cid: "QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs", //replace me
  });



 
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/read-json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setResponse(data);
        console.log(data);

      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("Error fetching data");
      }
    };

  return (
    <>
      <div>
        <h1>Holder Webpage </h1>
      </div >
      <div> <button onClick={fetchData}>Fetch Passport Card</button> </div>
      <div className="Holder-container">
      <div>
      <div className="credentials-container">
      <h2>Credentials:</h2>
      <div>
        {response !== null ? (
          <div>
            <p className="text-style">Name: {response.credentials.name}</p>
            <p className="text-style">Passport ID: {response.credentials.passportId}</p>
            <p className="text-style">Age: {response.credentials.age}</p>
            <p className="text-style">Address: {response.credentials.address}</p>
          </div>
        ) : (
          <p className="text-style">Click the Fetch Data button</p>
        )}
      </div>
    </div>
     
    </div>
      </div>
    </>
  );
};

export default Holder;
