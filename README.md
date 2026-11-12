# Biblioteca da Turma — Autores

Aplicação web de uma pequena biblioteca: o usuário cria uma conta, faz login e gerencia **livros** e **autores** (listar, cadastrar, excluir e buscar autores por nome).

Este repositório é o **gabarito (resolução)** da **AV1** da disciplina Desenvolvimento Web 2 (CMPDWE2), curso TADS do IFSP Campus Campinas, 2026.2. Profa. Bianca Pedrosa.

> **Branch `render-postgres`:** esta é a versão adaptada para hospedar no **Render com PostgreSQL**. Usa o driver `pg` no lugar do `mysql2`, placeholders `$1, $2…` no lugar de `?` e `ILIKE` na busca. A conexão vem de uma única variável, `DATABASE_URL`, e as tabelas estão em `sql/schema.sql` (sintaxe Postgres). A versão original da prova, com MySQL local, está na branch `main`.

**Tecnologias:** Node.js · Express · EJS · MySQL (mysql2) · express-session · bcryptjs · arquitetura MVC

---

## Contexto da prova

O projeto foi construído em duas fases:

1. **Em aula (antes da prova):** a turma desenvolveu a base da aplicação, com registro, login, logout e o **cadastro de livros**. Essa base foi entregue pronta aos alunos no início da prova (o *starter*).
2. **Na prova (AV1):** cada aluno acrescentou o **cadastro de autores**, seguindo o mesmo padrão MVC que já existia para os livros. A página `views/autores.ejs` e a tabela `autores` no banco já vinham prontas; o aluno escrevia o Model, o Controller, as rotas, a proteção por login e a busca.

A tabela abaixo mostra o que veio pronto e o que foi feito na prova:

| Parte | Já vinha pronta | Feita na prova |
|---|:---:|:---:|
| Registro, login e logout | ✅ | |
| Middleware `exigirLogin` | ✅ | |
| Cadastro de livros (Model, Controller, rotas, views) | ✅ | |
| Banco com as tabelas `users`, `livros` e `autores` | ✅ | |
| View `autores.ejs` | ✅ | |
| `models/autor.js` | | ✅ |
| `controllers/autorController.js` | | ✅ |
| `routes/autorRoutes.js` e montagem no `app.js` | | ✅ |
| Busca de autores por nome | | ✅ |

---

## Como rodar

**Pré-requisitos:** Node.js e MySQL instalados.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie o banco rodando o script `sql/schema.sql` no MySQL. Ele cria o banco `biblioteca` com as tabelas `users`, `livros` e `autores`.
3. Copie o arquivo de exemplo de configuração e preencha com os dados do seu MySQL:
   ```bash
   cp .env.example .env
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse `http://localhost:3000/register`, crie um usuário e faça login.

---

## Rotas da aplicação

| Método | Rota | O que faz | Precisa de login? |
|---|---|---|:---:|
| GET | `/register` | Formulário de cadastro de usuário | |
| POST | `/register` | Cria o usuário (senha com hash bcrypt) | |
| GET | `/login` | Formulário de login | |
| POST | `/login` | Faz login e cria a sessão | |
| POST | `/logout` | Encerra a sessão | |
| GET | `/livros` | Lista os livros | ✅ |
| GET | `/livros/novo` | Formulário de novo livro | ✅ |
| POST | `/livros` | Cadastra um livro | ✅ |
| POST | `/livros/:id/delete` | Exclui um livro | ✅ |
| GET | `/autores` | Lista os autores (aceita `?busca=texto`) | ✅ |
| POST | `/autores` | Cadastra um autor | ✅ |
| POST | `/autores/:id/delete` | Exclui um autor | ✅ |

Também existem rotas de exercícios anteriores da disciplina: `/sobre` e `/api/livros` (lista de livros lida do arquivo `livros.json`).

---

## Estrutura do projeto

```
biblioteca-autores/
├── app.js                       # configura o Express, a sessão e monta as rotas
├── config/database.js           # conexão (pool) com o MySQL
├── middleware/exigirLogin.js    # bloqueia rotas para quem não está logado
├── models/
│   ├── user.js
│   ├── livro.js
│   └── autor.js                 # ← feito na prova
├── controllers/
│   ├── authController.js
│   ├── livroController.js
│   └── autorController.js       # ← feito na prova
├── routes/
│   ├── authRoutes.js
│   ├── livroRoutes.js
│   └── autorRoutes.js           # ← feito na prova
├── views/                       # páginas EJS (login, registro, livros, autores)
├── sql/schema.sql               # criação do banco e das tabelas
└── .env.example                 # modelo das variáveis de ambiente
```

---

## Enunciado da AV1 (resumo)

**Objetivo:** acrescentar à aplicação um cadastro de autores (listar, cadastrar, excluir e buscar por nome), acessível só para usuários logados.
**Duração:** 3 horas, com consulta ao material da disciplina.

### O que o aluno precisava construir

**Model — `models/autor.js`**
- `getAll()`: lista todos os autores em ordem de nome.
- `create(nome, nacionalidade)`: insere um autor usando placeholders `?`.
- `remove(id)`: exclui pelo `id`, usando placeholder `?`.
- Funções `async`, usando o `pool` de `config/database.js`.

**Controller — `controllers/autorController.js`**
- `list`: busca os autores e renderiza a view `autores` com três variáveis: `autores`, `busca` e `username`.
- `create`: lê os dados do formulário (`req.body`), grava e redireciona para `/autores`.
- `remove`: exclui pelo `req.params.id` e redireciona para `/autores`.
- Todas com `try/catch`, respondendo status 500 em caso de erro.

**Rotas — `routes/autorRoutes.js` e `app.js`**
- Router com `GET /`, `POST /` e `POST /:id/delete`, todas protegidas pelo middleware `exigirLogin`.
- Montagem do router em `/autores` no `app.js`, antes da rota de página não encontrada (404).

**Busca por nome**
- O texto digitado chega em `req.query.busca`.
- No Model, a consulta usa `LIKE ?` com placeholder (ex.: `clar` encontra "Clarice Lispector"), **nunca** concatenando o texto no SQL, para evitar SQL injection.
- Sem busca, a lista mostra todos os autores.

### Teste final esperado

1. Sem login, `/autores` redireciona para `/login`.
2. Logado, `/autores` mostra "Olá, …" e "Nenhum autor encontrado."
3. Ao cadastrar dois autores (um sem nacionalidade), os dois aparecem em ordem de nome.
4. Buscar parte de um nome mostra só ele; buscar algo inexistente mostra "Nenhum autor encontrado."
5. Excluir um autor faz ele sumir da lista.
6. A página de livros continua funcionando.
7. Depois de sair (logout), `/autores` volta a levar para o login.

### Critério de avaliação (10 pontos)

| Requisito | Nota |
|---|---:|
| Model: `getAll` com `pool` e `async/await` | 1,0 |
| Model: `create` com placeholders `?` | 1,0 |
| Model: `remove` com placeholder `?` | 1,0 |
| Controller: `list` renderiza com `autores`, `busca` e `username` | 1,0 |
| Controller: `create` lê `req.body`, grava e redireciona | 1,0 |
| Controller: `remove` usa `req.params.id`; `try/catch` nas três funções | 1,0 |
| Router com caminhos relativos, montado em `/autores` | 1,0 |
| Rotas protegidas por `exigirLogin` | 1,0 |
| Busca: `req.query.busca` chega ao Model | 1,0 |
| Busca: `LIKE ?` com placeholder, sem concatenar texto no SQL | 1,0 |
| **Total** | **10,0** |
