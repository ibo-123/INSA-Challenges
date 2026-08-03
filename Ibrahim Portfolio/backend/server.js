import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./route/routes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use("/api", Routes);


// Home Route

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio API is running"
    });
});


// Start Server

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server is running at http://localhost:${PORT}`
            );
        });

    } catch (error) {

        console.log(
            "Server failed to start:",
            error.message
        );

        process.exit(1);
    }

};


startServer();