"use client";
import { initializeApp } from "firebase/app";
import { useReducer } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";
import Contexto from "./Context";
import Reducer from "./Reducer";
import { useRouter } from "next/navigation";

const firebaseConfig = {
    apiKey: "AIzaSyA2DtKVwmqb7O0WD-yhMDHwv9iZFOhhNls",
    authDomain: "fir-app-522e1.firebaseapp.com",
    databaseURL: "https://fir-app-522e1-default-rtdb.firebaseio.com",
    projectId: "fir-app-522e1",
    storageBucket: "fir-app-522e1.appspot.com",
    messagingSenderId: "829871240920",
    appId: "1:829871240920:web:037f93e84b809a3eea09ad",
    measurementId: "G-FLNPNQQ4QY"
};

const app = initializeApp(firebaseConfig);

function UseContext(props) {

    const {children} = props;
    const router = useRouter();
    const auth = getAuth();
    const db = getDatabase();
    const refUsuarios = ref(db, 'Usuarios/');
    // const refProductos = ref(db, 'Productos/');

    const estadoInicial = { 
        usuario: {},
        productosComprados: [],
        productos: [],
        estadoLogin: false
    }

    const [state, dispatch] = useReducer(Reducer, estadoInicial);

    const crearUsuario = (email, password, nombreUsuario) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                updateProfile(user, {
                    displayName: nombreUsuario,

                }).then(() => {

                    dispatch({ 
                        type: 'CREAR_USUARIO', 
                        payload: { 
                            uid: user.uid, 
                            email: user.email,
                            displayName: nombreUsuario
                        }
                    });

                    guardarUsuario({
                        uid: user.uid, 
                        email: user.email,
                        displayName: nombreUsuario
                    });

                }).catch((error) => {
                    console.error("Error al actualizar el perfil:", error);
                });
            })
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.error("Error al crear usuario:", error);
            });
    };    

    const guardarUsuario = (usuarioCreado) => {
        console.log("Guarde el usuario: ", usuarioCreado);
        push(refUsuarios, usuarioCreado);
    }

    const usuarioLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Me loguie");
            // estado(user);
            dispatch({ type: 'LOGIN_USUARIO', payload: user });
        })
        .then(() => {
            router.push("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const usuarioLogout = () => {
        signOut(auth).then(() => {
            dispatch({ type: 'LOGOUT_USUARIO', payload: null });
            console.log("Me desloguie");
        })
        .then(() => {
            router.push("/");
        })
        .catch((error) => {});
    }

    const usuarioLogeado = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                dispatch({ type: 'USUARIO_LOGUEADO', payload: user });
            } else {
                dispatch({ type: 'USUARIO_NO_LOGUEADO' });
            }
        });
    }

    const usuarioAdmin = () => {
        // console.log("Usuario: ", auth?.currentUser?.email);
        const email = auth?.currentUser?.email;
        if(email == "micucosta@gmail.com"){
            return true;
        }
    }

    // const traemeProductos = () => {
    //     onValue(refProductos, (snapshot) => {
    //         const data = snapshot.val();
    //         dispatch({ type: 'VER_PRODUCTO', payload: data });
    //         // console.log("data useEffect: ", data);
    //     });
    // }

    const comprarProducto = () => {



 




        // console.log("Auth: ", auth);
        // console.log("Nombre de usuario en sesion: ", auth.currentUser.displayName);

        // if (auth?.currentUser?.displayName) {
        //     dispatch({ type: 'COMPRAR_PRODUCTO', payload: auth.currentUser.uid });
        //     const usuarioCompraRef = ref(db, `ProductosComprados/${auth?.currentUser?.uid}`);
        //         update(usuarioCompraRef, { 
        //             nombre: auth?.currentUser?.displayName,
        //             email: auth?.currentUser?.email,
        //             uid: auth.currentUser.uid,
        //             estado: false
        //         })
        //         .then(() => {
        //             console.log("Producto comprado con éxito.");
        //         })
        //         .catch((error) => {
        //             console.error("Error al comprar el producto:", error);
        //         });
        // }else{
        //     alert("Debes estar logueado para comprar el libro");
        // }
    }

    const traerProductosComprados = () => {
        const usuarioCompraRef = ref(db, `ProductosComprados/${auth?.currentUser?.uid}`);
        onValue(usuarioCompraRef, (snapshot) => {
            const data = snapshot.val();
            // console.log("Data: ", data);
            dispatch({ type: 'VER_PRODUCTO_COMPRADO', payload: data });
        });
    }

    const traerTodosProductosComprados = () => {
        return new Promise((resolve, reject) => {
            const productosCompradosRef = ref(db, 'ProductosComprados');
            
            onValue(productosCompradosRef, (snapshot) => {
                const productosComprados = [];
                snapshot.forEach((childSnapshot) => {
                    productosComprados.push(childSnapshot.val());
                });

                resolve(productosComprados);
            }, (error) => {
                reject(error);
            });
        });
    };    

    const actualizarEstadoCompra = (userId, nuevoEstado) => {
        const usuarioCompraRef = ref(db, `ProductosComprados/${userId}`);
        console.log("estado: ", typeof nuevoEstado);
        update(usuarioCompraRef, { estado: nuevoEstado })
          .then(() => {
            // dispatch({
            //   type: 'ACTUALIZAR_ESTADO_USUARIO',
            //   payload: { uid: userId, estado: nuevoEstado }
            // });
            console.log("Estado del usuario actualizado con éxito.");
          })
          .catch((error) => {
            console.error("Error al actualizar el estado del usuario:", error);
          });
    };
    
    return (<>
        <Contexto.Provider value={{ 
                crearUsuario, 
                usuarioLogin, 
                usuarioLogout, 
                usuarioAdmin,
                // traemeProductos, 
                comprarProducto, 
                traerProductosComprados, 
                traerTodosProductosComprados,
                actualizarEstadoCompra,
                usuarioLogeado,
                estadoLogin: state.estadoLogin,
                // productos: state.productos, 
                productosComprados: state.productosComprados
            }}> 
            {children} 
        </Contexto.Provider> 
    </>
    );
}

export default UseContext;