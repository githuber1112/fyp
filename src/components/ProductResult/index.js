import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "../forms/FormSelect";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import LoadMore from "../LoadMore";
import { Input, Space } from "antd";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResult = ({}) => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const [searchProducts, setSearchProducts] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (value) => {
    const nextFilter = value;
    history.push(`/search/${nextFilter}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    dispatch(
      fetchProductsStart({
        searchProductName: searchProducts,
      })
    );
  };

  if (!Array.isArray(data)) return null;

  const configFilters = {
    defaultValue: "Show all",
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Face Mask",
        value: "facemask",
      },
      {
        name: "Alcohol sanitizer",
        value: "sanitizer",
      },
    ],
    handleChange: handleFilter,
  };

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
        <FormSelect {...configFilters} />
      </div>
    );
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
    console.log(filterType);
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>Product page</h1>
      <FormSelect {...configFilters} style={{ width: 200 }} />

      {/* <form onSubmit={handleSearch}>
            <FormInput
                        type="text"
                        name="search"
                        value={searchProducts}
                        placeholder="Search"
                        handleChange={e => setSearchProducts(e.target.value)}
                    />
            <Button type="submit">
                        Search
                    </Button>
            </form> */}

      <div className="productResults">
        {data.map((product, pos) => {
          const { productName, productPrice, productDesc, allImageURL } =
            product;
          if (
            !productName ||
            typeof productPrice === "undefined" ||
            !productDesc ||
            !allImageURL
          )
            return null;

          const configProduct = {
            ...product,
          };
          console.log(allImageURL);
          return <Product {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResult;
