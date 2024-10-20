import React from "react";
import ListadoEmpleados from "./empleados/listadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarEmpleados from "./empleados/AgregarEmpleados";
import EdictarEmpleados from "./empleados/EditarEmpleados";


function App() {
  return (
    
    <div className="container">     
        <BrowserRouter>
          <Navegacion />
            <Routes>
              <Route exact path="/" element= {<ListadoEmpleados/>} />
              <Route exact path="/agregar" element= {<AgregarEmpleados/>} />  
              <Route exact path="/editar/:id" element= {<EdictarEmpleados/>} />
           </Routes>  
        </BrowserRouter>
    </div>

  );
}

export default App;
