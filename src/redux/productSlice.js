import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { app, database, storage } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  doc,
} from "firebase/firestore";
import { notification } from "antd";
const collectionRef = collection(database, "products");

const initialState = {
  allProducts: [],
  imageUrl: [],
};

console.log(initialState.allProducts);

// async function fetchProductsFb(){

//   try {
//       const products = [];

//       const productSnap = await getDocs(collectionRef);

//       console.log(productSnap);

//       productSnap.forEach((doc) => {
//         console.log(doc.data());
//         products.push(doc.data());
//       });
//       return new Promise((resolve)=>{
//        resolve(products)
//       })

//   } catch (error) {
//     return new Promise((resolve,rejected) => {
//        rejected(error);
//     });
//   }

// }

// export const getAllProducts = createAsyncThunk(
//   "products/getAllProducts",
//   async () => {
//     try {
//       const res = await getDocs(collectionRef);
//       let data = [];
//       res?.forEach((doc) => {
//         data.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(data);
//       return data;
//     } catch (err) {
//       console.log("error: ", err);
//     }
//   }
// );

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    addDoc(collectionRef, productData)
      .then(() => {
        notification.success({ message: "Product Created Successfully" });
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  }
);

const prodctSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all products----------------------------------------------------

    // builder.addCase(getAllProducts.pending, (state) => {
    //   state.loader = true;
    // });
    // builder.addCase(getAllProducts.fulfilled, (state, action) => {
    //   state.loader = false;
    //   console.log("from slice", action.payload);
    //   state.allProducts = action.payload;
    // });
    // builder.addCase(getAllProducts.rejected, (state, action) => {
    //   state.loader = false;
    //   console.log(action.error.message);
    // });

    // create products ----------------------------------------------------

    // builder.addCase(createProduct.pending, (state) => {
    //   state.loader = true;
    // });
    // builder.addCase(createProduct.fulfilled, (state, action) => {
    //   state.loader = false;
    //   state.allProducts = action.payload;
    // });
    // builder.addCase(createProduct.rejected, (state, action) => {
    //   state.loader = false;
    //   console.log(action.error.message);
    // });
  },
});

export default prodctSlice.reducer;
