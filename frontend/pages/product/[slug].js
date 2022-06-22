import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "../../lib/query";
import { useRouter} from "next/router";
import { DetailStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function ProductDetails(){
    // Fetch Slug
    const { query } = useRouter();

    // Fetch GraphQL Data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: { slug: query.slug }
    });
    const { data, fetching, error } = results;

    // Check for the data coming in
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    
    // console.log(data);
    const { title, description, image} = data.products.data[0].attributes;
    
    return(
        <DetailStyle>
            <img src={image.data.attributes.formats.small.url} alt={title} />
            <ProductInfo>
                <h1>{title}</h1>
                <p>{description}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button><AiFillMinusCircle /></button>
                    <p>0</p>
                    <button><AiFillPlusCircle /></button>
                </Quantity>
                <Buy>Add to Cart</Buy>
            </ProductInfo>
        </DetailStyle>
    );
}