import { database } from "./config/BD/db.js"

class UserRepository {

  //cadastra um usuário
  async insertUser(user) {

    try {

      const db = await database.connect();
      console.log("user: " + user);
      if (db != undefined) {
        const sql = 'INSERT INTO "User" ("NickName", "UserName", "Password", "Avatar") VALUES ($1,$2,$3, $4);';
        const values = [user.NickName, user.Email, user.Password, user.Avatar];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        //console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  // retorna o usuário logado

  async getUserById(userId) {

    try {

      const db = await database.connect();

      if(db != undefined )
      {
        const sql = 'select * from "User" WHERE "UserId"=$1;';
        const values = [userId]
        const res = await db.query(sql,values);
        db.release();
        return res.rows[0];
      }
      else
      {
        return undefined;
      }

    } catch (e) {
      console.log(e);
      return undefined;
    }
}

  async getUserList() {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'select * from "User";';
        const res = await db.query(sql);
        db.release();
        return res.rows;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //pega o usuário pelo o email
  async getUserByEmail(email) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'SELECT * FROM "User" WHERE "UserName"=$1;';
        const res = await db.query(sql, [email]);
        db.release();
        return res.rows[0];
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //update do usuário
  async updateUser(user) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "User" SET "NickName"=$1, "UserName"=$2, "Password"=$3 WHERE "UserId"=$4';
        const values = [user.NickName, user.Email, user.Password, user.UserId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //deleta usuário
  async deleteUser(userId) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'DELETE FROM "User" WHERE "UserId"=$1';
        const values = [userId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //Atualiza Nome e Email
  async updateUserNickNameAndEmail(user) {

    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "User" SET "NickName"=$1, "UserName"=$2 WHERE "UserId"=$3';
        const values = [user.NickName, user.Email, user.UserId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //update do nome do user
  async updateUserNickName(user) {
    try {

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "User" SET "NickName"=$1 WHERE "UserId"=$2';
        const values = [user.NickName, user.UserId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  //Update senha
  async updatePassword(dados) {

    try {
      console.log("nova senha = " + dados.newPassword);
      console.log("UserId " + dados.userId)

      const db = await database.connect();

      if (db != undefined) {
        const sql = 'UPDATE "User" SET "Password"=$1 WHERE "UserId"=$2';
        const values = [dados.newPassword, dados.userId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

  async UserRandom(userId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "User" WHERE "UserId" <> $1 ORDER BY RANDOM() LIMIT 5';
        const res = await db.query(sql, [userId]);
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

  async UserRandomValidateInsert(userId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'SELECT * FROM "User" WHERE "UserId" <> $1 ORDER BY RANDOM() LIMIT 2';
        const res = await db.query(sql, [userId]);
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

export const userRepository = new UserRepository();
