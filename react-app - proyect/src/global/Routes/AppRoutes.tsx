import { Route, Routes } from "react-router-dom";
import { Routes as AppPaths } from "./Routes";
import BannerImage from "../../components/BannerImage";
import ProductList from "../../components/ProductList";
import { arabes, decants, diseñador, newIncome, tester } from "../PerfumCategory";
import { nicho } from "../PerfumCategory";
import { Carrito } from "../../pages/Carrito/Carrito";
import  Perfil  from "../../components/Perfil";
import  Contactos  from "../../components/Contactos";

const ElementPath = {
    [AppPaths.Home]: (<><BannerImage /><ProductList title="Nuevo Ingreso" products={newIncome} /></>),
    [AppPaths.Nicho]: (<ProductList title="Nicho" products={nicho} />),
    [AppPaths.Nuevos]: (<ProductList title="Nuevos" products={newIncome} />),
    [AppPaths.Disenador]: (<ProductList title="Diseñador" products={diseñador} />),
    [AppPaths.Arabes]: (<ProductList title="Árabes" products={arabes} />),
    [AppPaths.Tester]: (<ProductList title="Tester" products={tester} />),
    [AppPaths.Decants]: (<ProductList title="Decants" products={decants} />),
    [AppPaths.Carrito]: (<Carrito />),
    [AppPaths.Perfil]: (<Perfil />),
    [AppPaths.Contactos]: (<Contactos />),
}

export const AppRoutes = () => 
    <Routes>
        {Object.entries(ElementPath).map(([path, element], index) => (
            <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>