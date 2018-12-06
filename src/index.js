import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";
import Store from './AppGlobalStore';
import registerServiceWorker from "./registerServiceWorker";


// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
ReactDOM.render(
  <HashRouter>
    <ApolloProvider client={Store.client}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </ApolloProvider>
  </HashRouter>,
  document.getElementById("root")
);

registerServiceWorker();
