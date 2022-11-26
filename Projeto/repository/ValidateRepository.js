import { database } from "./config/BD/db.js"

class ValidateRepository {

  //cadastra uma nova denúncia
  async InsertValidate(validate) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'INSERT INTO "DenunciarValidar" '
          + '('
          + '"NumDenuncias",'
          + '"NumValidacao",'
          + '"UserName01",'
          + '"Username02",'
          + '"Username03",'
          + '"Username04",'
          + '"Username05",'
          + '"QuestaoId"'
          + ')'
          + ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';

        const values = [validate.NumDenuncias,
        validate.NumValidacao,
        validate.UserName01,
        validate.UserName02,
        validate.UserName03,
        validate.UserName04,
        validate.UserName05,
        validate.QuestaoId];

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

  //Insert Count
  async GenerateCountValidate(validate) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'INSERT INTO "DenunciarValidar" '
          + '('
          + '"NumDenuncias",'
          + '"NumValidacao",'
          + '"QuestaoId"'
          + ')'
          + ' VALUES ($1,$2,$3);';

        const values = [validate.NumDenuncias,
        validate.NumValidacao,
        validate.QuestaoId];

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

  //atualiza um registro da denuncia
  async UpdateValidate(validate) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "DenunciarValidar" SET'
          + '"NumDenuncias"=$1,'
          + '"UserName01"=$2,'
          + '"Username02"=$3,'
          + '"Username03"=$4,'
          + '"Username04"=$5,'
          + '"Username05"=$6'
          + 'WHERE "QuestaoId"=$7';

        const values = [validate.NumDenuncias,
        validate.UserName01,
        validate.UserName02,
        validate.UserName03,
        validate.UserName04,
        validate.UserName05,
        validate.QuestaoId];

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

  //deleta um validate
  async DeleteValidateById(validateId) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'DELETE FROM "DenunciarValidar" WHERE "DenunciarValidarId"=$1';
        const values = [validateId];
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


  //retorna um validate
  async GetValidateById(validateId) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT * FROM "DenunciarValidar" WHERE "DenunciarValidarId"=$1;';
        const res = await db.query(sql, [validateId]);
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

  //retorna uma lista com todos os validates
  async GetValidateList() {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT * FROM "DenunciarValidar"';
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
  //
  async GetValidateQuestion(email) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT * FROM "DenunciarValidar" AS "DV"'
          + 'INNER JOIN "Questao" AS "Q" ON "Q"."QuestaoId" = "DV"."QuestaoId"'
          + 'WHERE'
          + '"UserName01"=$1 OR'
          + '"Username02"=$1 OR'
          + '"Username03"=$1 OR'
          + '"Username04"=$1 OR'
          + '"Username05"=$1';
        const res = await db.query(sql, [email]);
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

  //Retorna uma questao pelo o Id
  async GetDenunciarValidarByQuestaoId(questId) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT * FROM "DenunciarValidar" WHERE "QuestaoId"=$1;';
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
  //Atualiza o Numero de validação
  async UpdateNumValidacao(validarDenunciarData) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "DenunciarValidar" SET "NumValidacao"=$1 WHERE "QuestaoId"=$2';

        const values =
        [
          validarDenunciarData.NumValidacao,
          validarDenunciarData.QuestaoId
        ];

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
}

export const validateRepository = new ValidateRepository();
