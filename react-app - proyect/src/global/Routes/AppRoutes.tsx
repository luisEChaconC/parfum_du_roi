import { Route, Routes } from "react-router-dom";
import { Routes as AppPaths } from "./Routes";
import BannerImage from "../../components/BannerImage";
import ProductList from "../../components/ProductList";
import { newIncome } from "../PerfumCategory";
import { nicho } from "../PerfumCategory";
import { Carrito } from "../../pages/Carrito/Carrito";

const ElementPath = {
    [AppPaths.Home]: (<><BannerImage /><ProductList title="Nuevo Ingreso" products={newIncome} /></>),
    [AppPaths.Nicho]: (<ProductList title="Nicho" products={nicho} />),
    [AppPaths.Nuevos]: (<ProductList title="Nuevos" products={newIncome} />),
    [AppPaths.Disenador]: (<ProductList title="Diseñador" products={newIncome} />),
    [AppPaths.Arabes]: (<ProductList title="Árabes" products={newIncome} />),
    [AppPaths.Tester]: (<ProductList title="Tester" products={newIncome} />),
    [AppPaths.Decants]: (<ProductList title="Decants" products={newIncome} />),
    [AppPaths.Carrito]: (<Carrito />),
}

export const AppRoutes = () => 
    <Routes>
        {Object.entries(ElementPath).map(([path, element], index) => (
            <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>