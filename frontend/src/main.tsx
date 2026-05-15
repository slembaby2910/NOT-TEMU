import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Controller from "./controller.tsx";
import { CartProvider } from "./cartholder.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <CartProvider>
            <Controller />
        </CartProvider>
    </HashRouter>
);