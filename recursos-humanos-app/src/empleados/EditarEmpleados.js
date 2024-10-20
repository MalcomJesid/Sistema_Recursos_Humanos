import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EdictarEmpleados() {

    const urlBase = "http://localhost:8080/rh-app/empleados";
  
    let navegacion = useNavigate();
    
    const{id}= useParams();

    const[empleados, setEmpleados] = useState({

        nombre: '',
        departamento: '',
        sueldo: '',
    });
    const{ nombre, departamento, sueldo } = empleados;

        useEffect(() => {
            cargarEmpleado();
        } , []);

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`)
        setEmpleados(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expadir los atributos)
        setEmpleados({...empleados, [e.target.name]: e.target.value});
    }
    
    const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id}`, empleados);
    //redirigir a la pagina de inicio
    navegacion("/");

  }
  
  
    return (
    <div className='container'>
        <div className='container' style={{ marginTop: '30px' }}>
            <h3>Editar Empleados</h3>

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
                className="btn btn-warning btn-sm me-3">Guardar</button>
                <a href="/" className="btn btn-danger btn-sm">Cancel</a>
               </div>
</form>




        </div>
        



    </div>
  )
}