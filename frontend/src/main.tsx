import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Controller from './controller.tsx';
import { CartProvider } from './cartholder.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CartProvider>
            <Controller />
        </CartProvider>
    </BrowserRouter>
);