import { database } from "./config/BD/db.js"

class ValidateRepository{

  //cadastra uma nova denúncia
  async InsertValidate(validate){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
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
                        validate.Username02,
                        validate.Username03,
                        validate.Username04,
                        validate.Username05,
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
  async UpdateValidate(validate){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'UPDATE "DenunciarValidar" SET'
                     + '"NumDenuncias"=$1,'
                     + '"NumValidacao"=$2,'
                     + '"UserName01"=$3,'
                     + '"Username02"=$4,'
                     + '"Username03"=$5,'
                     + '"Username04"=$6,'
                     + '"Username05"=$7'
                     + 'WHERE "QuestaoId"=$8';

       const values = [validate.NumDenuncias,
                       validate.NumValidacao,
                       validate.UserName01,
                       validate.Username02,
                       validate.Username03,
                       validate.Username04,
                       validate.Username05,
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
  async DeleteValidateById(validateId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
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
  async GetValidateById(validateId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
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
  async GetValidateList(){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
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
}

export const validateRepository = new ValidateRepository();
