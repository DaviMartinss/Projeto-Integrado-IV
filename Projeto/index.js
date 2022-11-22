//Aplication IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aes256 from "aes256";

//Controlers IMPORTS
//#region Controllers
import { userController } from "./controllers/UserController.js";
import { questController } from "./controllers/QuestController.js";
import { statusController } from "./controllers/StatusController.js";
import { rankController } from "./controllers/RankController.js";
import { gameController } from "./controllers/GameController.js";
//#endregion

//Configurações Globais da Aplicação
//#region Configurações
import { sendMail, sendMailBemVindo } from "./microservice/Email/SendEmail.js";
import { sendEmailController } from "./controllers/SendEmailController.js";
import { validateController } from "./controllers/ValidateController.js";
import { CLIENT_RENEG_WINDOW } from "tls";

//Variavel global responsável pela seção do usuário
var user = undefined;
var questaoDenunciada = [];

//Variavel global responsável pela Lista de Perguntas do Jogo
var questList = undefined;

//Variavel global responsável pelo número da Questão no Jogo
var questNumber = undefined;

//Variavel global responsável pela ajuda do Jogo(flag booleana)
var ajuda = 1;

//Variavel global responsável pela contabilização dos acertos das Questoes do Jogo
var moneyTotal = undefined;

//Lista global responsável pela recompensas de acerto das Questoes do Jogo
var listMoneyAcerts = [1000,5000,50000,100000,300000,500000,1000000];

//Lista global responsável pela recompensas de erro da Questao do Jogo
var listMoneyErrors = [0,500,2500,25000,50000,150000,0];

//Lista global responsável pela recompensas de parada da Questao do Jogo
var listMoneyStop = [0,1000,5000,50000,100000,300000,500000];

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

		questNumber = undefined;
		questList = undefined;
		moneyTotal = undefined;
		ajuda = 1;

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
		sendMailBemVindo.run(userData.NickName, userData.Email);
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

//ROTA DELETA O USUÁRIO
server.get("/deleteUser", async (req, res) => {

	if (req.body.UserId != undefined)
		user = req.body

	//verifica se o delete ocorreu com sucesso!
	var deleteUser = await userController.DeleteUser(user.UserId);

	if (deleteUser) {
		//console.log("USUÁRIO DELETADO");
		res.redirect("/");
	}
	else {
		//deve redirecionar para página de informações do usuário com o alerta ERRO
		console.log("ERRO AO DELETAR O USUÁRIO");
	}
});

//Recuperar senha
server.get("/ResetPassword", async (req, res) => {
	res.render("resetPassword");
});

