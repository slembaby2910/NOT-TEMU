import { Routes, Route} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Catalog from "./catalog.tsx";
import Cart from "./cart.tsx";
import Checkout from "./checkout.tsx";
import Shipping from "./shipping.tsx";
export default function Controller() {
    return (
        /* native routing func of React */
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/catalog" element={<Catalog />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element = {<Checkout />}/>
            <Route path="/shipping" element = {<Shipping/>}/>
            <Route path="*" element={<Login />} />
        </Routes>
    );
}