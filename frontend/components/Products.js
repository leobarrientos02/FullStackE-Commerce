import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  // Product is passed down from index.js
  // Extract the info from props
  const { title, price, image, slug } = product.attributes;
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>${ price }</h3>
    </ProductStyle>
  );
}
