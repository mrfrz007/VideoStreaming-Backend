// Importing required modules: express for setting up the server,
// cors for enabling Cross-Origin Resource Sharing,
// cookie-parser for parsing cookies, and express.static to serve static files.
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Creating an instance of express and configuring it.
const app = express();

// Using cors middleware with the origin set to the value of the environment variable CORS_ORIGIN
// and enabling credentials to be sent with the request.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))

// Using express.json middleware to support JSON-encoded bodies with a limit of 16kb.
app.use(express.json({ limit: '16kb' }));

// Using express.urlencoded middleware to support url-encoded bodies with a limit of 16kb.
app.use(express.urlencoded({extended: true , limit:'16kb'}));

// Using express.static middleware to serve static files from the "public" directory.
app.use(express.static("public"));

// Using cookie-parser middleware to parse cookies.
app.use(cookieParser());

// Exporting the app object for use in other modules.
export { app };