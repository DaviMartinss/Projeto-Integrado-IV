import { database } from "../config/BD/db.js";

class UserRepository{
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
}

export const userRepository = new UserRepository();