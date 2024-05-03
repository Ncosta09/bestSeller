"use client";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import estilosAdmin from "../static/styles/administrador.module.css"


function Administrador() {
    const { usuarioAdmin, traerTodosProductosComprados, actualizarEstadoCompra } = useContext(Context);
    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(() => {
        const fetchProductosComprados = async () => {
            try {
                const productosComprados = await traerTodosProductosComprados();
                setUsuarios(productosComprados);
            } catch (error) {
                console.error("Error al obtener los productos comprados:", error);
            }
        };

        fetchProductosComprados();
    }, []);

    const handleEstadoChange = async (userID, value) => {
        const estadoBooleano = JSON.parse(value); // Convertir la cadena a booleano
        console.log("valor y UID: ", estadoBooleano + " : " + userID);
        await actualizarEstadoCompra(userID, estadoBooleano);
        const nuevosProductosComprados = await traerTodosProductosComprados();
        setUsuarios(nuevosProductosComprados);
    }
    
    
    const email = usuarioAdmin();

    return ( 
        <>
            {!email ? "" : 
                <div>
                    <h1>Soy Administrador</h1>
                    <table className={estilosAdmin.tabla}>
                        <thead>
                            <tr>
                                <th className={estilosAdmin.cabecera}>Nombre</th>
                                <th className={estilosAdmin.cabecera}>Email</th>
                                <th className={estilosAdmin.cabecera}>UID</th>
                                <th className={estilosAdmin.cabecera}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    <td className={estilosAdmin.celda}>{usuario.nombre}</td>
                                    <td className={estilosAdmin.celda}>{usuario.email}</td>
                                    <td className={estilosAdmin.celda}>{usuario.uid}</td>
                                    <td className={estilosAdmin.celda}>
                                        <select className={estilosAdmin.estadoSelect} value={usuario.estado} onChange={(e) => handleEstadoChange(usuario.uid, e.target.value)}>
                                            <option value={true}>Activo</option>
                                            <option value={false}>Inactivo</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </> 
    );
}

export default Administrador;
