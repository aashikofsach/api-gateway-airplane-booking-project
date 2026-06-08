const { PORT } = require("./config");
const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
const {RateLimitermiddleware} = require("./middlewares")
const {createProxyMiddleware} = require("http-proxy-middleware")

const {UserService} = require("./services/")


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RateLimitermiddleware.limiter) ;

const proxyMiddleware1 = createProxyMiddleware({
  target: 'http://localhost:3000/',
  changeOrigin: true,
   pathRewrite: {
    "^/flightservice": "",
  },
});

const proxyMiddleware2 = createProxyMiddleware({
  target: 'http://localhost:4000/',
  changeOrigin: true,
   pathRewrite: {
    "^/bookingservice": "",
  },
});

app.use('/flightservice/', proxyMiddleware1);
app.use("/bookingservice/", proxyMiddleware2)

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async() => {
  console.log(`The server is running on the PORT: ${ServerConfig.PORT}`);

  // console.log("checking the jwt expiry error ") ;
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhYmMyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JFc4bUlZTUZ0UmtodmtMdGJBdUZVa3VoUGMwQ2lJb0V4U29HaEJIcWVNWHBaQmh3ODR1OFBPIiwiaWF0IjoxNzgwNTgwMjM2LCJleHAiOjE3ODA1ODM4MzZ9.V05gkUNiSkvuILCMry68KRFDZRnpWf2SmAKCVbV_W_0"

  // UserService.isAuthenticated(token)
 
});