server.post("/resetPassword", async(req, res) => {

	var userExiste = await userController.GetUserByEmail(req.body.Email);

	if(userExiste != undefined)
	{
		// gerando senha aleatória
		var min = Math.ceil(10000000);
		var max = Math.floor(99999999);
		var novaSenha = Math.floor(Math.random() * (max - min + 1)) + min;
		// fim da função

		var dados = {newPassword: novaSenha, userId: userExiste.UserId}

		var salvaSenha = await sendEmailController.SavePassword(dados);

		if(salvaSenha){

			var Novosdados = {newPassword: novaSenha, userId: userExiste.UserId}
			userController.UpdatePassword(Novosdados);

			sendMail.run(novaSenha, req.body.Email);
			res.redirect('/');
		}else{
			console.log("Erro ao salvar nova senha");
		}
	}
	else {
		console.log("Email não foi cadastrado por um usuário no sistema!");
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

server.get("/deleteQuestion", async (req, res) => {

	var questionData = req.query

	if (questionData.UserId == undefined) {
		questionData = {QuestaoId: req.query.QuestaoId }
	}

	//verifica se o update ocorreu com sucesso!
	var deleteQuestion = await questController.DeleteQuest(questionData);

	if (deleteQuestion) {
		res.redirect("/ManageQuest")
	}
	else {
		//deve redirecionar para o painel de questões com alerta de erro
		console.log("QUESTÃO NÃO FOI DELETADA");
	}
});



// ========================== ROTAS Jogo ========================================================

//Rota inicial para inicializar o jogo
server.get("/Game", async(req, res) => {

	var quest = undefined;

	if(questList == undefined)
	{
		questList = await questController.GetRandomQuestByValidate('Sim');
	}

 	//Verificando se iniciou o jogo
	if(questNumber == undefined)
	{
		quest =
		 {
			QuestaoId: questList[0].QuestaoId,
			Pergunta:questList[0].Pergunta,
			RespostaCorreta: questList[0].RespostaCorreta,
			ItemA: questList[0].ItemA,
			ItemB: questList[0].ItemB,
			ItemC: questList[0].ItemC,
			Resposta:undefined,
			OrderQuest:undefined,
			Ajudar:ajuda
		}

		//console.log(quest);

		questNumber = 0;
		res.render("jogo", {quest, moneyTotal});
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

	let statusGame = undefined;

	quest = {
				QuestaoId: questList[questNumber].QuestaoId,
				Pergunta:questList[questNumber].Pergunta,
				RespostaCorreta: questList[questNumber].RespostaCorreta,
				ItemA: questList[questNumber].ItemA,
				ItemB: questList[questNumber].ItemB,
				ItemC: questList[questNumber].ItemC,
				Resposta:req.body.Resposta,
				OrderQuest:parseInt(req.body.OrderQuest),
				Ajudar:parseInt(req.body.Ajudar)
			}

		ajuda = quest.Ajudar;

		if(questNumber == 7 && quest.RespostaCorreta == quest.Resposta)
		{
			moneyTotal = listMoneyAcerts[questNumber];
			statusGame = 1;

			var winnerGame = await gameController.WinnerGame(user, moneyTotal, ajuda);

			if(winnerGame == false)
			{
				console.log("ERRO AO GANHAR O GAME");
			}
		}

		if(quest.RespostaCorreta != quest.Resposta)
		{
			moneyTotal = listMoneyErrors[questNumber];
			statusGame = 3;

			var errorGame = await gameController.ErrorGame(user, moneyTotal, ajuda);

			if(errorGame == false)
			{
				console.log("ERRO AO ERRAR NO GAME");
			}
		}

		//console.log(quest);

		res.render("jogo", {quest, moneyTotal,statusGame});

});


//AQUI É RESPONSAVEL PELO CARREGAMENTO DA PROXIMA PERGUNTA / VERIFICAÇÃO DO FIM DE GAME
server.get("/NextQuest", async(req, res) => {

	var quest = undefined;

	questNumber = questNumber + 1;

	if(questList[questNumber] != undefined)
	{
		quest = {
					QuestaoId: questList[questNumber].QuestaoId,
					Pergunta:questList[questNumber].Pergunta,
					RespostaCorreta: questList[questNumber].RespostaCorreta,
					ItemA: questList[questNumber].ItemA,
					ItemB: questList[questNumber].ItemB,
					ItemC: questList[questNumber].ItemC,
					Resposta:undefined,
					OrderQuest:undefined,
					Ajudar:ajuda
				}
	}

	//Ver qual vai ser a quantidade de questoes do Jogo
	if(questNumber != 7 && questList[questNumber] != undefined)
	{
		res.render("jogo", {quest, moneyTotal});
	}

});

//Rota que para o jogo
server.get("/StopGame", async(req, res) => {

  	var quest = undefined;

		//Finaliza o jogo caso o user realmente deseja parar o game
		if(req.query.Parar)
		{
			var stopGame = await gameController.StopGame(user, moneyTotal, ajuda);

		//console.log(new Date().toLocaleString());

			if(stopGame == false)
			{
				console.log("ERRO AO PARAR O GAME");
			}

			questNumber = undefined;
			questList = undefined;
			moneyTotal = undefined;
			ajuda = 1;

			res.redirect("/home");
		}
		else
		{
			quest = {
								Pergunta:questList[questNumber].Pergunta,
								RespostaCorreta: questList[questNumber].RespostaCorreta,
								ItemA: questList[questNumber].ItemA,
								ItemB: questList[questNumber].ItemB,
								ItemC: questList[questNumber].ItemC,
								Resposta:undefined,
								OrderQuest:parseInt(req.query.OrderQuest),
								Ajudar:ajuda
							}

			moneyTotal = listMoneyStop[questNumber];

			let statusGame = 2;

			res.render("jogo", {quest, moneyTotal, statusGame});
		}
});

//Denunciar
server.get("/denunciarQuestion", async (req, res) => {
	var questionData = req.query

	if (questionData.UserId == undefined) {
		questionData = { QuestaoId: req.query.QuestaoId }
	}

	var denuncia = await questController.GetQuestaoDenunciadaByQuestaoId(questionData.QuestaoId);

	if (denuncia == undefined) {
		var denunciaData =
		{
			NumDenuncias: 1,
			NumValidacao: 0,
	 		QuestaoId: questionData.QuestaoId
	 	}

		var insertDenuncia = await validateController.GenerateCountValidate(denunciaData);

		if(insertDenuncia)
		{
			console.log("sucesso insert denuncia");
		}else{
			console.log("erro insert denuncia");
		}

		denuncia = await questController.GetQuestaoDenunciadaByQuestaoId(questionData.QuestaoId);
	 } 
	 else
	{
	 	denuncia.NumDenuncias = denuncia.NumDenuncias + 1;
	}
	
	if (denuncia.NumDenuncias == 2)
	{
		//gerar 5 usuários aleatórios
		var userRandom = await userController.UserRandom(user.UserId);
		
		var denunciaData =
		{
			NumDenuncias: denuncia.NumDenuncias,
			UserName01: userRandom[0].UserName,
			UserName02: userRandom[1].UserName,
			UserName03: userRandom[2].UserName,
			UserName04: userRandom[3].UserName,
			UserName05: userRandom[4].UserName,
			QuestaoId: questionData.QuestaoId
		};
		
		var updateDenuncia = await validateController.UpdateValidate(denunciaData); 
		if(updateDenuncia)
		{
			console.log("sucesso update denuncia");
		}else
		{
			console.log("erro update denuncia");
		}
	}
	var questId = [];
	
	questaoDenunciada.push(questionData.QuestaoId);
	
	questList.forEach(quest => {
		questId.push(quest.QuestaoId);
	});

	var aux = true;
	var novaQuestao;
	while(aux){
		novaQuestao = await questController.QuestionRandom();
		var cont = 0;
		var aux = [];
		aux = questList.concat(questaoDenunciada);
		for (let index = 0; index < aux.length; index++) {
			const element = aux[index];

			if(element == novaQuestao.QuestaoId){
				console.log("é igual");
				novaQuestao = await questController.QuestionRandom();
				cont +=1;
			}
		}
		if(cont == 0)
			aux = false;
	}

	questList[questNumber] = novaQuestao

	let statusGame = undefined;
	var quest = {
		QuestaoId: questList[questNumber].QuestaoId,
		Pergunta:questList[questNumber].Pergunta,
		RespostaCorreta: questList[questNumber].RespostaCorreta,
		ItemA: questList[questNumber].ItemA,
		ItemB: questList[questNumber].ItemB,
		ItemC: questList[questNumber].ItemC,
		Resposta:undefined,
		OrderQuest:undefined,
		Ajudar:ajuda
	}

	res.render("jogo", {quest, moneyTotal,statusGame});

});

// ========================== ROTAS RANK ========================================================

server.get('/Rank', async (req, res) => {

	if(user != undefined)
	{
		var listRank = await rankController.GetRank();

		res.render("HallFama", { listRank});
	}
	else
	{
		console.log("LOGUE NO SISTEMA PRIMEIRO");
		res.redirect("/");
	}

});

// ========================== ROTAS CRUD Information ========================================================
server.get("/About", (req, res) => {
	res.render("sobre");
});



server.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});
