import pkg from 'pg';
const { Pool } = pkg;

class Database{

  async connect() {
      if (global.connection)
          return global.connection.connect();

      let userName = 'postgres';
      let password = '1234';

      const pool = new Pool({
          user: userName,
          host: '',
          database: 'quiz',
          password: password,
          port: 5432,
      });

      if(userName != 'USER' && password != 'SENHA')
      {
        //apenas testando a conexão
        const user = await pool.connect();
        console.log("Criou pool de conexões no PostgreSQL!");

        const res = await user.query('SELECT NOW()');
        console.log(res.rows[0]);
        user.release();

        //guardando para usar sempre o mesmo
        global.connection = pool;
        return pool.connect();
      }
      else
      {
          console.log("INFORME SUAS CREDENCIAIS NO BANCO");
          return null;
      }

  }
}

export const database = new Database();