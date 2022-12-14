import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import {useSelector} from "react-redux"


function NavBar() {
  const [click, setClick] = useState(false);
  const token = localStorage.getItem('authortoken')
  const result = useSelector(state => state)


  console.warn("data In Navbar" ,result)
  console.warn("author id.in Navabar" , result.authorId)
 

 
  

  const handleClick = () => setClick(!click);
  return (
    <>
    
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            JayVision
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink>
            </li>
            
        
            <li className="nav-item">
            <select name="cars" id="cars">
              <option value="name">Name</option>
              <option value="email">email</option>
              <option value="id">id </option>
              <option>Logout</option>
            </select>
              </li> 
                
                

          </ul>      
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default NavBar;
