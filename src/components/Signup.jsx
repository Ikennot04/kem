import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { AppContext } from "../App";

export let Signup = () => {
  let checkUser = sessionStorage.getItem("user");

  useEffect(() => {
    if (checkUser) {
      navigate("/home/profile");
    }
  }, []);

  let { userdata } = useContext(AppContext); 
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [response, setResponse] = useState("");

  let navigate = useNavigate(); // Access the navigate function

  let signupAPI = async (newPost) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/kentoy_cs_workspace/library/account/signup",
        newPost
      );
        
      return true;
    } catch (err) {
      console.log(err.response.data.message);
      setResponse(err.response.data.message);
      return;
    }
  };

  let handleSignup = async () => {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
      setResponse("Please fill all fields");
      return;
    }

    let data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    let getStatus = await signupAPI(data);

    getStatus && navigate("/");
  };


  return (
    <div className='all'>
      <div className='Sign'>
        <h1>Create your Account</h1>
        
        <div className='info'>
          <h1>First name</h1>
          <input
            type='text'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <h1>Last name</h1>
          <input
            type='text'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

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
      
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
      <div>Member already? Signin<Link to='/'> here</Link></div>
    </div>
    
  );
};

export default Signup;
