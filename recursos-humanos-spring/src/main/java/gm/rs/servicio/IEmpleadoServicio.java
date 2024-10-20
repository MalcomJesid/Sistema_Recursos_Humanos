package gm.rs.servicio;

import gm.rs.modelo.Empleado;

import java.util.List;

public interface IEmpleadoServicio {

    public List<Empleado>ListarEmpleado();
    public Empleado buscarEmpleadoPorId(Integer idEmpleado);
    public Empleado guardarEmpleado(Empleado empleado);
    public void eliminarEmpleado(Empleado empleado);
}
