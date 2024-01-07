import axios from 'axios';
import "./Signin.css"
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { AppContext } from "../App";

export let  Signin = () => {
  
  let { userdata, setUserdata } = useContext(AppContext); 
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [response, setResponse] = useState("");
  let navigate = useNavigate();
   
  let checkUser = sessionStorage.getItem("user");

  useEffect(() => {
    if (checkUser) {
      navigate("/home");
    }
  }, []);



  let signinAPI = async (newPost) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/kentoy_cs_workspace/library/account/login",
        newPost
      );
        
      return true;
    } catch (err) {
      
      setResponse(err.response.data.message);
      return;
    }
  };

  let handleSignin = async () => {
    if (
     email === "" ||
      password === ""
    ) {
      setResponse("Please fill all fields");
      return;
    }

    let data = {
       email: email,
      password: password,
    };
    let getStatus = await signinAPI(data);
    if (getStatus) {
      navigate("/home");
    } else {
      // Handle unsuccessful login here, e.g., display an error message
      console.log("Login failed");
    }
  };
  



  return (
    <div className='Signin'>
       
     <div className="credentials-box">
      <h2>Signin</h2>
      <div className='email'>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='password'>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <span className='error-response'>{response}</span>
      </div>
      <div className='btn'>
        <button onClick={handleSignin}>Signin</button>
      </div>

      <Link to="/signup">Signup here</Link>
    </div>
    </div>
  );
};

export default Signin;
