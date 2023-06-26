import React from "react";
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import MyNavbar from "./components/UI/navbar/MyNavbar.jsx";
import AppRouter from "./components/AppRouter.jsx";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Cookies from "js-cookie";
library.add(fas)



function App() {

  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>

  )
}

export default App;
