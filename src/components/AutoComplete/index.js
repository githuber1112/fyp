import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AutoComplete, List, Avatar, Space, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsStart } from "./../../redux/Products/products.actions";
import "./styles.scss";

const { Option } = AutoComplete;

const mapState = ({ productsData }) => ({
  allProducts: productsData.allProducts,
});

const AutoComplete1 = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector(mapState);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllProductsStart());
  }, []);

  const handleSearch = (data) => {
    setSearchTerm(data);
  };

  return (
    <div className="autoCompleteList">
      <AutoComplete
        autoFocus
        style={{ width: 800 }}
        onSearch={handleSearch}
        placeholder="search products here"
      >
        <Option>
          <List
            dataSource={allProducts.filter((item) => {
              if (searchTerm == "") {
                return item;
              } else if (
                item.productName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return item;
              }
            })}
            renderItem={(item) => (
              <Link to={`/product/${item.documentID}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.allImageURL[0]} size={100} />}
                    title={item.productName}
                  />
                </List.Item>
              </Link>
            )}
          />
        </Option>
      </AutoComplete>
    </div>
  );
};

export default AutoComplete1;
