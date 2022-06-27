import Head from "next/head";
import Link from "next/link";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Products";
import { Gallery } from "../styles/Gallery";
import Loading  from "../components/Loading";

export default function Home() {
  // Fetch the products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  // Check for the data coming in
  if (fetching) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;

  // Get Products out API Call
  const products = data.products.data;

  // console.log(products);
  return (
    <div>
      <Head children={undefined}>
        <title>Apple Tech</title>
        <meta name="description" content="Buy the latest and hottest Apple products for the lowest price you can find on the market. If you can find a cheaper price, we will negotiate a new price to ensure we always offer the lowest price." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Gallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} /> // product={product} passes to child component
          ))}
        </Gallery>
      </main>
    </div>
  );
}
