import React,{useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import pic from "./image/superman.gif"

 const Home = () => {
  const history = useHistory();
  
  const[fname,setFname] = useState('')
  const[lname,setLname] = useState('')
  const[title,setTitle] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  let data  = {fname ,lname, title, email, password}
  console.log(data)
  

  function Saveuser(e){
    e.preventDefault();
    let data  = {fname ,lname, title, email, password}
    fetch("http://localhost:4000/authors",{
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then((result) =>{
      result.json().then((resp) =>{
        console.warn("resp" , resp)

        if(resp.status === true){
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
      <h1 style={{margin:"20px"}}>SignUp</h1>
        <label>
          Name :  
           <input type="text"  value={fname} onChange={(e) => setFname(e.target.value) } name="fname"/>
        </label><br></br>

        <label>
          Last Name :  
           <input type="text" name="lname" value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
        </label><br></br>

        <label> 
          Title :  
           
          <select value={title} onChange={(e)=>{setTitle(e.target.value)}} >
          <option>select</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>

        </label>

        <br></br>

        <label>
          Email :  
           <input type="text" name="email" value = {email} onChange={(e)=>{setEmail(e.target.value)}} />
        </label><br></br>

        <label>
          Password :  
           <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </label><br></br>

        <button type="button" className="button-33" onClick={Saveuser}>SignUp</button>
      </form>

      <NavLink to="/Login" >Login</NavLink>
      </div>

    </div>
  );
}

export default Home;
