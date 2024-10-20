import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleados() {

    let navegacion = useNavigate();
  
    const[empleados, setEmpleados] = useState({

        nombre: '',
        departamento: '',
        sueldo: '',
    });
    const{ nombre, departamento, sueldo } = empleados;
    const onInputChange = (e) => {
        //spread operator ... (expadir los atributos)
        setEmpleados({...empleados, [e.target.name]: e.target.value});
    }
    
    const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8080/rh-app/empleados";
    await axios.post(urlBase, empleados);
    //redirigir a la pagina de inicio
    navegacion("/");

  }
  
  
    return (
    <div className='container'>
        <div className='container' style={{ marginTop: '30px' }}>
            <h3>Agregar Empleados</h3>

<form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htlmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control"
                     id="nombre"  name='nombre' required={true}
                     value={nombre} onChange={(e) =>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htlmlFor="departamento" 
                    className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" name='departamento'
                    value={departamento} onChange={(e) =>onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htlmlFor="sueldo" 
                    className="form-label">Sueldo</label>
                    <input type="number"  step="any" className="form-control" id="sueldo" name='sueldo'
                    value={sueldo} onChange={(e) =>onInputChange(e)} />
                </div>
                
               <div className='text-center'>
                <button type="submit" 
                className="btn btn-warning btn-sm me-3">Agregar</button>
                <a href="/" className="btn btn-danger btn-sm">Cancel</a>
               
               </div>
</form>




        </div>
        



    </div>
  )
}
