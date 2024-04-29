const CREAR_USUARIO = "CREAR_USUARIO";
const LOGIN_USUARIO = "LOGIN_USUARIO";
const LOGOUT_USUARIO = "LOGOUT_USUARIO";
const USUARIO_LOGUEADO = "USUARIO_LOGUEADO";
const USUARIO_NO_LOGUEADO = "USUARIO_NO_LOGUEADO";
// const VER_PRODUCTO = "VER_PRODUCTO";
const COMPRAR_PRODUCTO = "COMPRAR_PRODUCTO";
const VER_PRODUCTO_COMPRADO = "VER_PRODUCTO_COMPRADO";
const ACTUALIZAR_PRODUCTO_COMPRADO = "ACTUALIZAR_PRODUCTO_COMPRADO";

export default function Reducer(state, action){
    const {payload, type} = action;

    switch( type ){
        case CREAR_USUARIO:
            return {
                ...state, 
                user: payload
            };

        case LOGIN_USUARIO:
            return {
                ...state, 
                user: payload
            };

        case LOGOUT_USUARIO:
            return {
                ...state, 
                user: null
            };

        case USUARIO_LOGUEADO:
            return {
                ...state,
                estadoLogin: payload
            };

        case USUARIO_NO_LOGUEADO:
            return {
                ...state,
                estadoLogin: false
            };

        // case VER_PRODUCTO:
        //     return {
        //         ...state, 
        //         productos: payload
        //     };

        case COMPRAR_PRODUCTO:
            return {
                ...state,
                productosComprados: {...state.productosComprados, payload}
            };

        case VER_PRODUCTO_COMPRADO:
            return {
                ...state, 
                productosComprados: payload
            };

        case ACTUALIZAR_PRODUCTO_COMPRADO:
            const { uid, estado } = payload;
            const nuevosProductosComprados = state.productosComprados.map(producto => {
                if (producto.uid === uid) {
                    return { ...producto, estado: estado };
                }
                return producto;
            });

            return {
                ...state,
                productosComprados: nuevosProductosComprados
            };
    }
}