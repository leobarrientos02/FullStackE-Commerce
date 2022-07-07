import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import Loading from "../../components/Loading";

export default function ProductDetails() {
  // Use State
  const { quantity, increaseQuantity, decreaseQuantity, onAdd } =
    useStateContext();

  // Fetch Slug
  const { query } = useRouter();

  // Fetch GraphQL Data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  // Check for the data coming in
  if (fetching) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;

  // console.log(data);
  const { title, description, image, price } = data.products.data[0].attributes;

  return (
    <DetailStyle>
      <img src={image.data.attributes.formats.small.url} alt={title} />
      <ProductInfo>
        <h1>{title}</h1>
        <h3>${price}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQuantity}>
            <AiFillMinusCircle />
          </button>
          <p>{quantity}</p>
          <button onClick={increaseQuantity}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, quantity)}>
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailStyle>
  );
}
