import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
// LAYOUT
import Navbar from './Components/Layout/Navbar'
import MobileSpacing from './Components/Layout/MobileSpacing'

// PAGINAS
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import Settings from './Components/Pages/Settings'
import e404 from './Components/Pages/404'

// RESTAURANTES
import RestaurantesLista from './Components/Restaurante/RestaurantesLista'
import RestauranteDetalles from './Components/Restaurante/RestauranteDetalles'
import RestauranteFiltro from './Components/Restaurante/RestauranteFiltro'
import AliasRedirect from './Components/Restaurante/AliasRedirect'

// PEDIDOS
import PaginaPedidos from './Components/Pages/Pedidos'

// PRODUCTOS
import ProductoDetalles from './Components/Productos/Detalles'
import Agregar from './Components/Productos/Agregar'

// AUTH
import Login from './Components/Auth/SignIn'
import Register from './Components/Auth/SignUp'
import Recovery from './Components/Auth/Recovery'

// ADMIN
import Admin from './Components/Pages/Admin'
import Test from './Components/Pages/Test'

// CARRITO
import CartWrapper from './Components/Carrito/CartWrapper'

export class App extends Component {
  render() {
  document.title = process.env.REACT_APP_NAME;
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <MobileSpacing />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/recovery" component={Recovery} />
        <Route exact path="/productos/nuevo" component={Agregar} />
        <Route exact path="/pedidos" component={PaginaPedidos} />
        <Route exact path="/restaurante/:alias" component={AliasRedirect} />
        <Route exact path="/restaurantes" component={RestaurantesLista} />
        <Route exact path="/restaurantes/categoria/:filtro" component={RestauranteFiltro} />
        <Route exact path="/restaurantes/:id" component={RestauranteDetalles} />
        <Route exact path="/restaurantes/:id/:productoid" component={ProductoDetalles} />
        <Route exact path="/carrito" component={CartWrapper} />
        <Route exact path="/test" component={Test} />
        <Route path="*" component={e404} />
      </Switch>
    </BrowserRouter>
    
  );
  }
}
export default App;
