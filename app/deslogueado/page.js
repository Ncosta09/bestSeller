"use client";
import { useState, useContext } from "react";
import Context from "../context/Context";
import estiloDeslogueado from "../static/styles/deslogueado.module.css"

function Deslogueado() {

    const { crearUsuario, usuarioLogin } = useContext(Context);
    const [crear, setCrear] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        usuarioLogin(email, password);
    };

    const handleCrear = () => {
        crearUsuario(email, password, nombreUsuario);
    };
    
    const handleNoTengo = () => {
        setCrear(true);
    }

    const handleTengo = () => {
        setCrear(false);
    }

    const handleTexto = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "password"){
            setPassword(e.target.value);
        } else if (e.target.name == "username"){
            setNombreUsuario(e.target.value);
        }
    }

    return ( 
        <>
            <div className={estiloDeslogueado.allLogContent}>
                <div className={estiloDeslogueado.logContent}>

                    <div className={estiloDeslogueado.content}>

                        <div className={estiloDeslogueado.logTitle}>
                            {!crear ? (
                                <>
                                    <h2>LogIn</h2>

                                    <div className={estiloDeslogueado.logInput}>
                                        <input type="text" onChange={handleTexto} name="email" placeholder="Email..." />
                                        <input type="password" onChange={handleTexto} name="password" placeholder="Contreaseña..." />
                                    </div>
                                </>
                            ) : 
                                <>
                                    <h2>Crear cuenta</h2>

                                    <div className={estiloDeslogueado.logInput}>
                                        <input type="text" onChange={handleTexto} name="username" placeholder="Nombre de usuario..." />
                                        <input type="text" onChange={handleTexto} name="email" placeholder="Email..." />
                                        <input type="password" onChange={handleTexto} name="password" placeholder="Contreaseña..." />
                                    </div>
                                </>
                            }
                        </div>



                        {!crear ? (
                            <div className={estiloDeslogueado.logButton}>
                                <button onClick={handleLogin}>Ingresar</button>
                                <p className={estiloDeslogueado.logNoCount} onClick={handleNoTengo}>No tengo cuenta</p>
                            </div>
                        ) :
                            <div className={estiloDeslogueado.logButton}>
                                <button onClick={handleCrear}>Crear cuenta</button>
                                <p className={estiloDeslogueado.logNoCount} onClick={handleTengo}>Ya tengo cuenta</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Deslogueado;