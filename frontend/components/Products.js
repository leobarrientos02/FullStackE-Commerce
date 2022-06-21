import { ProductStyle } from "../styles/ProductStyle";

export default function Product({ product }) {
  // Product is passed down from index.js
  // Extract the info from props
  const { title, price, image } = product.attributes;
  return (
    <ProductStyle>
      <div>
        <img src={image.data.attributes.formats.small.url} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>${price.toFixed(2)}</h3>
    </ProductStyle>
  );
}
