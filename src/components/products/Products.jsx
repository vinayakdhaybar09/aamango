import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
const { Column } = Table;

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../../styles/products.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productData, setProductData] = useState();

  const getAllProducts = async () => {
    getDocs(collection(database, "products"))
      .then((res) => {
        setProductData(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
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

  const deleteProduct = (id) => {
    const docToDelete = doc(database, "products", id);
    deleteDoc(docToDelete)
      .then(() => {
        getAllProducts();
        alert("Data deleted successfully");
      })
      .catch((err) => alert(err.message));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  console.log(productData);

  return (
    <div className="product-page">
      <div className="product-page-functions">
        <Link to={"/products/add-product"} className="add-product-btn">
          Add Product
        </Link>
      </div>
      <hr />
      <div className="product-table-container">
        <h4>Products List</h4>
        <Table
          className="applications-table"
          pagination={false}
          dataSource={productData}
        >
          <Column
            align="center"
            className="table-column-style"
            title="Product id"
            dataIndex={"id"}
            key={"id"}
          />
          <Column
            align="center"
            className="table-column-style"
            title="Product Name"
            dataIndex={"productName"}
            key={"id"}
          />
          <Column
            align="center"
            className="table-column-style"
            title="Price"
            dataIndex={"price"}
            key={"id"}
          />
          <Column
            align="center"
            className="table-column-style"
            title="Change Price"
            key="id"
            render={(data) => {
              // console.log(data);
              return (
                <>
                  <AiFillEdit
                    onClick={showModal}
                    className="product-icons-edit"
                  />
                  <Modal
                    title="Change Price"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={false}
                  >
                    <EditModal
                      price={data.price}
                      id={data.id}
                      getAllProducts={getAllProducts}
                      handleOk={handleOk}
                    />
                  </Modal>
                </>
              );
            }}
          />
          <Column
            align="center"
            className="table-column-style"
            title="Delete"
            // dataIndex={"category_id"}
            key="id"
            render={(data) => {
              console.log(data);
              return (
                <>
                  <AiFillDelete
                    onClick={showDeleteModal}
                    className="product-icons-delete"
                  />
                  <Modal
                    title="Are you sure ?"
                    open={isDeleteModalOpen}
                    onOk={() => {
                      deleteProduct(data.id);
                      setIsDeleteModalOpen(false);
                    }}
                    onCancel={handleDeleteCancel}
                    // footer={false}
                  >
                    {/* Are you sure ? */}
                  </Modal>
                </>
              );
            }}
          />
          {/* <Column
            align="center"
            className="table-column-style"
            title="Resume"
            // dataIndex={"category_name"}
            key="id"
            render={(name) => {
              return (
                <Link
                  to={`/products/${name.id}`}
                  className="product-details-view-btn"
                >
                  View Details
                </Link>
              );
            }}
          /> */}
        </Table>
      </div>
    </div>
  );
};

export default Products;

const EditModal = ({ price, id, getAllProducts, handleOk }) => {
  const [changePrice, setChangePrice] = useState(price);

  const updateData = () => {
    const docToUpdate = doc(database, "Products", id);
    updateDoc(docToUpdate, {
      gradeA1Price: changePrice,
    })
      .then(() => {
        getAllProducts();
        console.log("Price Updated Successfully");
        handleOk();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="change-price-box">
      <input
        type="number"
        name="price"
        value={changePrice}
        className="edit-price-input"
        onChange={(e) => setChangePrice(e.target.value)}
      />
      <button onClick={updateData} className="change-price-btn">
        Submit
      </button>
    </div>
  );
};

// export default Products
