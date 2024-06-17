const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/test', async (req, res) => {
    const { UserId, Token, ApiNode, Query } = req.body;
    const data = await fetchData(UserId, Token, ApiNode, Query);

    res.status(200).send(data)
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)


// API calls
async function fetchData(userId, token, apinode, Query) {
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
          body: Query
        }
      );
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }