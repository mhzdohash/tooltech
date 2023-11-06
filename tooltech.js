//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// Configurando o roteamento para teste no Postman
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

// Configurando o acesso ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tooltech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
});

// Criando a model do usuário
const usuarioSchema = new mongoose.Schema({
  senha: { type: String },
  email: { type: String, required: true }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Configurando os roteamentos
app.post("/cadastrousuario", async (req, res) => {
  const senha = req.body.senha;
  const email = req.body.email;

  const novoUsuario = new Usuario({
    senha: senha,
    email: email,
  });

  try {
    const newUsuario = await novoUsuario.save();
    res.json({ error: null, msg: "Cadastro ok", usuarioId: newUsuario._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Criando a model do produto ferramenta
const ProdutoferramentaSchema = new mongoose.Schema({
  Descricao: { type: String },
  id_produtoferramenta: { type: String, required: true },
  Marca: { type: String },
  DataFabricacao: { type: Date },
  QuantidadeEstoque: { type: Number }
});

const Produtoferramenta = mongoose.model("Produtoferramenta", ProdutoferramentaSchema);

// Configurando os roteamentos
app.post("/cadastroprodutoferramenta", async (req, res) => {
  const Descricao = req.body.Descricao;
  const id_produtoferramenta = req.body.id_produtoferramenta; 
  const Marca = req.body.Marca;
  const DataFabricacao = req.body.DataFabricacao;
  const QuantidadeEstoque = req.body.QuantidadeEstoque;

  const novoProdutoferramenta = new Produtoferramenta({
    Descricao: Descricao,
    id_produtoferramenta: id_produtoferramenta,
    Marca: Marca,
    DataFabricacao: DataFabricacao,
    QuantidadeEstoque: QuantidadeEstoque
  });

  try {
    const newProdutoferramenta = await novoProdutoferramenta.save();
    res.json({ error: null, msg: "Cadastro ok", produtoferramentaId: newProdutoferramenta._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Configurando a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});