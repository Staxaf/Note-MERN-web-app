import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './index.scss'
import {NavBar} from "./components/Navbar/NavBar";
import NotesContent from "./components/NotesContent/NotesContent";
import {BrowserRouter} from "react-router-dom"
import {Route} from "react-router-dom";

const App = (props) => {

  return (
   <BrowserRouter>
       <div className="appWrapper">
           <div className="row no-gutters">
               <div className="col-2">
                   <NavBar />
               </div>
               <div className="col-10">
                   <Route path={'/:userId?'} render={() => <NotesContent/>} />
               </div>
           </div>
       </div>
   </BrowserRouter>
  );
}

export default App;
