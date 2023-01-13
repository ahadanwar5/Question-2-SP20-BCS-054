import {
  faChevronRight,
  faCartShopping,
  faHeart,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import ReactPaginate from "react-paginate";
import { Link, NavLink } from "react-router-dom";
import ProductShop from "./ProductShop";
import { Store } from "../Store";
import "../styles/ProductsShop.css";
import "../styles/pagination.css";

const ProductsShop = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish, userInfo } = state; //Comes from the initial state

  let [fetchedProducts, setFetchedProducts] = useState([]);
  //for filter category and all products
  const [products, setProducts] = useState([]);

  //for category
  const [category, setCategory] = useState([]);

  //for paginate
  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 12;

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
      const reponse = await axios.get("/api/products");
      setProducts(reponse.data);
      setFetchedProducts(reponse.data);
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/category");
      setCategory(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div class="container-fluid container-fluid-styling">
        <div class="container mt-4" style={{ position: "relative" }}>
          <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            {displayProducts}
          </div>
        </div>
        <div class="container-fluid pagination-grid">
          <div></div>
          <div>
            <ReactPaginate
              activeClassName={"pagination-item paginate-active "}
              breakClassName={"pagination-item"}
              breakLabel={"..."}
              containerClassName={"pagination-styling"}
              disabledClassName={"disabled-paginate-page"}
              marginPagesDisplayed={2}
              nextClassName={"pagination-item2 pagination-next "}
              nextLabel={
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ fontSize: 18, width: 150 }}
                />
              }
              onPageChange={changePage}
              pageCount={pageCount}
              pageClassName={"pagination-item pagination-page "}
              pageRangeDisplayed={2}
              previousClassName={"pagination-item2 pagination-previous"}
              previousLabel={
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{ fontSize: 18, width: 150 }}
                />
              }
            />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductsShop;
