import { statusController } from "./StatusController.js";
import { rankController } from "./RankController.js";

class GameController {
  constructor() {}

  async StopGame(user, moneyTotal, ajuda) {

    try{

      var status = await statusController.GetStatusByUserId(user.UserId);

			if(status == undefined)
			{
				status = {
									NumPartidasJogada:1,
									TotalPremio:moneyTotal,
									NumAlternativasEliminadas:(ajuda == 1) ? 0 : 2,
									NumDerrotasErro:0,
									NumDerrotasParada:1,
									NumContribuicao:0,
									NivelUsuario:0,
									UserId:user.UserId
								 }

					var insertStatus = await statusController.GenerateStatus(status);

					if(insertStatus == false)
	 				{
	 					return false;
	 				}
			}
			else
			{
        //console.log(status);

				status = {
									NumPartidasJogada: status.NumPartidasJogada + 1,
									TotalPremio:status.TotalPremio + moneyTotal,
									NumAlternativasEliminadas:status.NumAlternativasEliminadas + (ajuda == 1) ? 0 : 2,
									NumDerrotasErro:status.NumDerrotasErro,
									NumDerrotasParada:status.NumDerrotasParada + 1,
									NumContribuicao:0,
									NivelUsuario:'0',
									UserId:user.UserId
								 }

					var updateStatus = await statusController.UpdateStatus(status);

					if(updateStatus == false)
	 				{
            //console.log("deu ruim no status");
	 					return false;
	 				}
			}

			var rank = await rankController.GetRankByUserId(user.UserId);

			if(rank == undefined)
			{
				rank = {
									Score:moneyTotal,
									ScoreDateTime:new Date().toLocaleString(),
									UserId:user.UserId
								 }

					var insertRank = await rankController.GenerateRank(rank);

					if(insertRank == false)
	 				{
	 					return false;
	 				}
			}
			else
			{
        //console.log(rank);

				rank = {
								Score:rank.Score + moneyTotal,
								ScoreDateTime:new Date().toLocaleString(),
								UserId:user.UserId
							 }

					var updateRank = await rankController.UpdateRank(rank);

					if(updateRank == false)
	 				{
            //console.log("deu ruim no rank");
	 					return false;
	 				}
			}

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

}

export const gameController = new GameController();
