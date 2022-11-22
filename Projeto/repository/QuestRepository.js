import { database } from "./config/BD/db.js"

class QuestRepository{

  //cadastra uma questão
  async InsertQuest(quest){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'INSERT INTO "Questao" '
                  + '('
                    + '"Pergunta",'
                    + '"RespostaCorreta",'
                    + '"ItemA",'
                    + '"ItemB",'
                    + '"ItemC",'
                    + '"NivelDificuldade",'
                    + '"TopicoQuestao",'
                    + '"Validacao"'
                  + ')'
                  + ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';

        const values = [quest.Pergunta,
                        quest.RespostaCorreta,
                        quest.ItemA,
                        quest.ItemB,
                        quest.ItemC,
                        quest.NivelDificuldade,
                        quest.TopicoQuestao,
                        quest.Validacao];

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

  //atualiza uma questão
  async UpdateQuest(quest){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "Questao" SET'
                     + '"Pergunta"=$1,'
                     + '"RespostaCorreta"=$2,'
                     + '"ItemA"=$3,'
                     + '"ItemB"=$4,'
                     + '"ItemC"=$5,'
                     + '"NivelDificuldade"=$6,'
                     + '"TopicoQuestao"=$7,'
                     + '"Validacao"=$8'
                     + 'WHERE "QuestaoId"=$9';

         const values = [quest.questionData.Questao,
                         quest.questionData.RespostaCorreta,
                         quest.questionData.ItemA,
                         quest.questionData.ItemB,
                         quest.questionData.ItemC,
                         quest.questionData.NivelDificuldade,
                         quest.questionData.TopicoQuestao,
                         quest.Validacao,
                         quest.QuestaoId];

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

  //deleta Questao
  async DeleteQuest(questionData){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "Questao" WHERE "QuestaoId"=$1';
        const values = [questionData.QuestaoId];
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

  //Retorna todas as perguntas cadastradas
  async GetQuests(){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Questao"';
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

  //retorna uma Questao
  async GetQuestById(questId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Questao" WHERE "QuestaoId"=$1;';
        const res = await db.query(sql, [questId]);
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

  async GetQuestaoByName(questName){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Questao" WHERE "Pergunta"=$1;';
        const res = await db.query(sql, [questName]);
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

  //retorna uma lista de Questões pelo critério de validade
  async GetRandomQuestByValidate(validade){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Questao" WHERE "Validacao"=$1 ORDER BY RANDOM() LIMIT 7;';
        const res = await db.query(sql, [validade]);
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

  // Retorna uma pergunta denunciada
  async GetQuestaoDenunciadaByQuestaoId(questaoId) {

    try {
      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT "NumDenuncias" FROM "DenunciarValidar" WHERE "QuestaoId" = $1;';
        const values = [questaoId]
        const res = await db.query(sql, values);
        db.release();
        return res.rows[0];
      }
      else {
        return undefined;
      }

    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async QuestionRandom(){
    
    try {
    
      const db = await database.connect();
      
      if(db != undefined)
      {
        const sql = 'SELECT * FROM "Questao" ORDER BY RANDOM() LIMIT 1';
        const res = await db.query(sql);
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

export const questRepository = new QuestRepository();
