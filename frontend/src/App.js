import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderForm from './components/Order';
import OrderList from './components/OrderList';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li>
              <li>
                <Link to="/orders">Active Orders</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/order">
            <OrderForm />
          </Route>
          <Route path="/orders">
            <OrderList />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
