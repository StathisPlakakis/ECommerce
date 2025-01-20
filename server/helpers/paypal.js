import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
dotenv.config();
paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.SECRET,
});

export default paypal;