import "./App.css";
import React, { useState, createContext} from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  Home  from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import  Blog  from "./components/Pages/Blog";
import  Contact  from "./components/Pages/Contact";
import  Login from "./components/Pages/Login";
import  Cblog from "./components/Pages/Cblog";
import Update from "./components/Pages/Update"

export const GlobalInfo = createContext();

function App() {
  
  function loginData(item){
    console.warn(item)
  }

  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Switch>
          <GlobalInfo.Provider value={{logindata : loginData}} >
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/cblog" component={Cblog} />
            <Route path="/update" component={Update} />
            </GlobalInfo.Provider>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
