const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

//dotenv
const dotenv = require('dotenv')  
dotenv.config();

const app = express();

app.use(bodyParser.json());

const openai = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY, 
    }
);

app.get('/', async (req, res) => {
    let content = await main();
    res.send(content);
});

let port =  process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function main() {

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Pode me dizer uma frase motivacional?" }
      ],
      model: "gpt-4o",
    });
  
    return completion.choices[0].message.content;
  }
  


