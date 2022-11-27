import { validateRepository } from "../repository/ValidateRepository.js";

class ValidateController {

  constructor() {}

  //CADASTRA A DENUNCIA
  async GenerateValidate(validateData) {

    try{

      //verifica se o insert ocorreu com sucesso!
      var insertValidate = await validateRepository.InsertValidate(validateData);

      if(insertValidate)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //Insert Count 
  async GenerateCountValidate(validateData) {

    try{

      //verifica se o insert ocorreu com sucesso!
      var insertValidate = await validateRepository.GenerateCountValidate(validateData);

      if(insertValidate)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A DENUNCIA
  async UpdateValidate(validateData) {

    try{

      //verifica se o update ocorreu com sucesso!
      var updateValidate = await validateRepository.UpdateValidate(validateData);

      if(updateValidate)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA A QUESTAO
  async DeleteValidate(validateId) {

    try{

      //verifica se o delete ocorreu com sucesso!
      var deleteValidate = await validateRepository.DeleteValidate(validateId);

      if(deleteValidate)
        return true;
      else
        return false;

    }catch(e){
      console.log(e);
      return false;
    }
  }
  
  //Validar questão
  async GetValidateQuestion(email) {

    try{

      //retorna uma lista com as perguntas para o usuário validar
      var questValidate = await validateRepository.GetValidateQuestion(email);

      if(questValidate != undefined)
        return questValidate;
      else
        return undefined;

    }catch(e){
      console.log(e);
      return undefined;
    }
  }

  //Retorna a pergunga que vai ser valida
  async GetDenunciarValidarByQuestaoId(questId) {

    try{

      var quest = await validateRepository.GetDenunciarValidarByQuestaoId(questId);

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

  //Atualiza a quantidade de validação
  async UpdateNumValidacao(validarDenunciarData) {

    try{

      //verifica se o update ocorreu com sucesso!
      var updateValidate = await validateRepository.UpdateNumValidacao(validarDenunciarData);

      if(updateValidate)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //Rejeitar denúncia
  async RejeitarDenuncia(rejeitarData) {

    try{

      //verifica se o insert ocorreu com sucesso!
      var insertRejeitarDenuncia = await validateRepository.RejeitarDenuncia(rejeitarData);

      if(insertRejeitarDenuncia)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }
}


export const validateController = new ValidateController();
