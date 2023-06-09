
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap"
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import {useContext} from "react";
import {Store} from "./Store";
import {FaHistory, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle} from 'react-icons/fa';
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressScreen from './screens/ShippingAdressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
    };
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <ToastContainer position="bottom-center" limit={1} />
                <header>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>
                                    <img src="/imgs/2.png" alt="img" className="logonav"/>  Security Pro
                                </Navbar.Brand>
                            </LinkContainer>
                            <Nav className="me-auto">

                                <Link to="/cart" className="nav-link">
                                    <FaShoppingCart size={25}/>
                                    {cart.cartItems.length > 0 &&(
                                        <Badge pill bg="danger">
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </Badge>
                                    )}
                                </Link>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>User Profile <FaUserCircle size={15}/></NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistory">
                                            <NavDropdown.Item>Order History <FaHistory size={15}/></NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <Link
                                            className="dropdown-item"
                                            to="#signout"
                                            onClick={signoutHandler}
                                        >
                                            Sign Out <FaSignOutAlt size={15}/>
                                        </Link>
                                    </NavDropdown>
                                ) : (
                                    <Link className="nav-link" to="/signin">
                                        <FaSignInAlt size={25}/>
                                        Sign In
                                    </Link>
                                )}
                            </Nav>
                        </Container>
                    </Navbar>

                </header>
                <main>
                    <Container className="mt-3">
                        <Routes>
                            <Route path="/" element={<HomeScreen/>}></Route>
                            <Route path="/product/:slug" element={<ProductScreen/>}></Route>
                            <Route path="/cart" element={<CartScreen/>}></Route>
                            <Route path="/signin" element={<SigninScreen/>} />
                            <Route path="/signup" element={<SignupScreen />} />
                            <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            <Route path="/order/:id" element={<OrderScreen />}></Route>
                            <Route
                                path="/shipping"
                                element={<ShippingAddressScreen />}
                            ></Route>
                            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
                        </Routes>
                    </Container>

                </main>
                <footer>
                    <div className="text-center">2023 All rights reserved</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
