import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from './context/user_context';
// domain ----dev-08l2l0ksxpjwnfw6.us.auth0.com
//Client-ID-----JLh3azptC4JCVAU8oIG8Pys8jd6RLtjk
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
  domain="dev-08l2l0ksxpjwnfw6.us.auth0.com"
  clientId="JLh3azptC4JCVAU8oIG8Pys8jd6RLtjk"
  
  authorizationParams={{
    redirect_uri:window.location.origin,
  }}  >
    <UserProvider>
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>

      <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>
  </UserProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
