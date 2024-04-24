import estilosFooter from "../static/styles/footer.module.css"

function Footer() {
    return ( 
        <>
            <div className={estilosFooter.allFooter}>
                <div className={estilosFooter.foot}>
                    <p>Copyright NicolasCosta®™</p>
                </div>
            </div>  
        </> 
    );
}

export default Footer;