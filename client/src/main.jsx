import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App.jsx'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './pages/HomeScreen.jsx'
import ProductScreen from './pages/ProductScreen.jsx'
import CartScreen from './pages/CartScreen.jsx'
import LoginScreen from './pages/LoginScreen.jsx'
import RegisterScreen from './pages/RegisterScreen .jsx';
import ShippingScreen from './pages/ShippingScreen.jsx'
import PaymentScreen from './pages/PaymentScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route path='/product/:id' element={<ProductScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>} />
        <Route path='/cart' element={<CartScreen/>} />
        <Route path='/payment' element={<PaymentScreen/>} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
