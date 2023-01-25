
import React from "react"
import "./App.css"
import Carousel from "./Components/Carousel"
import Header from "./Components/Header"



function App() {
    return (
        <div>
        <Header/>
      <div className="App center-div">
          <Carousel />
     
      </div>
            <div><button className="myButton">Add new machine</button></div>
        </div>
  );
}

export default App;
