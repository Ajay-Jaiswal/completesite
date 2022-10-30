import React,{useState, useContext} from "react";
import { NavLink , useHistory} from "react-router-dom";
import pic from "./image/superman.gif"
import addData from "../redux/Action"

import {useDispatch} from "react-redux";


 const Login = () => {
 const dispatch = useDispatch();


    const history = useHistory();

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')


  
 


  function Saveuser(e){
    e.preventDefault();
    let data  = { email, password}
    console.warn( email, password)
    
    fetch("http://localhost:4000/login",{
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then((result) =>{
      result.json().then((resp) =>{
        console.warn("resp" , resp)
        
        localStorage.setItem('authortoken', resp.data.token)

        if(resp.status === true){
         dispatch(addData(resp))
          window.alert( resp.message );
          console.log('Login Sucessfull '+ resp.message );
          history.push("/blog")
            
        } else{

          window.alert( resp.message)
            console.log('invalid '+ resp.message)
        }
        
      })
    })
    
  }


  return (
    
    <div className="form">

       <div className="div1">
       
        <img src={pic} />

        
      </div>
      <div className="div2">
      <form >
        <h1>Login</h1>
        <label>
          Email :  
           <input type="text" name="email" value = {email} onChange={(e)=>{setEmail(e.target.value)}} />
        </label><br></br>

        <label>
          Password :  
           <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </label><br></br>

        <button type="button" className="button-33" onClick={Saveuser}>Login</button>
      </form>
      <NavLink to="/" >Register</NavLink>
      </div>
    </div>
  );
}

export default Login ; 