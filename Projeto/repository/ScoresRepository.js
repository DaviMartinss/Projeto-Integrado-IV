import { database } from "./config/BD/db.js"

class ScoresRepository{

  //cadastra um novo score
  async InsertScore(score){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "LatestScores" '
                  + '('
                    + '"Premio01",'
                    + '"Premio02",'
                    + '"Premio03",'
                    + '"Premio04",'
                    + '"Premio05",'
                    + '"UserId"'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6);';

        const values = [score.Premio01,
                        score.Premio02,
                        score.Premio03,
                        score.Premio04,
                        score.Premio05,
                        score.UserId];

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

  //atualiza um registro no score do jogo
  async UpdateScore(score){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "LatestScores" SET'
                     + '"Premio01"=$1,'
                     + '"Premio02"=$2,'
                     + '"Premio03"=$3,'
                     + '"Premio04"=$4,'
                     + '"Premio05"=$5'
                     + 'WHERE "UserId"=$6';

       const values = [score.Premio01,
                       score.Premio02,
                       score.Premio03,
                       score.Premio04,
                       score.Premio05,
                       score.UserId];

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

  //deleta um score
  async DeleteScoreById(scoreId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "LatestScores" WHERE "LatestScoresId"=$1';
        const values = [scoreId];
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


  //retorna um score
  async GetScoreById(scoreId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "LatestScores" WHERE "LatestScoresId"=$1;';
        const res = await db.query(sql, [scoreId]);
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

  //retorna uma lista com todos os scores
  async GetScoreList(){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "LatestScores"';
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
}

export const scoresRepository = new ScoresRepository();
