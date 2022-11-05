import { database } from "./config/BD/db.js"

class StatusRepository{

  //cadastra um novo status no game
  async InsertStatus(status){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Status" '
                  + '('
                    + '"NumPartidasJogada",'
                    + '"TotalPremio",'
                    + '"NumAlternativasEliminadas",'
                    + '"NumDerrotasErro",'
                    + '"NumDerrotasParada",'
                    + '"NumContribuicao",'
                    + '"NivelUsuario",'
                    + '"UserId"'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';

        const values = [status.NumPartidasJogada,
                        status.TotalPremio,
                        status.NumAlternativasEliminadas,
                        status.NumDerrotasErro,
                        status.NumDerrotasParada,
                        status.NumContribuicao,
                        status.NivelUsuario,
                        status.UserId];

        await db.query(sql, values);
        db.release();
        return true;
      }
      else
        return false;

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //atualiza um registro no status do jogo
  async UpdateStatus(status){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "Status" SET'
                     + '"NumPartidasJogada"=$1,'
                     + '"TotalPremio"=$2,'
                     + '"NumAlternativasEliminadas"=$3,'
                     + '"NumDerrotasErro"=$4,'
                     + '"NumDerrotasParada"=$5,'
                     + '"NumContribuicao"=$6,'
                     + '"NivelUsuario"=$7,'
                     + 'WHERE "UserId"=$8';

       const values = [status.NumPartidasJogada,
                       status.TotalPremio,
                       status.NumAlternativasEliminadas,
                       status.NumDerrotasErro,
                       status.NumDerrotasParada,
                       status.NumContribuicao,
                       status.NivelUsuario,
                       status.UserId];

        await db.query(sql, values);
        db.release();
        return true;
      }
      else
        return false;

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //deleta um Status
  async DeleteStatusById(statusId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Status" WHERE "StatusId"=$1';
        const values = [statusId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else
        return false;

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }


  //retorna um status
  async GetStatusById(statusId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Status" WHERE "StatusId"=$1;';
        const res = await db.query(sql, [statusId]);
        db.release();
        return res.rows[0];
      }
      else
        return false;

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }
}

export const statusRepository = new StatusRepository();
