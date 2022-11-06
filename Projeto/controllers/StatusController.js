import { statusRepository } from "../repository/StatusRepository.js";

class StatusController {

  constructor() {}

  //CADASTRA O STATUS DO JOGADOR
  async GenerateStatus(statusData) {

    try{

      //verifica se o insert ocorreu com sucesso!
      var insertStatus = await statusRepository.InsertStatus(statusData);

      if(insertStatus)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O STATUS DO JOGADOR
  async UpdateStatus(statusData) {

    try{

      //verifica se o update ocorreu com sucesso!
      var updateStatus = await statusRepository.UpdateStatus(statusData);

      if(updateStatus)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //DELETA O STATUS DO JOGADOR
  async DeleteStatus(statusId) {

    try{

      //verifica se o delete ocorreu com sucesso!
      var deleteStatus = await statusRepository.DeleteStatus(statusId);

      if(deleteStatus)
        return true;
      else
        return false;

    }catch(e){
      console.log(e);
      return false;
    }
  }
}


export const statusController = new StatusController();
