import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";

// Fetching API
const client = createClient({ url: "http://localhost:1337/graphql" });

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
