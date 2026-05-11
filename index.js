js
const express = require("express");

const app = express();

app.use(express.json());

// rota inicial
app.get("/", (req, res) => {
  res.send("Bot online 🚀");
});

// webhook GET (verificação da Meta)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "meubot123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verificado!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// webhook POST (eventos do Instagram)
app.post("/webhook", (req, res) => {
  console.log("Evento recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
