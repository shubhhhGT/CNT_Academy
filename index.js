const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const { OAuth2Client } = require("google-auth-library");
const { loginWithGoogle } = require("./controllers/Auth");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseroutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const cartRoutes = require("./routes/cart");
const uploadRoutes = require("./routes/uploads");
const qnaRoutes = require("./routes/QnA");
const testimonialRoutes = require("./routes/Testimonials");
const blogRoutes = require("./routes/Blog");
const eventRoutes = require("./routes/Event");
const newsletterRoutes = require("./routes/Newsletter");
const couponRoutes = require("./routes/Coupon");
const invoiceRoutes = require("./routes/Invoice");
const userReportRoutes = require("./routes/UserReport");

const PORT = process.env.PORT || 4001;

// Use helmet middleware for security
app.use(helmet());

app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp",
  })
);

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Google OAuth login
const webClient = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/api/v1/auth/login/google/mobile", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Use payload to authenticate or register the user
    const { user, isNewUser } = await loginWithGoogle(payload);

    const jwtPayload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
      name: `${user?.firstName} ${user?.lastName}`,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Send back the JWT token to the Flutter app
    res.json({
      success: true,
      message: "Logged in successfully",
      token: jwtToken,
      existingUser: user,
      isNewUser,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Google Token" });
  }
});

app.post("/api/v1/auth/login/google/web", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token using web client ID
    const ticket = await webClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Authenticate or register the user
    const { user, isNewUser } = await loginWithGoogle(payload);

    const jwtPayload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
      name: `${user?.firstName} ${user?.lastName}`,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
      token: jwtToken,
      existingUser: user,
      isNewUser,
    });
  } catch (error) {
    console.error("Web login error:", error);
    return res.status(401).json({ error: "Invalid Google Token" });
  }
});

// database connection
const dbConnect = require("./config/dbConnect");
dbConnect();

// S3 Connection
const { s3Connect } = require("./config/s3Connect");
s3Connect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseroutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/course", cartRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/qna", qnaRoutes);
app.use("/api/v1/testimonial", testimonialRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/invoice", invoiceRoutes);
app.use("/api/v1/report", userReportRoutes);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    Connectionstack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
