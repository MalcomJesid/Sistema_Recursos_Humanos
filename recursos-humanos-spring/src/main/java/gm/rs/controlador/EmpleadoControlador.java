package gm.rs.controlador;

import gm.rs.excepcion.RecursoNoEncontradoExcepcion;
import gm.rs.modelo.Empleado;
import gm.rs.servicio.EmpleadoServicio;
import gm.rs.servicio.IEmpleadoServicio;
import lombok.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/rh-app
@RequestMapping("rh-app")
@CrossOrigin(value ="http://localhost:3000")
public class EmpleadoControlador {

    private static final Logger logger=
        LoggerFactory.getLogger(EmpleadoControlador.class);



    @Autowired
    private IEmpleadoServicio empleadoServicio;

    //http://localhost:8080/empleado
    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados(){
        var empleados = empleadoServicio.ListarEmpleado();
            empleados.forEach((empleado -> logger.info(empleado.toString())));
        return empleados;

    }

    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody  Empleado empleado){
        logger.info("Un empleado a agregar: " +empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }


    @GetMapping("/empleados/{id}")
        public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
            if(empleado == null)
                throw new RecursoNoEncontradoExcepcion("No se encontro el Empleado con el ID"+id);
            return ResponseEntity.ok(empleado);
    }

    @PutMapping("/empleados/{id}")
        public ResponseEntity<Empleado>
        actualizarEmpleado(@PathVariable Integer id,
                           @RequestBody Empleado empleadoRecibido){
        Empleado empleado  = empleadoServicio.buscarEmpleadoPorId(id);
                if(empleado == null)
                    throw new RecursoNoEncontradoExcepcion("El empleado con el ID:"+id+" No exite");
                empleado.setNombre(empleadoRecibido.getNombre());
                empleado.setDepartamento(empleadoRecibido.getDepartamento());
                empleado.setSueldo(empleadoRecibido.getSueldo());
                empleadoServicio.guardarEmpleado(empleado);
                return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String,Boolean>>
    eliminarEmpleado(@PathVariable Integer id){
        Empleado empleado  = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null)
            throw new RecursoNoEncontradoExcepcion("El empleado con el ID:"+id+" No exite");
        empleadoServicio.eliminarEmpleado(empleado);
    // Respuesta Tipo JSON {"eliminado";"true"}

        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado",Boolean.TRUE);
        return  ResponseEntity.ok(respuesta);
    }
}
