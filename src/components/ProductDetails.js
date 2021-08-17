import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../state/actions/products";
import { useEffect } from "react";
import axios from "axios";
import "./ProductDetailWrapper.css";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(product);

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((error) => {
        console.log(error);
      });

    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
  }, [productId]);

  return (
    <div className="ProductDetailWrapper">
      <div>
        {" "}
        <img src={image} alt={title} className="imgDetail" />{" "}
      </div>
      <div>
        {" "}
        <h1>{title}</h1>
        <h3> <span>category: </span> {category}</h3>
        <h4> <span>price: </span> ${price}</h4>
        <p>
          <strong>Description: </strong> {description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
