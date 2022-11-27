import { questRepository } from "../repository/QuestRepository.js";

class QuestController {

  constructor() {}

  //CADASTRA A QUESTÃO
  async GenerateQuest(questData) {

    try{
      questData.Validacao = 'Nao';
      //verifica se o insert ocorreu com sucesso!
      var insertQuest = await questRepository.InsertQuest(questData);

      if(insertQuest)
        return insertQuest;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A QUESTÃO
  async UpdateQuest(questData) {

    try{

      //verifica se o update ocorreu com sucesso!
      var updateQuest = await questRepository.UpdateQuest(questData);

      if(updateQuest)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA A QUESTAO
  async DeleteQuest(questionData) {

    try{

      //verifica se o delete ocorreu com sucesso!
      var deleteQuest = await questRepository.DeleteQuest(questionData);

      if(deleteQuest)
        return true;
      else
        return false;

    }catch(e){
      console.log(e);
      return false;
    }
  }

  //PEGA UMA LISTA DE Questões POR MEIO DA VALIDAÇÃO
  async GetRandomQuestByValidate(validade) {

    try{

      var questList = await questRepository.GetRandomQuestByValidate(validade);

      if(!!questList.length)
      {
        return questList;
      }
      else {
        console.log("NENHUMA QUESTÃO ENCONTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  async GetQuests() {

    try{

      var quest = await questRepository.GetQuests();

      if(quest != undefined)
      {
        return quest;
      }
      else {
        console.log("NENHUMA QUESTÃO CADASTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  async GetQuestById(questId) {

    try{

      var quest = await questRepository.GetQuestById(questId);

      if(quest != undefined)
      {
        return quest;
      }
      else {
        console.log("NENHUMA QUESTÃO ENCONTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  async GetQuestaoByName(questName) {

    try{

      var quest = await questRepository.GetQuestaoByName(questName);

      if(quest != undefined)
      {
        return quest;
      }
      else {
        console.log("NENHUMA QUESTÃO ENCONTRADA!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }
  async GetQuestaoDenunciadaByQuestaoId(questaoId) {

    try {

      var count = await questRepository.GetQuestaoDenunciadaByQuestaoId(questaoId);

      if (count != undefined) {
        return count;
      }
      else {
        console.log("Erro ao buscar Questão");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //retorna uma questão
  async QuestionRandom() {

    try{

      var quest = await questRepository.QuestionRandom();

      if(quest != undefined)
      {
        return quest;
      }
      else {
        console.log("Não foi possíevel buscar uma questão de forma aleatória");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

}

export const questController = new QuestController();
