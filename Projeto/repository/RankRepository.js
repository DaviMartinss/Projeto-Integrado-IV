import { database } from "./config/BD/db.js"

class RankRepository{

  //cadastra um novo user no rank
  async InsertRank(rank){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Ranking" '
                  + '('
                    + '"Score",'
                    + '"ScoreDateTime",'
                    + '"UserId"'
                  + ')'
                  + ' VALUES ($1,$2,$3);';

        const values = [rank.Score,
                        rank.ScoreDateTime,
                        rank.UserId];

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

  //atualiza um registro no ranking
  async UpdateRank(rank){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "Ranking" SET'
                     + '"Score"=$1,'
                     + '"ScoreDateTime"=$2'
                     + 'WHERE "UserId"=$3';

       const values = [rank.Score,
                       rank.ScoreDateTime,
                       rank.UserId];

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

  //deleta um Ranking
  async DeleteRankById(rankId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Ranking" WHERE "RankingId"=$1';
        const values = [rankId];
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


  //retorna um ranking
  async GetRankById(rankId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Ranking" WHERE "RankingId"=$1;';
        const res = await db.query(sql, [rankId]);
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

  //retorna todos os Ranking do jogo
  async GetRank(){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Ranking";';
        const res = await db.query(sql);
        db.release();
        return res.rows;
      }
      else
        return false;

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //retorna um rank pelo userId
  async GetRankByUserId(userId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Ranking" WHERE "UserId"=$1;';
        const res = await db.query(sql, [userId]);
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

export const rankRepository = new RankRepository();
