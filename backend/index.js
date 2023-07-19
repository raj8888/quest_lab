const express=require("express")
const cors=require("cors")
const axios = require('axios');

const app=express()
app.use(express.json())
app.use(cors())

app.post('/data', async (req, res) => {
    try {
      // Make a POST request to the external API
      const apiUrl = 'https://gpt-api.richexplorer.com/api/general';
      const requestData = req.body; // Assuming the request body contains the data you want to send
  
      const response = await axios.post(apiUrl, requestData);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({
        error: 'An error occurred while making the request to the external API.',
      message:error.message});
    }
});

app.listen(8000,()=>{
    console.log("Servier running on port 8000")
})
