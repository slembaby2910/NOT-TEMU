
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Controller from './controller.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Controller />
    </BrowserRouter>
);