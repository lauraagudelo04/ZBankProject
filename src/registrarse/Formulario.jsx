import { useForm } from "react-hook-form";
import React from "react";
import "./Formulario.css";
import { enviarDatos } from '../../services/ApiService';


const Formulario = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();

   {/* const onSubmit = handleSubmit((data) => {
        console.log(data);
        alert('Enviando datos....')
        reset()
    })*/}

    const onSubmit = async (data) => {
        try {
          await enviarDatos(data);
          alert("Datos enviados exitosamente");
          reset();
        } catch (error) {
          alert("Error al enviar datos");
          console.error("Error al enviar datos:", error);
        }
      };

    const validatePositiveInteger = (value) => {
        return /^\d+$/.test(value); 
    }

    return (
        <div className="container">
            <div className="container-text">
                <h2>Registro usuario ZBank</h2>
            </div>
            <form onSubmit={onSubmit}> 
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" {...register('nombre', { required: true, maxLength: 20 })} />
                    {errors.nombre?.type === 'required' && <p className="error-message">El campo nombre es requerido</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" className="form-control" {...register('apellidos', { required: true })} />
                    {errors.apellidos?.type === 'required' && <p className="error-message">El campo apellidos es requerido</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" {...register('email', {
                        pattern: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>() \[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\ ”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
                        required: true
                    })} />
                    {errors.email?.type === 'pattern' && <p className="error-message">El formato del email es incorrecto</p>}
                    {errors.email?.type === 'required' && <p className="error-message">El email es requerido</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="Divisa">Seleccione su divisa</label>
                    <select className="form-control" {...register('Divisa', { required: true })}>
                        <option value="">Seleccione una divisa</option>
                        <option value="COP">Peso colombiano</option>
                        <option value="USD">Dólar americano</option>
                        <option value="EUR"> Euro </option>
                        <option value="MXN">Peso mexicano</option>
                      
                        <option value="ARG">Peso argentino</option>
                    </select>
                    {errors.Divisa?.type === 'required' && <p className="error-message">Debe seleccionar una divisa</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="tipoDocumento">Seleccione su tipo de documento</label>
                    <select className="form-control" {...register('tipoDocumento', { required: true })}>
                        <option value="">Seleccione su tipo de documento</option>
                        <option value="CC">Cédula de ciudadania</option>
                        <option value="NIT">Número de identificación tributario</option>
                        <option value="TI">Tarjeta de identidad</option>
                    </select>
                    {errors.tipoDocumento?.type === 'required' && <p className="error-message">Debe seleccionar un tipo de documento</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="numeroDocumento">Digite su número de documento</label>
                    <input type="text" className="form-control" {...register('numeroDocumento', { 
                        required: true, 
                        validate: {
                            positiveInteger: validatePositiveInteger
                        }})} 
                        onKeyPress={(e) => {
                            if (isNaN(Number(e.key))) {
                                e.preventDefault();
                            }
                        }}/>

                    {errors.numeroDocumento?.type === 'required' && <p className="error-message">Debe digitar su número de documento</p>}
                    {errors.numeroDocumento?.type === 'positiveInteger' && <p className="error-message">El número de documento debe ser un entero positivo</p>} 
                </div>

                <div className="form-group">
                    <label htmlFor="usuario">Crear usuario</label>
                    <input type="text" className="form-control" {...register('usuario', { required: true })} />
                    {errors.usuario?.type === 'required' && <p className="error-message">Debe crear su usuario</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contraseña">Cree su contraseña</label>
                    <input type="password" className="form-control"  {...register('contraseña', {
                            required: true,
                            minLength: 8,
                            validate: {
                                hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value),
                                hasNumber: value => /\d/.test(value),
                                hasUpperCase: value => /[A-Z]/.test(value)
                            }
                        })} />
                        {errors.contraseña?.type === 'required' && <p className="error-message">La contraseña es requerida</p>}
                        {errors.contraseña?.type === 'minLength' && <p className="error-message">La contraseña debe tener al menos 8 caracteres</p>}
                        {errors.contraseña?.type === 'hasSpecialChar' && <p className="error-message">La contraseña debe contener al menos un caracter especial</p>}
                        {errors.contraseña?.type === 'hasNumber' && <p className="error-message">La contraseña debe contener al menos un número</p>}
                        {errors.contraseña?.type === 'hasUpperCase' && <p className="error-message">La contraseña debe contener al menos una letra mayúscula</p>}
                </div>

                <input  type="submit" value="Enviar" className="btn btn-primary" />
            </form>
        </div>
    );
}
export default Formulario;
