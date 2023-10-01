import { Table } from "antd";
const { Column } = Table;
import React, { useEffect, useState } from "react";
import "../../styles/orders.css";
import { ImWhatsapp } from "react-icons/im";
import { database } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// const usersData = [
//   {
//     userId: 5,
//     address: "Viman Nage",
//     firstName: "Vinayak",
//     lastName: "Dhaybar",
//     contactNo: 1122334455,
//     totalPrice: 2000,
//     loginDate: "02/03/2023",
//   },
//   {
//     userId: 6,
//     address: "Viman Nage",
//     firstName: "Raj",
//     lastName: "Jadhav",
//     contactNo: 1122334455,
//     totalPrice: 45000,
//     loginDate: "03/03/2023",
//   },
//   {
//     userId: 7,
//     address: "Viman Nagar",
//     firstName: "Sham",
//     lastName: "Mukharji",
//     contactNo: 1122334455,
//     totalPrice: 10000,
//     loginDate: "03/03/2023",
//   },
//   {
//     userId: 8,
//     address: "Viman Nagar",
//     firstName: "Jayesh",
//     lastName: "Sinha",
//     contactNo: 1122334455,
//     totalPrice: 5000,
//     loginDate: "04/03/2023",
//   },
//   {
//     userId: 8,
//     address: "Viman Nagar",
//     firstName: "Jayesh",
//     lastName: "Sinha",
//     contactNo: 1122334455,
//     totalPrice: 5000,
//     loginDate: "05/03/2023",
//   },
// ];

const Users = () => {
  const [searchOption, setSearchOption] = useState("userId");
  const [searchText, setSearchText] = useState("");

   const [usersData, setUsersData] = useState();

   const getAllUsers = async () => {
     getDocs(collection(database, "users"))
       .then((res) => {
         setUsersData(
           res?.docs?.map((item) => {
             return { ...item.data(), id: item.id };
           })
         );
       })
       .catch((err) => {
         console.log(err.message);
       });
   };

   useEffect(() => {
     getAllUsers();
   }, []);




  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = usersData?.filter((data) => {
    if (searchOption === "orderId") {
      return data.userId.toString().includes(searchText);
    } else if (searchOption === "name") {
      return `${data.firstName} ${data.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
    }
  });
  console.log(filteredData);

  return (
    <div className="orders-container">
      <div className="search-box">
        <select
          className="serch-select"
          defaultValue={"orderId"}
          // defaultChecked={"orderId"}
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
      <h4>All Users</h4>
      <div className="table-style">
        <div className="applications-table-container">
          <Table
            className="applications-table"
            dataSource={filteredData?.length != 0 ? filteredData : usersData}
            pagination={false}
          >
            <Column
              align="center"
              className="table-column-style"
              title="id"
              dataIndex={"userId"}
              key={"userId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Login Date"
              dataIndex={"loginDate"}
              key={"loginDate"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Name"
              dataIndex={"firstName"}
              key={"userId"}
              render={(text, record) => (
                <span>{`${record.firstName} ${record.lastName}`}</span>
              )}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Contact No"
              dataIndex={"contactNo"}
              key={"userId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Price"
              dataIndex={"totalPrice"}
              key={"userId"}
            />
            <Column
              align="center"
              className="table-column-style"
              title="msg"
              key="userId"
              render={() => {
                return <ImWhatsapp className="product-icons-msg" />;
              }}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Payment Action"
              dataIndex={"category_id"}
              key="userId"
              render={(id) => {
                return <p>View Details</p>;
              }}
            />
            <Column
              align="center"
              className="table-column-style"
              title="Order Action"
              dataIndex={"category_name"}
              key="userId"
              render={(name) => {
                return (
                  <select defaultValue={"packed"}>
                    <option value="packed">Block</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                  </select>
                );
              }}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
