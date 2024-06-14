const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/test', async (req, res) => {
    const { UserId, Token, ApiNode, query } = req.body;
    console.log(ApiNode);
    const data = await ageRatings(UserId, Token, ApiNode, query);

    res.status(200).send(data)
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)


// API calls
async function ageRatings(userId, token, apinode, query) {
    console.log(`User ID: ${userId}`);
    console.log(`Token: ${token}`);
    try {
      const response = await fetch(
        `https://api.igdb.com/v4/${apinode}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': userId,
            'Authorization': `Bearer ${token}`,
          },
          body: query
        }
      );
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }