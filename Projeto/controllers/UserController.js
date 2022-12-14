import { userRepository } from "../repository/UserRepository.js";
import aes256 from "aes256";

//Encriptografia
var key = 'bf3c199c2470cb477d907b1e0917c17b';
var cipher = aes256.createCipher(key);
//Ex:
//	cipher.encrypt("senha")
//	cipher.decrypt("senha");

class UserController {
  constructor() {
  }

  //pega USER PELO EMAIL E SENHA
  async GetUserByEmailAndSenha(userData) {

    try {
      var user = undefined;
      var getUserList = await userRepository.getUserList();

      getUserList.forEach(userLista => {
        if (userData.Email == userLista.UserName && userData.Password == cipher.decrypt(userLista.Password))
          user = userLista;

      });

      if (user != undefined) {
        return user;
      }
      else {
        console.log("USUÁRIO INEXISTENTE");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //CADASTRA O USUARIO
  async GenerateUser(userData) {

    try {
      //verifica se as senhas são diferentes
      if (userData.Password != userData.confirmePassword) {
        console.log("AS senhas são diferentes");
        return false;
      }

      userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

      //verificar se o email já foi cadastrado
      var userExiste = await userRepository.getUserByEmail(userData.Email);

      //verifica se o insert ocorreu com sucesso!
      var insertUser;

      if (userExiste == undefined) {

        insertUser = await userRepository.insertUser(userData);

        if (insertUser)
          return true;
        else
          return false;

      } else {
        console.log("Email já foi cadastrado por outro usuário!");
        return false;
      }

    } catch (e) {

      console.log(e);
      return false;
    }
  }

  //ATUALIZA O USUARIO
  async UpdateUser(userData) {

    try {

      userData.Password = cipher.encrypt(userData.Password); //criptografia aes256

      //verifica se o update ocorreu com sucesso!
      var updateUser;

      updateUser = await userRepository.updateUser(userData);

      if (updateUser)
        return true;
      else
        return false;

    } catch (e) {

      console.log(e);
      return false;
    }
  }

  //DELETA O USUARIO
  async DeleteUser(userId) {

    try {

      //verifica se o delete ocorreu com sucesso!
      var deleteUser = await userRepository.deleteUser(userId);

      if (deleteUser)
        return true;
      else
        return false;

    } catch (e) {

      console.log(e);
      return false;
    }
  }

  async GetUserByEmail(email) {

    try {

      var user = await userRepository.getUserByEmail(email);

      if (user != undefined) {
        return user;
      }
      else {
        console.log("NENHUM USUÁRIO COM EMAIL=" + email + " CADASTRADO!");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //Retorna o usuário pelo o Id
  async GetUserById(userId) {

    try {

      var user = await userRepository.getUserById(userId);

      if (user != undefined) {
        return user;
      }
      else {
       console.log("Erro, não foi possível encontrar o usuário");
        return undefined;
      }

    } catch (e) {

      console.log(e);
      return undefined;
    }
  }

  //atualiza apenas o nome do usuário
  async updateUserNickName(userData) {

    try {

      //verifica se o update ocorreu com sucesso!
      var updateUser;

      updateUser = await userRepository.updateUserNickName(userData);

      if (updateUser)
        return true;
      else
        return false;

    } catch (e) {

      console.log(e);
      return false;
    }
  }
  //ATUALIZA O USUARIO
  async updateUserNickNameAndEmail(userData) {

    try {

      //verifica se o update ocorreu com sucesso!
      var updateUser;

      updateUser = await userRepository.updateUserNickNameAndEmail(userData);

      if (updateUser)
        return true;
      else
        return false;

    } catch (e) {

      console.log(e);
      return false;
    }
  }

  //ATUALIZA A SENHA DO USUARIO
  async UpdatePassword(dados) {

    try{

      console.log("Nova senha: "+dados.newPassword);
      dados.newPassword = cipher.encrypt(dados.newPassword + '');

      var userChangePassword = await userRepository.updatePassword(dados);

    	if(userChangePassword){
    		console.log("Atualizado a senha com sucesso!");

    		//pegar os dados do usuário logado pelo o Id
    		const user = await userRepository.getUserById(dados.userId);
        return user;

    	}else{
    		console.log("Falha ao atualizar a senha");
    		return undefined;
    	}

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //Retorna 5 usuários aleatórios diferente do user atual
  async UserRandom(userId) {

    try{

      var users = await userRepository.UserRandom(userId);

      if(users != undefined)
      {
        return users;
      }
      else {
        console.log("Não foi possíevel buscar os usuários de forma aleatória");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }

  //Retorna 2 usuários aleatórios diferente do user atual
  async UserRandomValidateInsert(userId) {

    try{

      var users = await userRepository.UserRandomValidateInsert(userId);

      if(users != undefined)
      {
        return users;
      }
      else {
        console.log("Não foi possíevel buscar os usuários de forma aleatória");
        return undefined;
      }

    }catch(e){

      console.log(e);
      return undefined;
    }
  }
}

export const userController = new UserController();
