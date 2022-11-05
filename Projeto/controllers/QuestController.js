import { questRepository } from "../repository/QuestRepository.js";

class QuestController {

  constructor() {}

  //CADASTRA A QUESTÃO
  async GenerateQuest(questData) {

    try{

      //verifica se o insert ocorreu com sucesso!
      var insertQuest = await questRepository.InsertQuest(questData);

      if(insertQuest)
        return true;
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
  async DeleteQuest(questId) {

    try{

      //verifica se o delete ocorreu com sucesso!
      var deleteQuest = await questRepository.DeleteQuest(questId);

      if(deleteQuest)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

}
