//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

//Controlers IMPORTS
//#region Controllers
import { userController } from "./controllers/UserController.js";
import { questController } from "./controllers/QuestController.js";
//#endregion

//Configurações Globais da Aplicação
//#region Configurações

//Variavel global responsável pela seção do usuário
var user = undefined;

//Variavel de resgate do nome do avatar salvo no storage
var avatarName = '';

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
//	cipher.encrypt("senha")
//	cipher.decrypt("senha");

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json()) //habilita o uso de JSONS
server.use(express.urlencoded({ extended: true })); //habilita o uso do post dentro das rotas
server.use(express.static(path.join(__dirname + "/public"))); //habilita o uso de arquivos estaticos
server.set("views", path.join(__dirname + "/public/views")); //define a pasta de views
server.set("view engine","vash");
//#endregion


// ========================== ROTAS LOGIN ========================================================

//ROTA DE LOGIN DO USUÁRIO
server.get('/', (req, res) => {

	let test = 'TESTANDO'
	user = undefined; //Caso o user volte para tela de inicio a constante global é redefinida, ou seja, fecha e "sessão"
	res.render('login', {test, erroLogin: false});
});

//ROTA DE LOGIN DO USUÁRIO
server.post("/", async (req, res) => {

	var userData = {Email:req.body.logemail, Password: req.body.logpass}

	user = await userController.GetUserByEmailAndSenha(userData);

	if(user != undefined)
	{

		res.redirect("/home");
	}
	else
	{
		res.render("login", { erroLogin: true });
	}
});

server.get('/home', async (req, res) => {

	if(user != undefined)
	{
		//var home = await homeController.GetInfosHome(user);

		res.render("home", { erroLogin: false, user});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

// ========================== ROTAS CRUD USUÁRIO ========================================================

//ROTA DE CADASTRO DO USUÁRIO
server.get("/signup", (req, res) => {
	res.render("signup");
});

//ROTA DE CADASTRO DO USUÁRIO
server.post("/GenerateUser",  async(req, res) => {

	var userData = req.body

	userData.Avatar = "avatar/default.png";
	//verifica se o insert ocorreu com sucesso!
	var insertUser = await userController.GenerateUser(userData);

	if(insertUser)
	{
		//sendMailBemVindo.run(userData.NickName, userData.Email);
		res.redirect("/");
	}
	else
	{
		res.render("login", { erroLogin: true });
	}

});

server.get("/EditAccount", (req, res) => {
	res.render("editarUser");
});

// ========================== ROTAS CRUD Perguntas ========================================================
server.get("/ManageQuest", async (req, res) => {
	
	var listPergunta = await questController.GetQuests();

	res.render("painelPerguntas", { listPergunta});
});

server.get("/GeneratePergunta", (req, res) => {
	res.render("cadastrarPergunta");
});

server.post("/GeneratePergunta",  async(req, res) => {

	var perguntaData = req.body
	console.log(perguntaData);

	//verifica se o insert ocorreu com sucesso!
	var insertPergunta = await questController.GenerateQuest(perguntaData);
	
	if(insertPergunta)
	{
		res.render("painelPerguntas");
	}
	else
	{
		res.render("cadastrarPergunta", {user, erroTEXT:'Erro no cadastro!'});
	}

});

// ========================== ROTAS Jogo ========================================================
server.get("/Game", (req, res) => {
	res.render("jogo");
});

// ========================== ROTAS CRUD Information ========================================================
server.get("/About", (req, res) => {
	res.render("sobre");
});



server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
