import { rankRepository } from "../repository/RankRepository.js";

class RankController {
  constructor() {}

  //CADASTRA O RANK DO JOGADOR
  async GenerateRank(rankData) {

    try{
      //verifica se o insert ocorreu com sucesso!
      var insertRank = await rankRepository.InsertRank(rankData);

      if(insertRank)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O RANK DO JOGADOR
  async UpdateRank(rankData) {

    try{

      //verifica se o update ocorreu com sucesso!
      var updateRank = await rankRepository.UpdateRank(rankData);

      if(updateRank)
        return true;
      else
        return false;

    }catch(e){

      console.log(e);
      return false;
    }
  }

  async GetRankByUserId(userId) {

    try{

      var rank = await rankRepository.GetRankByUserId(userId);

      if(rank != undefined)
      {
        return rank;
      }
      else {
        console.log("NENHUM RANK ENCONTRADO!");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

}

export const rankController = new RankController();
