import { Route, Routes } from "react-router-dom";
import { Routes as AppPaths } from "./Routes";
import HomePage from "../../pages/HomePage";
import NichoPage from "../../pages/NichoPage";
import NuevosPage from "../../pages/NuevosPage";
import DisenadorPage from "../../pages/DisenadorPage";
import ArabesPage from "../../pages/ArabesPage";
import TesterPage from "../../pages/TesterPage";
import LogIn from "../../pages/LoginPage";
import SignIn from "../../pages/SignInPage";
import DecantsPage from "../../pages/DecantsPage";
import Profile from "../../pages/ProfilePage";
import PerfumeDetail from "../../pages/PerfumeDetailPage";
import RecoverPassword from "../../pages/RecoverPasswordPage";
import ResetPassword from "../../pages/ResetPasswordPage";
import { Carrito } from "../../pages/Carrito/Carrito";   
import PaymentForm from "../../components/PaymentForm";
//import  Contactos  from "../../components/Contactos";

const ElementPath = {
    [AppPaths.Home]: (<HomePage />),
    [AppPaths.Nicho]: (<NichoPage />),
    [AppPaths.Nuevos]: (<NuevosPage />),
    [AppPaths.Disenador]: (<DisenadorPage />),
    [AppPaths.Arabes]: (<ArabesPage />),
    [AppPaths.Tester]: (<TesterPage />),
    [AppPaths.Decants]: (<DecantsPage />),
    [AppPaths.Carrito]: (<Carrito />),
    [AppPaths.Login]: (<LogIn/>),
    [AppPaths.Registro]: (<SignIn />),
    [AppPaths.Perfil]: (<Profile />),
    [AppPaths.Recuperar]: (<RecoverPassword />),
    [AppPaths.Resetear]: (<ResetPassword />),
    [AppPaths.Pay]: (<PaymentForm />),
    [AppPaths.DetallesPerfume]: (<PerfumeDetail />),
}

export const AppRoutes = () => 
    <Routes>
        {Object.entries(ElementPath).map(([path, element], index) => (
            <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>