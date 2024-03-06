import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

// Connect to the database
connectDB()
  // If the database connection is successful, then
  .then(()=> {
    // Set up an error event listener for the app
    app.on("error", (error) => {
      // Log the error
      console.log(error);
    });

    // Start the server and listen on the specified port
    // If the environment variable for the port is not set, then use port 8000
    app.listen(process.env.PORT || 8000 ,()=> {
      // Log that the server is running and the port number
      console.log(`server is running at ${process.env.PORT}`);
    })
  })
  // If the database connection fails, then
  .catch((error) => {
    // Log that the database connection failed
    console.log('db connection failed')
  });












/* db connection
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log(error);
    });
    app.listen(process.env.PORT, () => {
      console.log("listening on port");
    });
  } catch (error) {
    console.log(error);
    throw err;
  }
})();
*/
