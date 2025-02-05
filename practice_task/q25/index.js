const express = require("express");

const app = express();

const PORT = 3025;

app.use(express.json());

const fetchUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 123, name: "Monish" });
    }, 2000);
  });
};

const fetchOrder = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { orderId: 101, amount: 202 },
        { orderId: 102, amount: 203 },
      ]);
    }, 3000);
  });
};

const processPayment = async (orders) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Payment Successful");
    }, 1500);
  });
};

app.get("user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("Fetching user details and orders...");
    const [user, order] = await Promise.all([
      fetchUser(userId),
      fetchOrder(userId),
    ]);
    res.json({ user, order });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/payment", async (req, res) => {
  try {
    const { orders } = req.body;

    if (!orders || orders.length == 0) {
      return res.status(400).json({ error: "No order provided" });
    }

    console.log("Processing Payment");

    const paymentStatus = await processPayment(orders);
    res.json({ message: paymentStatus });
  } catch (error) {
    res.status(500).json({ error: "Payment failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
});
