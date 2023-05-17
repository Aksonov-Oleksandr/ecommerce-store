
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import {Helmet} from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {FaHandHoldingHeart} from "react-icons/fa";

const  reducer  = (state, action) => {
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading: false}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

function HomeScreen() {
   // const [products, setProducts] = useState([]);
    const [{loading, error, products}, dispatch]  = useReducer(reducer, {
        products: [],
        loading: true,
        error: ''
    });
    useEffect(()=>{
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'})
            try {
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            }catch (err){
               dispatch({type: 'FETCH_FAIL', payload: err.message});
            }
        };
        fetchData();
    },[]);
    return <div>
        <Helmet>
            <title>Security Pro</title>
        </Helmet>
        <h1>Featured products <FaHandHoldingHeart size={40}/></h1>
        <div className="products">{
            loading ? (
                <LoadingBox/>
                ):
                error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                    ):(
                        <Row>
                            {products.map((product) => (
                                <Col key={product.slug} sm={6} m={4} lg={3} className="mb-3">
                                        <Product product={product}></Product>
                                </Col>
                  ))}
                        </Row>
            )}
        </div>
    </div>;
}
export default HomeScreen;
