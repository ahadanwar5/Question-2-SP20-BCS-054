import {
    faChevronRight,
    faCartShopping,
    faHeart,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import axios from "axios";
  import React, { useEffect, useState, useContext } from "react";
  //import {products} from '../data.js' //but for now -> is not good
  
  import ReactPaginate from "react-paginate";
  import { Link, NavLink } from "react-router-dom";
  import ProductShop from "./ProductShop";
  import { Store } from "../Store";
  import "../styles/ProductsShop.css";
  import Navbar from "./Navbar"
  const PersonalCare = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish, userInfo } = state; //Comes from the initial state
  
    let [fetchedProducts, setFetchedProducts] = useState([]);
    //for filter category and all products
    const [products, setProducts] = useState([]);
  
    //for category
    const [category, setCategory] = useState([]);
  
    //for paginate
    const [pageNumber, setPageNumber] = useState(0);
  
    const productPerPage = 90;
  
    const pagesVisited = pageNumber * productPerPage;
  
    const displayProducts = products
      .slice(pagesVisited, pagesVisited + productPerPage)
      .map((item) => <ProductShop item={item} key={item._id} />);
  
    const pageCount = Math.ceil(products.length / productPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected); //if i click page number 2 than selected is number 2
    };
  
    useEffect(() => {
      const fetchProducts = async () => {
        const reponse = await axios.get("/api/products/personal");
        setProducts(reponse.data);
        setFetchedProducts(reponse.data);
      };
  
      fetchProducts();
    }, []);
    //for show all category
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get("/api/category");
        setCategory(result.data);
      };
      fetchData();
    }, []);
  
    return (
      <>
      <Navbar/>
        <header>
          <div class="bg-image d-flex justify-content-center align-items-center cart-heading-title">
            <h1 class="text-white cart-heading">Personal Care</h1>
          </div>
        </header>
        <section class="section-content mt-5">
          <hr />
          <div class="container">
            <div class="row category-row-styling">
              <div class="col category-styling1">
                <Link to="/shop/Medicines">
                  <span class="category-styling">Medicines</span>
                </Link>
              </div>
              <div class="col category-styling2">
                <Link to="/shop/Lifestyle">
                  <span class="category-styling">Lifestyle</span>
                </Link>
              </div>
              <div class="col category-styling2">
                <Link to="/shop/PersonalCare">
                  <span class="category-styling">Personal Care</span>
                </Link>
              </div>
              <div class="col category-styling2">
                <Link to="/shop/Carebaby">
                  <span class="category-styling">Carebaby</span>
                </Link>
              </div>
              <div class="col category-styling2">
                <Link to="/shop/Organic">
                  <span class="category-styling">Organic</span>
                </Link>
              </div>
              <div class="col category-styling3">
                <Link to="/shop/HealthCare">
                  <span class="category-styling">Health Care</span>
                </Link>
              </div>
            </div>
          </div>
          <hr />
        </section>
  
        <section class="section-content mt-5">
          <div class="container">
            <div class="row">
            
              <main class="col-md-12">
                <header class="border-bottom mb-4 pb-3">
                  <div class="form-inline">
                    <span class="mr-md-auto">{products.length} Items found </span>
  
                    <div class="btn-group">
                      <Link to="/cart">
                        <button class="btn" data-toggle="tooltip">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            class="product-list-icon-styling"
                          />
                        </button>
                      </Link>
                      <span class="badge badge-danger badge-styling">
                        {cart.cartItems.length}
                      </span>
                      <Link to="/wish">
                        <button class="btn" data-toggle="tooltip">
                          <FontAwesomeIcon
                            icon={faHeart}
                            class="product-list-icon-styling"
                          />
                        </button>
                      </Link>
                      <span class="badge badge-danger badge-styling">
                        {wish.wishItems.length}
                      </span>
                    </div>
                  </div>
                </header>
  
                {/* 
                <nav class="mt-4" aria-label="Page navigation sample">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav> */}
              </main>
            </div>
          </div>
        </section>
        <div class="container-fluid container-fluid-styling">
          <div class="container mt-4" style={{ position: "relative" }}>
            <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
              {displayProducts}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default PersonalCare;
  