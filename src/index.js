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
  <ApolloProvider client={Store.client}>
    <HashRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
