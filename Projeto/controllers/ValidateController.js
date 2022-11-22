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
}


export const validateController = new ValidateController();
