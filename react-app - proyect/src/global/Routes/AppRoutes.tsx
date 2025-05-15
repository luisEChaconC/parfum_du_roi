import { Route, Routes } from "react-router-dom";
import { Routes as AppPaths } from "./Routes";
import HomePage from "../../pages/HomePage";
import NichoPage from "../../pages/NichoPage";
import NuevosPage from "../../pages/NuevosPage";
import DisenadorPage from "../../pages/DisenadorPage";
import ArabesPage from "../../pages/ArabesPage";
import TesterPage from "../../pages/TesterPage";
import Profile from "../../pages/ProfilePage";
import SignIn from "../../pages/SignInPage";
import DecantsPage from "../../pages/DecantsPage";
import { Carrito } from "../../pages/Carrito/Carrito";
import  Contactos  from "../../components/Contactos";

const ElementPath = {
    [AppPaths.Home]: (<HomePage />),
    [AppPaths.Nicho]: (<NichoPage />),
    [AppPaths.Nuevos]: (<NuevosPage />),
    [AppPaths.Disenador]: (<DisenadorPage />),
    [AppPaths.Arabes]: (<ArabesPage />),
    [AppPaths.Tester]: (<TesterPage />),
    [AppPaths.Decants]: (<DecantsPage />),
    [AppPaths.Carrito]: (<Carrito />),
    [AppPaths.Perfil]: (<Profile />),
    [AppPaths.Registro]: (<SignIn />),
    [AppPaths.Contactos]: (<Contactos />),
}

export const AppRoutes = () => 
    <Routes>
        {Object.entries(ElementPath).map(([path, element], index) => (
            <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>