import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";

// Fetching API
const client = createClient({ url: "http://localhost:1337/graphql" });

function MyApp({ Component, pageProps }) {
  return (
    <StateContext children={""}>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}

export default MyApp;
