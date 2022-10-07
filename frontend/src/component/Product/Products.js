import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/Metadata";


const categories = [
  "Laptop",
  "TV",
  "Washing machine",
  "Refrigator",
  "Headphones",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  // const [price, setPrice] = useState([0, 500000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice);
  // };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts(keyword, currentPage, minPrice,maxPrice, category, ratings));
  }, [dispatch, keyword, currentPage, minPrice,maxPrice, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- SUPERSHOP" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            {/* <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={500000}
            /> */}


            <div className="price-filter">
              <h2>Price</h2>

              <div className="price-range-input">
                <select
                  onChange={(e) => setMinPrice(e.target.value)}
                  value={minPrice}
                >
                  <option value="0">MIN</option>
                  <option value="100">₹100</option>
                  <option value="500">₹500</option>
                  <option value="1000">₹1000</option>
                  <option value="2000">₹2000</option>
                </select>

                <span>to</span>

                <select
                  onChange={(e) => setMaxPrice(e.target.value)}
                  value={maxPrice}
                >
                  <option value="500000">MAX</option>
                  <option value="100">₹100</option>
                  <option value="500">₹500</option>
                  <option value="1500">₹1500</option>
                  <option value="2500">₹2500</option>
                  <option value="5000">₹5000</option>
                  <option value="10000">₹10000</option>
                  <option value="500000">₹50000+</option>
                </select>
              </div>
            </div>

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset> */}

            <div className="rating-filter">
              <h2>Ratings</h2>

              <select
                onChange={(e) => setRatings(e.target.value)}
                value={ratings}
              >
                <option value="0">0★ & above</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </div>

          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
