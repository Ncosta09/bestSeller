"use client";
import { useContext, useEffect } from "react";
import Context from "./context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faDownload, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import estilosHome from "./static/styles/home.module.css"

// const url = "https://fir-app-522e1-default-rtdb.firebaseio.com/Productos.json"
// const pedidoDeProductos = () => {
//   return fetch(url).then((res) => res.json());
// }

export default function Home() {

  const { comprarProducto, traerProductosComprados, productosComprados, usuarioLogeado, estadoLogin } = useContext(Context);
  // const traerProductosJson = await pedidoDeProductos();
  // console.log(traerProductosJson);

  useEffect(() => {
    usuarioLogeado();
    traerProductosComprados();
  }, [estadoLogin]);

  const handleComprar = () => {
    comprarProducto();
  }

  const handleDescargar = () => {
    console.log("Descargar archivo.");
  }

  return (
    <>
      <div className={estilosHome.allHomePage}>
        <div className={estilosHome.homePage}>
          <div className={`${estilosHome.presentation} ${estilosHome.medidas}`}>
            <div className={estilosHome.presentacionIn}>
              <div className={estilosHome.presentacionImg}>
                <Image
                  src={"https://eloquent-javascript-es.vercel.app/img/cover.jpg"}
                  alt="foto libro presentacion"
                  width={232}
                  height={300}
                ></Image>
              </div>
              <div className={estilosHome.presentacionText}>
                <h1>Eloquent JavaScript</h1>
                <p>
                  Es un libro introductorio sobre programación en JavaScript, escrito por Marijn Haverbeke (traducido por miduDev). Es muy apreciado por su estilo claro y accesible, que aborda desde conceptos básicos hasta temas avanzados. Es una lectura popular tanto para principiantes como para desarrolladores experimentados debido a sus ejemplos prácticos y su enfoque interactivo.
                </p>
              </div>
            </div>
          </div>

          <div className={`${estilosHome.timeLine} ${estilosHome.medidas}`}>
            <div>
              <h2>Pasos para obtenerlo</h2>
            </div>
            <div className={estilosHome.dibujoTimeline}>
              <div className={estilosHome.dibujo}>
                <h3>1</h3>
                <FontAwesomeIcon icon={faCartShopping} className={estilosHome.icon}/>
                <p>Comprar</p>
              </div>

              <div className={estilosHome.line}></div>

              <div className={estilosHome.dibujo}>
                <h3>2</h3>
                <FontAwesomeIcon icon={faDownload} className={estilosHome.icon}/>
                <p>Descargar</p>
              </div>
              
              <div className={estilosHome.line}></div>

              <div className={estilosHome.dibujo}>
                <h3>3</h3>
                <FontAwesomeIcon icon={faBookOpenReader} className={estilosHome.icon}/>
                <p>Disfrutar</p>
              </div>
            </div>
          </div>

          <div className={`${estilosHome.buy} ${estilosHome.medidas}`}>
            <div className={estilosHome.buyBox}>
              <div className={estilosHome.buyText}>
                <div className={estilosHome.descripcion}>
                  <h2>Compra tu libro</h2>
                  <p>Aprende a codear como un pro con Eloquent JavaScript!</p>
                </div>
                <div className={estilosHome.buyBtn}>
                  {/* {console.log("producto: " + typeof productosComprados?.estado)} */}
                  {productosComprados?.estado == "false" || !productosComprados?.estado ? 
                    <button onClick={() => handleComprar()}>Comprar</button> :
                    <button onClick={() => handleDescargar()}>Descargar</button>
                  }
                </div>
              </div>
              <div>
                <Image 
                  src={"https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"}
                  alt="foto logo JS"
                  width={300}
                  height={300}
                ></Image>
              </div>
            </div>
          </div>

          <div className={estilosHome.opinions}>

          </div>
        </div>
      </div>
    </>
  );
}
