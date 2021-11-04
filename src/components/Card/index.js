import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { Card } from "antd";
import "swiper/components/scrollbar/scrollbar.scss";
import { addProduct } from "../../redux/Cart/cart.actions";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
} from "swiper";
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

SwiperCore.use([Navigation, Pagination, Scrollbar, EffectFade]);

const mapState = ({ productsData }) => ({
  products: productsData.products,
  loading: productsData.loading,
});

const ProductCarousel = () => {
  const { products, loading } = useSelector(mapState);
  const dispatch = useDispatch();
  const { data = [], queryDoc, isLastPage } = products;
  const history = useHistory();

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div className="cards">
      <h1 className="h1card">TOP SELLER</h1>
      <div className="line"></div>
      <div className="cards__container">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.map((item, pos) => {
            return (
              <SwiperSlide key={pos} className="slide">
                <div className="slide-content">
                  <Card
                    hoverable={true}
                    cover={<img src={item.allImageURL[0]} />}
                    style={{ width: 300 }}
                    actions={[
                      <ShoppingCartOutlined
                        onClick={() => handleAddToCart(item)}
                      />,
                    ]}
                  >
                    <Link to={`/product/${item.documentID}`}>
                      <Meta
                        title={item.productName}
                        description={item.productPrice}
                      />
                    </Link>
                  </Card>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;
