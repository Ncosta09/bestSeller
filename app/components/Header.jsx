"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect ,useContext } from "react";
import Context from "../context/Context";
import estilosHeader from "../static/styles/header.module.css"

function Header() {

    const { usuarioLogout, usuarioLogeado, estadoLogin } = useContext(Context);

    const desloguear = () => {
        usuarioLogout();
    }

    useEffect(() => {
        usuarioLogeado();
    }, []);

    return ( 
        <>
            <div className={estilosHeader.topHead}>
                <div className={estilosHeader.head}>
                    <div className={estilosHeader.logo}>
                        <Image 
                            src={"https://media.licdn.com/dms/image/C4E12AQEbxO_FfS4PAw/article-inline_image-shrink_400_744/0/1520639214891?e=1718841600&v=beta&t=Lb0ZF4JZy4ef91iOjxy7D6rG2n53A1d1YayKmDgK9x4"}
                            alt="foto logo eloquent"
                            width={109}
                            height={50}
                            className={estilosHeader.logoImg}
                        ></Image>
                    </div>

                    <div className={estilosHeader.fullNav}>
                        <nav className={estilosHeader.navLink}>
                            <Link href="/" className={estilosHeader.link}>Inicio</Link>
                            {/* <Link href="/" className={estilosHeader.link}>Mis compras</Link> */}
                            {!estadoLogin ? 
                                <Link href="/deslogueado" className={estilosHeader.link}>Login</Link> :
                                <a onClick={desloguear} className={estilosHeader.link}>logout</a>
                            }
                        </nav>

                        <div>
                            {estadoLogin ? 
                                <p className={estilosHeader.name}>Hola, {estadoLogin.displayName}</p> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;