import { Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/productSlice";
import "../../styles/addproduct.css";
import { MdDelete } from "react-icons/md";
import { storage } from "../../firebase/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { uploadImage } from "../../services/image_upload";

const AddProduct = () => {
  const dispatch = useDispatch();
  const mainImageLink = useSelector((state) => state.products);
  console.log(mainImageLink);

  const [loader, setLoader] = useState(false);
  const [showUploadedImage, setShowUploadedImage] = useState(false);

  const [inputDetails, setInputDetails] = useState({
    productName: "",
    price: "",
    // gradeSPPrice: "",
    // gradeA1Price: "",
    // gradeA2Price: "",
    mainImage: "",
    subImageOne: "",
    subImageTwo: "",
    description: "",
  });
  console.log(inputDetails);

  const inputProductData = async (e) => {
    if (
      e.target.name === "mainImage" ||
      e.target.name === "subImageOne" ||
      e.target.name === "subImageTwo"
    ) {
      const imageLink = await uploadImage(e.target.files[0], "products");

      setLoader(false);
      setShowUploadedImage(true);
      setInputDetails((prev) => {
        return {
          ...prev,
          [e.target.name]: imageLink,
        };
      });
    } else {
      setInputDetails((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleDeleteImg = (fileName, link) => {
    const imageRef = ref(storage, `${link}`);

    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully!");
        setInputDetails((prev) => {
          return {
            ...prev,
            [fileName]: "",
          };
        });
      })
      .catch((error) => {
        console.error("Error deleting file: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        productName: inputDetails.productName,
        price: inputDetails.price,
        // gradeSPPrice: inputDetails.gradeSPPrice,
        // gradeA1Price: inputDetails.gradeA1Price,
        // gradeA2Price: inputDetails.gradeA2Price,
        mainImage: inputDetails.mainImage,
        subImageOne: inputDetails.subImageOne,
        subImageTwo: inputDetails.subImageTwo,
        description: inputDetails.description,
      })
    );
  };

  return (
    <div className="add-product-page">
      <h3 className="add-product-heading">Add Product</h3>
      <form className="product-input-form">
        <label className="blog_labels">Enter Product Name</label>
        <input
          value={inputDetails.productName}
          name="productName"
          onChange={inputProductData}
          className="product-input"
          type="text"
          placeholder="Product Name"
        />
        <label className="blog_labels">
          Spacial Grade Price <span> (per dozen)</span>
        </label>
        <input
          value={inputDetails.price}
          name="price"
          onChange={inputProductData}
          className="product-input"
          type="number"
          placeholder="Mango Price"
        />
        {/* <label className="blog_labels">
          Spacial Grade Price <span> (per dozen)</span>
        </label>
        <input
          value={inputDetails.gradeSPPrice}
          name="gradeSPPrice"
          onChange={inputProductData}
          className="product-input"
          type="number"
          placeholder="A1+ Grade Mango Price"
        />
        <label className="blog_labels">
          A1 Grade Price <span> (per dozen)</span>
        </label>
        <input
          value={inputDetails.gradeA1Price}
          name="gradeA1Price"
          onChange={inputProductData}
          className="product-input"
          type="number"
          placeholder="A1 Grade Mango Price"
        />
        <label className="blog_labels">
          A2 Grade Price <span> (per dozen)</span>
        </label>
        <input
          value={inputDetails.gradeA2Price}
          name="gradeA2Price"
          onChange={inputProductData}
          className="product-input"
          type="number"
          placeholder="A2 Grade Mango Price"
        /> */}
        <label className="blog_labels">Upload Main Image</label>
        <div className="image-flex-box">
          {inputDetails?.mainImage === "" ? (
            <input
              name="mainImage"
              onChange={(e) => {
                setLoader(true);
                inputProductData(e);
              }}
              className="product-input-file"
              type="file"
              required={true}
            />
          ) : (
            <div className="image-container">
              <img
                src={inputDetails?.mainImage}
                alt="mainImage"
                className="image-style"
              />
              <MdDelete
                onClick={() =>
                  handleDeleteImg("mainImage", inputDetails?.mainImage)
                }
              />
            </div>
          )}
        </div>
        <label className="blog_labels">Upload Sub Image One</label>
        <div className="image-flex-box">
          {inputDetails?.subImageOne === "" ? (
            <input
              name="subImageOne"
              onChange={(e) => {
                setLoader(true);
                inputProductData(e);
              }}
              className="product-input-file"
              type="file"
              required={true}
            />
          ) : (
            <div className="image-container">
              <img
                src={inputDetails?.subImageOne}
                alt="subImageOne"
                className="image-style"
              />
              <MdDelete
                onClick={() =>
                  handleDeleteImg("subImageOne", inputDetails?.subImageOne)
                }
              />
            </div>
          )}
        </div>
        <label className="blog_labels">Upload Sub Image Two</label>
        <div className="image-flex-box">
          {inputDetails?.subImageTwo === "" ? (
            <input
              name="subImageTwo"
              onChange={(e) => {
                setLoader(true);
                inputProductData(e);
              }}
              className="product-input-file"
              type="file"
              required={true}
            />
          ) : (
            <div className="image-container">
              <img
                src={inputDetails?.subImageTwo}
                alt="subImageTwo"
                className="image-style"
              />
              <MdDelete
                onClick={() =>
                  handleDeleteImg("subImageTwo", inputDetails?.subImageTwo)
                }
              />
            </div>
          )}
        </div>
        <label className="blog_labels">Enter Product Description</label>
        <textarea
          onChange={inputProductData}
          className="product-input"
          value={inputDetails.description}
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Product Description"
        />
        <button
          className="add-product-submit-btn"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
