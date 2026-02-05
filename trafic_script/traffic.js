const axios = require('axios');

const BASE_URL = "http://localhost:3000";
const REQUESTS_PER_ENDPOINT = 100;
const INTERVAL_MS = 1000;

async function hitLogin(i) {
    return axios.post(`${BASE_URL}/login`, {
        email: `user${i}@test.com`,
        password: "123456"
    });
}

async function hitProducts(i) {
    return axios.get(`${BASE_URL}/products`);
}

async function hitCart(i) {
    return axios.post(`${BASE_URL}/cart`,{
        productId : i,
        quantity : 1
    })
}

async function hitCheckout(i) {
  return axios.post(`${BASE_URL}/checkout`, {
    cartId: i,
    paymentMode: "COD"
  });
}

async function sendTraffic(){
    console.log("Sending Traffice");
    let Promises = [];
    for(let i = 1; i <= REQUESTS_PER_ENDPOINT; i++) {
        Promises.push(hitLogin(i));
        console.log("Hit login for user", i);
        Promises.push(hitProducts(i));
        console.log("Hit products for user", i);
        Promises.push(hitCart(i));
        console.log("Hit cart for user", i);
        Promises.push(hitCheckout(i));
        console.log("Hit checkout for user", i);
    }
    try {
        await Promise.allSettled(Promises);
        console.log("Batch completed");
    } catch (error) {
            console.log("Error in batch:", error.message);
    }
}

setInterval(sendTraffic, INTERVAL_MS);