require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
const port = process.env.PORT || 5000;

// =============================
// MIDDLEWARES
// =============================
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // from .env
      "http://localhost:5173", // local dev
      "https://foodparadiseok.netlify.app", // current frontend
    ].filter(Boolean),
    credentials: true,
  })
);

app.options("*", cors());

// =============================
// MONGODB SETUP
// =============================
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Forbidden access" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.Access_Token_Secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.decoded = decoded;
    next();
  });
};

let userCollection,
  menuCollection,
  reviewCollection,
  cartCollection,
  paymentCollection;

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await userCollection.findOne({ email });
  if (!user || user.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });
  next();
};

// =============================
// ROUTES & MAIN FUNCTION
// =============================
async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    menuCollection = db.collection("menu");
    reviewCollection = db.collection("reviews");
    cartCollection = db.collection("cart");
    userCollection = db.collection("users");
    paymentCollection = db.collection("payments");

    // MENU
    app.get("/menu", async (req, res) => {
      const items = await menuCollection.find().toArray();
      res.json(items);
    });

    app.get("/menu/:id", async (req, res) => {
      const item = await menuCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.json(item);
    });

    // USERS
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await userCollection.findOne({ email: user.email });
      if (existingUser)
        return res.json({ message: "User already exists", insertedId: null });
      const result = await userCollection.insertOne(user);
      res.json(result);
    });

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.json(users);
    });

    // REVIEWS
    app.get("/reviews", async (req, res) => {
      const reviews = await reviewCollection.find().toArray();
      res.json(reviews);
    });

    app.post("/reviews", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);
      res.json(result);
    });

    // JWT
    app.post("/jwt", (req, res) => {
      const token = jwt.sign(req.body, process.env.Access_Token_Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      });
      res.json({ token });
    });

    // CART
    app.get("/carts", verifyToken, async (req, res) => {
      const carts = await cartCollection
        .find({ email: req.query.email })
        .toArray();
      res.json(carts);
    });

    app.post("/carts", verifyToken, async (req, res) => {
      const result = await cartCollection.insertOne(req.body);
      res.json(result);
    });

    // STRIPE PAYMENTS
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = Math.round(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: process.env.CURRENCY || "usd",
        payment_method_types: ["card"],
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    });

    // Root route
    app.get("/", (req, res) => {
      res.send("✅ Server is running properly!");
    });

    // Start server
    app.listen(port, () => console.log(`✅ Server running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);
