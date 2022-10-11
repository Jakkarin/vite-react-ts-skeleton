import { BrowserRouter, useRoutes } from "react-router-dom";

const Routes = function (props: any) {
    return useRoutes(props.routes ?? []);
};

const RouterProvider = function (props: { routes: any; }) {
    return (
        <BrowserRouter>
            <Routes routes={props.routes} />
        </BrowserRouter>
    );
};

export default RouterProvider;