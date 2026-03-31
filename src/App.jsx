import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CadastroOng from "./pages/CadastroOng.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CadastroDoador from "./pages/CadastroDoador.jsx";
import CadastroAdm from "./pages/CadastroAdm.jsx";
import ConfirmarEmail from "./pages/ConfirmarEmail.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastroOng" element={<CadastroOng/>} />
                <Route path="/cadastroDoador" element={<CadastroDoador/>} />
                <Route path="/cadastroAdm" element={<CadastroAdm/>} />
                <Route path="/confirmar-email" element={<ConfirmarEmail/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}