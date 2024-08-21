import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Component/Navbar";
import Textform from "./Component/Textform";
import About from "./Component/About";
import NewsList from "./Component/NewsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; 

function App() {

  const appendAlert = (message, type) => {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    let alertclass = 'alert-class-' + Math.floor(Math.random() * 1000000000);;
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible ${alertclass}" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');
    
    alertPlaceholder.append(wrapper);
    document.querySelector('#liveAlertPlaceholder').scrollIntoView({
      behavior: 'smooth'
    });

    setTimeout(() => {
      document.getElementsByClassName(alertclass)[0].remove();
    }, 3000);
  }

  return (
    <div className="App"> 
      <Router>
        <Navbar title="Text Utils"></Navbar>
        
        <Routes>
          <Route exact path="/"  element={<Textform appendAlert={appendAlert} />} ></Route>
          <Route exact path="about"  element={<About/>} ></Route>
          <Route exact path="news-monkey"  element={<NewsList pageSize={10} />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
