import { Login, Register, ProductEntry, ProductMaster, SaleMaster, SaleEntry, UserMaster, LandingPage } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
function App() {
  return (
    <Auth0Provider
      domain="mision-tic1.us.auth0.com"
      clientId="SW0WhExn7jFSa1jyGqVZiRStQRZG4unz"
      redirectUri="https://powerful-citadel-56456.herokuapp.com/saleEntry"
    >
      <Router>
        <Switch>
          <Route path="/index">
            <LandingPage />
          </Route>

          <Route path="/userMaster">
            <UserMaster />
          </Route>

          <Route path="/productEntry">
            <ProductEntry />
          </Route>
          <Route path="/productMaster">
            <ProductMaster />
          </Route>
          <Route path="/saleMaster">
            <SaleMaster />
          </Route>
          <Route path="/saleEntry">
            <SaleEntry />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;
