-- Database: JogoMilhao

-- DROP DATABASE IF EXISTS "JogoMilhao";

CREATE DATABASE "JogoMilhao"
    WITH
    OWNER = --seu usuario
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



CREATE TABLE "User" (
	"UserId" serial PRIMARY KEY NOT NULL,
	"UserName" VARCHAR(50) NOT NULL UNIQUE,
	"Password" VARCHAR(255) NOT NULL,
	"NickName" VARCHAR(20) NOT NULL,
	"Avatar" VARCHAR(200) DEFAULT NULL
);

CREATE TABLE "Status" (
	"StatusId" serial PRIMARY KEY NOT NULL,
	"NumPartidasJogada" INT NOT NULL,
	"TotalPremio" INT NOT NULL,
	"NumAlternativasEliminadas" INT NOT NULL,
	"NumDerrotasErro" INT NOT NULL,
	"NumDerrotasParada" INT NOT NULL,
	"NumContribuicao" INT NOT NULL,
	"NivelUsuario" VARCHAR(50) NOT NULL,
	"UserId" INT NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Ranking" (
	"RankingId" serial PRIMARY KEY NOT NULL,
	"Score" float NOT NULL,
	"ScoreDateTime" timestamp DEFAULT CURRENT_TIMESTAMP,
	"UserId" INT NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "LatestScores" (
	"LatestScoresId" serial PRIMARY KEY NOT NULL,
	"Premio01" INT,
	"Premio02" INT,
	"Premio03" INT,
	"Premio04" INT,
	"Premio05" INT,
	"UserId" INT NOT NULL,
	CONSTRAINT FK_USER FOREIGN kEY("UserId") REFERENCES "User" ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Questao" (
	"QuestaoId" serial PRIMARY KEY NOT NULL,
	"Pergunta" varchar(100) NOT NULL,
	"RespostaCorreta" varchar(50) NOT NULL,
	"ItemA" varchar(50) NOT NULL,
	"ItemB" varchar(50) NOT NULL,
	"ItemC" varchar(50) NOT NULL,
	"NivelDificuldade" INT NOT NULL,
	"TopicoQuestao" varchar(20) NOT NULL,
	"Validacao" VARCHAR(5) NOT NULL
);

CREATE TABLE "DenunciarValidar" (
	"DenunciarValidarId" serial PRIMARY KEY NOT NULL,
	"NumDenuncias" INT NOT NULL,
	"NumValidacao" INT NOT NULL,
	"UserName01" varchar(50),
	"Username02" varchar(50),
	"Username03" varchar(50),
	"Username04" varchar(50),
	"Username05" varchar(50),
	"QuestaoId" INT NOT NULL,
	CONSTRAINT FK_QUESTAO FOREIGN KEY("QuestaoId") references "Questao"  ON DELETE CASCADE ON UPDATE CASCADE
);
