import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productData, setProductData] = useState();
  const params = useParams();
  console.log(params);

  const getAllProducts = async () => {
    getDocs(collection(database, "Products"))
      .then((res) => {
        setProductData(
          res.docs.map((item) => {
            if (item.id === params.id) {
              return { ...item.data(), id: item.id };
            }
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(productData);

  const productInfo = productData[0]
  return (
    <div className="product-details-page">
      <img src={productInfo.mainImage} alt="" />
      <p>{productInfo.productName}</p>
      {/* <p>{productInfo.price}</p> */}
      <p>{productInfo.productName}</p>
      <p>{productInfo.productName}</p>
      <p>{productInfo.productName}</p>
    </div>
  );
};

export default ProductDetails;
