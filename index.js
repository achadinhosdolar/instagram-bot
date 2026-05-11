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
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  return res.send("Webhook online 🚀");
});

// webhook POST (eventos do Instagram)
app.post("/webhook", (req, res) => {
  const body = req.body;

  console.log("Evento recebido:");
  console.log(JSON.stringify(body, null, 2));

  if (body.object === "instagram") {
    body.entry.forEach((entry) => {
      const changes = entry.changes;

      if (changes) {
        changes.forEach((change) => {
          if (change.field === "comments") {
            const comentario = change.value.text;

            console.log("Comentário detectado:");
            console.log(comentario);

            if (
              comentario &&
              comentario.toLowerCase().includes("eu quero")
            ) {
              console.log("PALAVRA ENCONTRADA 🚀");
            }
          }
        });
      }
    });
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});