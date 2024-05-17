"use client";
import { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faDownload, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { redirect, useRouter } from 'next/navigation';
import Image from "next/image";
import estilosHome from "./static/styles/home.module.css"

export default function Home() {
  const { comprarProducto, traerProductosComprados, productosComprados, usuarioLogeado, estadoLogin } = useContext(Context);

  const [redirectUrl, setRedirectUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    usuarioLogeado();
    traerProductosComprados();
  }, [estadoLogin]);

  const handleComprar = async () => {
    const response = await fetch('/api/createPreference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setRedirectUrl(data.redirectUrl);
  };

  if (redirectUrl) {
    router.push(redirectUrl);
    return null; // Opcional: mostrar un mensaje de carga mientras se redirige
  }

  const handleDescargar = () => {
    console.log("Descargar archivo.");
  };

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
                  {productosComprados?.estado == "false" || !productosComprados?.estado ? 
                    <button onClick={handleComprar}>Comprar</button> :
                    <button onClick={handleDescargar}>Descargar</button>
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
