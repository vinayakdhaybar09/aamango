import { Table } from "antd";
const { Column } = Table;
import React, { useEffect, useState } from "react";
import "../../styles/orders.css";
import { ImWhatsapp } from "react-icons/im";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";

const orderData = [
  {
    orderId: 1,
    userId: 5,
    productName: 1,
    productGrade: "SP",
    address: "Viman Nage",
    firstName: "Vinayak",
    lastName: "Dhaybar",
    contactNo: 1122334455,
    totalPrice: 2000,
    payment: "COD",
    orderStatus: "delivery",
    orderDate: "02/03/2023",
  },
  {
    orderId: 2,
    userId: 6,
    productName: 1,
    productGrade: "A1",
    address: "Viman Nage",
    firstName: "Raj",
    lastName: "Jadhav",
    contactNo: 1122334455,
    totalPrice: 45000,
    payment: "Online",
    orderStatus: "Dispatch",
    orderDate: "03/03/2023",
  },
  {
    orderId: "3",
    userId: 7,
    productName: 1,
    productGrade: "A2",
    address: "Viman Nagar",
    firstName: "Sham",
    lastName: "Mukharji",
    contactNo: 1122334455,
    totalPrice: 10000,
    payment: "COD",
    orderStatus: "Deliverd",
    orderDate: "03/03/2023",
  },
  {
    orderId: "4",
    userId: 8,
    productName: 1,
    productGrade: "SP",
    address: "Viman Nagar",
    firstName: "Jayesh",
    lastName: "Sinha",
    contactNo: 1122334455,
    totalPrice: 5000,
    payment: "COD",
    orderStatus: "Packed",
    orderDate: "04/03/2023",
  },
  {
    orderId: "4",
    userId: 8,
    productName: 1,
    productGrade: "SP",
    address: "Viman Nagar",
    firstName: "Jayesh",
    lastName: "Sinha",
    contactNo: 1122334455,
    totalPrice: 5000,
    payment: "COD",
    orderStatus: "Packed",
    orderDate: "05/03/2023",
  },
];

const Orders = () => {
const [productData , setProductData ] = useState()
  const [searchOption, setSearchOption] = useState("userId");
  const [searchText, setSearchText] = useState("");

  const getAllOrders = async () => {
    getDocs(collection(database, "orders"))
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
    getAllOrders();
  }, []);

  console.log(productData);
  

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = orderData?.filter((data) => {
    if (searchOption === "orderId") {
      return data.orderId.toString().includes(searchText);
    } else if (searchOption === "name") {
      return `${data.firstName} ${data.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
    }
  });

  return (
    <div className="orders-container">
      <div className="search-box">
        <select
          className="serch-select"
          defaultValue={"orderId"}
          value={searchOption}
          onChange={handleSearchOptionChange}
        >
          <option value="orderId">Order Id</option>
          <option value="name">Name</option>
        </select>
        <input
          className="search-input"
          type="text"
          placeholder="Serach"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </div>
      <h4>All Orders</h4>
      <div className="table-style">
        <div className="applications-table-container">
          <Table
            className="applications-table"
            dataSource={filteredData?.length != 0 ? filteredData : orderData}
            pagination={false}
          >
            <Column
              align="center"
              className="table-column-style"
              title="Order id"
              dataIndex={"orderId"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="user id"
              dataIndex={"userId"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Name"
              dataIndex={"firstName"}
              key={"orderId"}
              render={(text, record) => (
                <span>{`${record.firstName} ${record.lastName}`}</span>
              )}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Contact No"
              dataIndex={"contactNo"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Price"
              dataIndex={"totalPrice"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Payment"
              dataIndex={"payment"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Order Status"
              dataIndex={"orderStatus"}
              key={"orderId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="msg"
              key="orderId"
              render={() => {
                return <ImWhatsapp className="product-icons-msg" />;
              }}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Payment Action"
              dataIndex={"category_id"}
              key="orderId"
              render={(id) => {
                return (
                  <select defaultValue={"pending"}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                );
              }}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Order Action"
              dataIndex={"orderStatus"}
              key="orderId"
              render={(name) => {
                console.log(name);
                return (
                  <select
                    style={{
                      backgroundColor:
                        name === "Accepted"
                          ? "lightred"
                          : name === "Packed"
                          ? "lightblue"
                          : name === "Shipped"
                          ? "lightyellow"
                          : "lightgreen",
                    }}
                    defaultValue={name}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                );
              }}
            />
          </Table>
        </div>
        {/* );
        })} */}
      </div>
    </div>
  );
};

export default Orders;
