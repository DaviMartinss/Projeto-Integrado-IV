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

//Variavel global responsável pelo número da Questão no Jogo
var questNumber = undefined;

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

server.get("/EditAccount", async (req, res) => {

	var userData = await userController.GetUserById(user.UserId);

	res.render("editarUser", {userData});
});

server.get("/changePassword", async (req, res) => {
	var userData = await userController.GetUserById(user.UserId);

	userData.Password = cipher.decrypt(userData.Password);

	res.render("alterarSenha", {userData});
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

server.post("/changePassword", async (req, res) => {

	user = {userId: user.UserId, newPassword:req.body.newPassword };

	var userChangePassword = await userController.UpdatePassword(user);

	if(userChangePassword != undefined){

		//sendMail.run(req.body.Password, userChangePassword.Email);
		res.redirect("/");

	}else{
		console.log("Falha ao atualizar a senha");
		//redefina para a pagina desejada
	}
});


// ========================== ROTAS CRUD Perguntas ========================================================
server.get("/ManageQuest", async (req, res) => {
	var listPergunta = await questController.GetQuests();

	res.render("painelPerguntas", { listPergunta});
});

server.get("/GeneratePergunta", (req, res) => {
	res.render("cadastrarPergunta");
});

server.get("/validateQuestion", async (req, res) => {
	var listPergunta = await questController.GetQuests();

	res.render("validarPergunta", { listPergunta});
});

server.get("/EditQuestion", async (req, res) => {

	console.log("PerguntaId = "+req.query.pergunta);

	var pergunta = await questController.GetQuestById(req.query.pergunta);

	res.render("editarPergunta", {pergunta, user});
});

server.post("/EditQuestion", async (req, res) => {

	
	var question = {questionData: req.body, UserId: user.UserId, Validacao: 'Sim',
	QuestaoId:req.query.questao} ;
		
	//verifica se o insert ocorreu com sucesso!
	var insertQuestao = await questController.UpdateQuest(question); //atualizando questão

	if(insertQuestao)
	{
		res.redirect('/ManageQuest');
		console.log("QUESTÃO ATUALIZADA");
	}
	else
	{
		var pergunta = await questController.GetQuestById(req.query.questao);
		res.render("editarPergunta", {pergunta, user});

		//deve redirecionar para a página de edição
		console.log("QUESTÃO NÃO FOI ATUALIZADA");
	}
});

server.post("/GeneratePergunta",  async(req, res) => {

	var perguntaData = req.body
	
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

//Rota inicial para inicializar o jogo
server.get("/Game", async(req, res) => {

	var quest = undefined;

	if(questList == undefined)
	{
		questList = await questController.GetQuestByValidate('Sim');
	}

 	//Verificando se iniciou o jogo
	if(questNumber == undefined)
	{
		quest = {
							Pergunta:questList[0].Pergunta,
							RespostaCorreta: questList[0].RespostaCorreta,
							ItemA: questList[0].ItemA,
							ItemB: questList[0].ItemB,
							ItemC: questList[0].ItemC,
							Resposta:undefined,
							OrderQuest:undefined
						}

		questNumber = 0;
		res.render("jogo", {quest});
	}
	else
	{
			//É ESPERADO Q N ENTRE AQUI CASO JA TENHA COMEÇADO ALGUM JOGO
			//POSSIVEL MSG DE ERRO
	}

});

//AQUI VAI TRATAR DA VALIDAÇÃO DA RESPOSTA DO USUARIO RETORNANDO O ERRO E O ACERTO
//FAZER MELHORIAS E ADD O RESTO DAS COISAS
server.post("/Game", async(req, res) => {

	var quest = undefined;

	quest = {
						Pergunta:questList[questNumber].Pergunta,
						RespostaCorreta: questList[questNumber].RespostaCorreta,
						ItemA: questList[questNumber].ItemA,
						ItemB: questList[questNumber].ItemB,
						ItemC: questList[questNumber].ItemC,
						Resposta:req.body.Resposta,
						OrderQuest:parseInt(req.body.OrderQuest)
					}

		//console.log(quest);

		res.render("jogo", {quest});

});


//AQUI É RESPONSAVEL PELO CARREGAMENTO DA PROXIMA PERGUNTA / VERIFICAÇÃO DO FIM DE GAME
server.get("/NextQuest", async(req, res) => {

	var quest = undefined;

	questNumber = questNumber + 1;

	if(questList[questNumber] != undefined)
	{
		quest = {
							Pergunta:questList[questNumber].Pergunta,
							RespostaCorreta: questList[questNumber].RespostaCorreta,
							ItemA: questList[questNumber].ItemA,
							ItemB: questList[questNumber].ItemB,
							ItemC: questList[questNumber].ItemC,
							Resposta:undefined,
							OrderQuest:undefined
						}
	}

	//Ver qual vai ser a quantidade de questoes do Jogo
	//Aqui finaliza o jogo
	if(questNumber != 7 && questList[questNumber] != undefined)
	{
		res.render("jogo", {quest});

	}else
	{
		questNumber = undefined;
		questList = undefined;

		res.redirect("/home");
	}

});


// ========================== ROTAS CRUD Information ========================================================
server.get("/About", (req, res) => {
	res.render("sobre");
});



server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
