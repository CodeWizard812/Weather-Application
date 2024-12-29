import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const APIKey = process.env.yourAPIKey;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//Static files stored in public folder
app.use(express.static("public"));


app.get("/", async (req, res) =>{
  try{
    const response = await axios.get("https://api.weatherapi.com/v1/forecast.json?", {
      params: {
        key: APIKey,
        q: "20.045865,78.939981",
        days: 10,
        aqi: "yes",
        alerts:"yes",
      },
    });
    res.render("index.ejs",{
      data: response.data,
      c : response.data.current,
      f : response.data.forecast,
    })
  }catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });