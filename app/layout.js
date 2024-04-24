import Header from "./components/Header";
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./static/styles/global.css"

export const metadata = {
  title: "best seller"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="background">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
