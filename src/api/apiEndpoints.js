const axios = require("axios").default;

// ------------------------------------------------------------------
// GET All Product Details
// ------------------------------------------------------------------

export const apiEndpoint = "http://localhost:7001";

export async function getAllProducts() {
  const resp = await axios.get(apiEndpoint + "/getProducts");
  console.log("Products api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}
// ------------------------------------------------------------------
// Add Product Detail
// ------------------------------------------------------------------

export async function addProduct(item) {
    var body = "";
    var reqHeaders = {
      "Content-Type": "application/json",
      "Accept": "*/*"
    };
    console.log("item: ", item);
  
    body = {
      "name": item.name,
      "price": item.price,
      "quantity": item.quantity,
      "barcode": item.barcode,
      "leadtime": item.leadtime
    };
  
    console.log("body", body);
    const resp = await axios.post(apiEndpoint + "/addProduct", body, {
      headers: reqHeaders,
    });
    console.log("Products Update api end Response: " + JSON.stringify(resp.data));
    return resp.data;
  }

// ------------------------------------------------------------------
// Update Product Details
// ------------------------------------------------------------------

export async function updateProduct(item) {
  var body = "";
  var reqHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*"
  };
  console.log("item: ", item);

  body = {
    "name": item[0].name,
    "price": item[0].price,
    "quantity": item[0].quantity,
    "barcode": item[0].barcode,
    "leadtime": item[0].leadtime,
  };

  console.log("body", body);
  const resp = await axios.post(apiEndpoint + "/updateProduct", body, {
    headers: reqHeaders,
  });
  console.log("Products Update api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}
// ------------------------------------------------------------------
// Delete Product Detail
// ------------------------------------------------------------------

export async function deleteProduct(item) {
  var body = "";
  var reqHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*"
  };
  console.log("item: ", item);

  body = {
    "barcode": item.barcode,
  };

  console.log("body deleteProduct: ", body);
  const resp = await axios.post(apiEndpoint + "/deleteProduct", body, {
    headers: reqHeaders,
  });
  console.log("Products deleted api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

// ------------------------------------------------------------------
// Create Order
// ------------------------------------------------------------------
export async function addOrder(cart , orderTotal) {
  var body = "";
  var reqHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*"
  };
  console.log("item: ", cart);

  body = {
    products: cart,
    orderTotal: orderTotal
  };

  console.log("body addCart: ", body);

  // #### Backend call to OrderService => /addOrder

  const resp = await axios.post(apiEndpoint + "/addOrder", body, {
    headers: reqHeaders,
  });
  console.log("@@ Order created UI API end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

// ------------------------------------------------------------------
// Get Cart Products
// ------------------------------------------------------------------
export async function getCartProducts() {
  const resp = await axios.get(apiEndpoint + "/getCartProducts");
  console.log("Products api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

export async function getMnthRevenue() {
  const resp = await axios.get(apiEndpoint + "/getMonthlyRevenueData");
  console.log("getMonthlyRevenueData api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

export async function getHrsRevenue() {
  const resp = await axios.get(apiEndpoint + "/getHourlyRevenueData");
  console.log("getHourlyRevenueData api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}
export async function getTopSellingData() {
  const resp = await axios.get(apiEndpoint + "/getTopProducts");
  console.log("getHourlyRevenueData api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

export async function getOrdersData() {
  const resp = await axios.get(apiEndpoint + "/getOrdersData");
  console.log("getOrdersData api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}

export async function emptyCart() {
  
  const resp = await axios.get(apiEndpoint + "/emptyCart");
  console.log("EmptyCart api end Response: " + JSON.stringify(resp.data));
  return resp.data;
}
export async function getReorderingPointArray() {
  
  const resp = await axios.get(apiEndpoint + "/getReorderPoint");
  console.log("/getReorderPoint  Response: " + JSON.stringify(resp.data));
  return resp.data;
}
