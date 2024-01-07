import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Signup} from './components/Signup';
import {Signin} from './components/Signin';
import {Home} from './components/home/Home';
import Profile from './components/home/Profile';
import Books from './components/home/Books';
import {Add} from './components/home/Add';
import { Location } from './components/home/Location';
import { Secondfloor } from './components/home/Secondfloor';


export let AppContext = createContext();

function App ()  {

  const { userdata, setUserdata } = useState({}); 
  return (
    <div className="App">
      <AppContext.Provider 
        value={{userdata, setUserdata}}> 
        
        <Router>
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/home" element={<Home />} >
              <Route path="profile" element={<Profile />} />
              <Route path="books" element={<Books />} />
              <Route path="add" element={<Add />} />
              <Route path="firstfloor" element={<Location />} />
              <Route path="secondfloor" element={<Secondfloor />} />
            
            </Route>
             
          </Routes>
        </Router>
        
      </AppContext.Provider>
    </div>
  );
}

export default App;
