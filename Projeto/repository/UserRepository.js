import { database } from "./config/BD/db.js"

class UserRepository{

  //cadastra um usuário
  async insertUser(user){

    try {

      const db = await database.connect();
      console.log("user: "+user);
      if(db != undefined)
      {
        const sql = 'INSERT INTO "User" ("NickName", "UserName", "Password", "Avatar") VALUES ($1,$2,$3, $4);';
        const values = [user.NickName, user.Email, user.Password, user.Avatar];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else
      {
        //console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }


    async getUserList() {

        try {

          const db = await database.connect();

          if(db != undefined )
          {
            const sql = 'select * from "User";';
            const res = await db.query(sql);
            db.release();
            return res.rows;
          }
          else
          {
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

        if(db != undefined )
        {
          const sql = 'SELECT * FROM "User" WHERE "UserName"=$1;';
          const res = await db.query(sql,[email]);
          db.release();
          return res.rows[0];
        }
        else
        {
          console.log("ERRO NA CONEXÃO COM POSTGREESQL");
          return undefined;
        }

      } catch (e) {

        console.log(e);
        return undefined;
      }
    }

    //update do usuário
   async updateUser(user){

     try {

       const db = await database.connect();

       if(db != undefined)
       {
         const sql = 'UPDATE "User" SET "NickName"=$1, "UserName"=$2, "Password"=$3 WHERE "UserId"=$4';
         const values = [user.NickName, user.Email, user.Password, user.UserId];
         await db.query(sql, values);
         db.release();
         return true;
       }
       else
       {
         console.log("ERRO NA CONEXÃO COM POSTGREESQL");
         return false;
       }

     } catch (ex) {

       console.log(ex);
       return false;
     }
  }

  //deleta usuário
  async deleteUser(userId){

    try {

      const db = await database.connect();

      if(db != undefined)
      {
        const sql = 'DELETE FROM "User" WHERE "UserId"=$1';
        const values = [userId];
        await db.query(sql, values);
        db.release();
        return true;
      }
      else
      {
        console.log("ERRO NA CONEXÃO COM POSTGREESQL");
        return false;
      }

    } catch (ex) {

      console.log(ex);
      return false;
    }
  }

}

export const userRepository = new UserRepository();
