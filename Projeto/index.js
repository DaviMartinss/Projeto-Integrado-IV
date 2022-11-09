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

//Variavel global responsável pela Lista de Perguntas do Jogo
var questList = undefined;

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

server.get("/changePassword", (req, res) => {
	res.render("alterarSenha");
});


server.post("/UpdateUser", async (req, res) => {

	var userData = req.body

	console.log(userData.UserId);

		userData = {
			UserId:user.UserId,
			NickName: req.body.NickName,
			Email: req.body.Email
	}

	var updateUser = false;

	var userEmailExists = await userController.GetUserByEmail(userData.Email);

	if(userEmailExists == undefined)
	{
		updateUser = await userController.updateUserNickNameAndEmail(userData);
	}
	else {
		//atualiza só o nome
		
		updateUser = await userController.updateUserNickName(userData);

		//var userData = await userController.GetUserById(user.UserId);

		//userData.PassWord = cipher.decrypt(user.PassWord);

		//res.render("home", {userData, erroTEXT:'JÁ EXISTE USUÁRIO COM ESTE EMAIL CADASTRADO'});
		//res.redirect('/home');
		

	}

	if(updateUser)
	{
		
		//user = await userController.GetUserById(user.UserId);

		res.redirect('/home');
		//deve redirecionar para página de informações do usuário
		//console.log("USUÁRIO ATUALIZADO");
	}
	else
	{
		//var userData = await userController.GetUserById(user.UserId);

		res.render("editarUser", {userData, erroTEXT:'ERRO NA ATUALIZAÇÃO DOS DADOS'});
		//deve redirecionar para página de informações do usuário com o alerta ERRO
		//console.log("ERRO NA ATUALIZAÇÃO");
	}

});

// ========================== ROTAS CRUD Perguntas ========================================================
server.get("/ManageQuest", async (req, res) => {

	var listPergunta = await questController.GetQuests();

	//console.log(listPergunta);

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
		res.redirect("/ManageQuest");
	}
	else
	{
		res.render("cadastrarPergunta", {user, erroTEXT:'Erro no cadastro!'});
	}

});



// ========================== ROTAS Jogo ========================================================

server.get("/Game", async(req, res) => {

	questList = await questController.GetQuestByValidate('Sim');

	var questNumber = req.query.QuestNumber;
	var quest = undefined;

	if(questNumber == undefined)
	{
		quest = questList[0];
		res.render("jogo", {quest});
	}
	else
	{
		quest = questList[questNumber++];
		res.render("jogo", {quest});
	}

});




// ========================== ROTAS CRUD Information ========================================================
server.get("/About", (req, res) => {
	res.render("sobre");
});



server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
