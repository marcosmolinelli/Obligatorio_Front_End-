import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from './redux/store';
import Rutas from './routes/Rutas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Rutas></Rutas>
      <ToastContainer
                position="top-center"
                hideProgressBar={false}
                style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                }}
                bodyStyle={{
                    padding: '10px',
                    overflow: 'hidden',
                }}
            />

    </Provider>
  </React.StrictMode>
)


