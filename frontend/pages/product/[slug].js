import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "../../lib/query";
import { useRouter} from "next/router";

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
        <div>
            <img src={image.data.attributes.formats.small.url} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div>
                <span>Quantity</span>
                <button>Plus</button>
                <p>0</p>
                <button>Minus</button>
            </div>
            <button>Add to Cart</button>
        </div>
    );
}