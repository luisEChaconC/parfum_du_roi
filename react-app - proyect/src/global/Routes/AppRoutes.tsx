import { Route, Routes } from "react-router-dom";
import { Routes as AppPaths } from "./Routes";
import HomePage from '../../pages/HomePage';
import NichoPage from '../../pages/NichoPage';
import NuevosPage from '../../pages/NuevosPage';
import DisenadorPage from '../../pages/DisenadorPage';
import ArabesPage from '../../pages/ArabesPage';
import TesterPage from '../../pages/TesterPage';
import DecantsPage from '../../pages/DecantsPage';
import CarritoPage from '../../pages/CarritoPage';
import PerfilPage from '../../pages/PerfilPage';
import ContactosPage from '../../pages/ContactosPage';

const ElementPath = {
    [AppPaths.Home]: <HomePage />,
    [AppPaths.Nicho]: <NichoPage />,
    [AppPaths.Nuevos]: <NuevosPage />,
    [AppPaths.Disenador]: <DisenadorPage />,
    [AppPaths.Arabes]: <ArabesPage />,
    [AppPaths.Tester]: <TesterPage />,
    [AppPaths.Decants]: <DecantsPage />,
    [AppPaths.Carrito]: <CarritoPage />,
    [AppPaths.Perfil]: <PerfilPage />,
    [AppPaths.Contactos]: <ContactosPage />,
}

export const AppRoutes = () => 
    <Routes>
        {Object.entries(ElementPath).map(([path, element], index) => (
            <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>