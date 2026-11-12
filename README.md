# Biblioteca da Turma — Autores (GABARITO da AV1)

> **Avaliação prática · AV1** — Desenvolvimento Web 2 · CMPDWE2 · TADS
> Node.js + Express + EJS + MySQL, em MVC, com login.
> Profa. Bianca Pedrosa · IFSP Campus Campinas · 2026.2

Este repositório contém a **resolução (gabarito)** da AV1. Abaixo está o enunciado completo da prova.

---

## Enunciado

**Duração:** 3 horas · **Consulta permitida:** todo o material do curso no Moodle (slides, revisão, gabarito da revisão e projetos de aula).

### Objetivo

Acrescentar à Biblioteca da Turma um **cadastro de autores**: listar, cadastrar, excluir e buscar por nome, só para usuários logados. O projeto inicial já traz login, registro, logout e o cadastro de livros funcionando, além da página de autores e da tabela no banco.

O projeto inicial é o **biblioteca-autores-starter.zip**, disponível no Moodle.

### 1. Preparação

1. `npm install`
2. Rode o `sql/schema.sql` no MySQL. Ele cria o banco `biblioteca` com as tabelas `users`, `livros` e a nova tabela `autores`:

   ```sql
   CREATE TABLE IF NOT EXISTS autores (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       nacionalidade VARCHAR(100)
   );
   ```

3. Copie `.env.example` para `.env` e coloque a senha do seu MySQL.
4. `npm start`, registre um usuário e faça login. Ao abrir `/autores` aparece "Página não encontrada": é essa parte que você vai construir.

### 2. A view (fornecida)

A página `views/autores.ejs` já está pronta. O Controller precisa entregar a ela:

- `autores`: array com `id`, `nome` e `nacionalidade`;
- `busca`: o texto buscado (ou `''` quando não houver busca);
- `username`: o nome do usuário logado (`req.session.user.username`).

> **Aviso:** mande sempre as três variáveis no `res.render`, senão a página dá `busca is not defined`. Enquanto não fizer a etapa da busca, use `busca: ''`:
>
> ```js
> res.render('autores', { autores, busca: '', username: req.session.user.username });
> ```

Formulários da página: o cadastro envia `nome` e `nacionalidade` por `POST /autores`; Excluir envia `POST /autores/<id>/delete`; a busca envia `GET /autores?busca=texto`.

### 3. O que você vai construir

**`models/autor.js`**

- `getAll()`: `SELECT` de todos os autores em ordem de nome.
- `create(nome, nacionalidade)`: `INSERT` com placeholders `?`.
- `remove(id)`: `DELETE` pelo `id`, com `?`.
- Funções `async` usando o `pool` de `config/database.js`. Exporte as três.

**`controllers/autorController.js`**

- `list`: busca no Model e renderiza `'autores'` com `autores`, `busca` e `username`.
- `create`: lê `req.body`, grava e redireciona para `/autores`.
- `remove`: exclui pelo `req.params.id` e redireciona para `/autores`.
- Todas `async` com `try/catch` (erro → status 500).

**`routes/autorRoutes.js` e `app.js`**

- `express.Router()` com `GET /autores`, `POST /autores` e `POST /autores/:id/delete`.
- Proteja todas as rotas com o middleware `exigirLogin` que já existe no projeto.
- No `app.js`, monte o router em `/autores`, no lugar indicado (antes do 404).

**Etapa final — busca por nome**

- Ao enviar o formulário de busca, a lista mostra só os autores cujo nome contém o texto digitado (ex.: `clar` encontra "Clarice Lispector").
- O texto chega em `req.query.busca`. No Model, use `LIKE` com placeholder `?`, nunca montando o SQL com o texto digitado.
- Sem busca, a lista mostra todos os autores.

### 4. Roteiro sugerido

| Etapa | O que fazer | Tempo |
|---|---|---:|
| 1. Preparação | Instalar, rodar o schema, criar o .env e fazer login | 15 min |
| 2. Model | `getAll`, `create` e `remove` | 25 min |
| 3. Controller | `list`, `create` e `remove` | 20 min |
| 4. Rotas e proteção | Router, `exigirLogin` e montagem no `app.js`; testar | 20 min |
| 5. Busca | `req.query.busca` + `LIKE ?` | 25 min |
| 6. Teste e entrega | Teste final e envio do .zip | 10 min |

Total sugerido: cerca de 2 horas.

### 5. Teste final

1. Sem login, `/autores` leva para `/login`.
2. Logado, `/autores` mostra "Olá, …" e "Nenhum autor encontrado."
3. Cadastre dois autores (um sem nacionalidade): os dois aparecem, em ordem de nome.
4. Busque parte de um nome: só ele aparece. Busque algo que não existe: "Nenhum autor encontrado."
5. Exclua um autor: ele some da lista.
6. A página de livros continua funcionando.
7. Clique em Sair e tente `/autores`: volta para o login.

### 6. Critério de avaliação

| Requisito | Nota |
|---|---:|
| Model: `getAll` com `pool` e `async/await` | 1,0 |
| Model: `create` com placeholders `?` | 1,0 |
| Model: `remove` com placeholder `?` | 1,0 |
| Controller: `list` (renderiza com `autores`, `busca` e `username`) | 1,0 |
| Controller: `create` (lê `req.body`, grava, redireciona) | 1,0 |
| Controller: `remove` (`req.params.id`) e `try/catch` nas três | 1,0 |
| Router com caminhos relativos, montado em `/autores` | 1,0 |
| Rotas protegidas por `exigirLogin` | 1,0 |
| Busca: `req.query.busca` chegando ao Model | 1,0 |
| Busca: `LIKE ?` com placeholder (sem concatenar o texto no SQL) | 1,0 |
| **Total** | **10,0** |

### 7. Entrega

Envie na tarefa **Avaliação 1** **um único .zip** do projeto, **sem** a pasta `node_modules` e **sem** o `.env`.

---

## Como rodar este gabarito

1. `npm install`
2. Rode o `sql/schema.sql` no MySQL (cria o banco `biblioteca` e as tabelas).
3. Copie `.env.example` para `.env` e preencha com os dados do seu MySQL.
4. `npm start` e acesse `http://localhost:3000/register`.

### Onde está a resolução

| Arquivo | O que tem |
|---|---|
| `models/autor.js` | `getAll` (com busca opcional via `LIKE ?`), `create` e `remove` |
| `controllers/autorController.js` | `list`, `create` e `remove`, com `try/catch` |
| `routes/autorRoutes.js` | Router com as três rotas protegidas por `exigirLogin` |
| `app.js` | Router montado em `/autores`, antes do 404 |
