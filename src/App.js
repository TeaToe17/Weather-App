import React from "react";
import {BrowserRouter} from "react-router-dom"

import Weatherapp from "./Weatherapp"


const App = () => {
  return(
    <div className="App">
      <BrowserRouter>
      <Weatherapp />
      </BrowserRouter>
    </div>
  )
}

export default App;