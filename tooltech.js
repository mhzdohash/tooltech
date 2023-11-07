//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

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
  email: { type: String, required: true },
  senha: { type: String }
  
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Configurando os roteamentos
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  


  //ver se todos os campos estão preenchidos e se não tiver vai dar esse erro
  if(email == null || senha == null){
    return res.status(400).json({error : "Preencha todos os campos"})
}

//teste mais importante da ac
const emailExiste = await Usuario.findOne({email : email});
  
const novoUsuario = new Usuario({
  email: email,  
  senha: senha,
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



//rota para get cadastro
app.get("/cadastroprodutoferramenta", async(req, res)=>{
  res.sendFile(__dirname +"/cadastroprodutoferramenta.html");
})

app.get("/cadastrousuario", async(req, res)=>{
  res.sendFile(__dirname +"/cadastrousuario.html");
})

// Configurando a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});