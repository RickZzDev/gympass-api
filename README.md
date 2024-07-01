# README: Gympass Clone Application

## Descrição do Projeto

Este projeto é um clone do Gympass, uma plataforma que oferece acesso a diversas academias e estúdios de fitness. O objetivo deste clone é proporcionar uma aplicação que permita aos usuários procurar e reservar aulas em diferentes academias. A aplicação foi desenvolvida utilizando Node.js, Fastify, Prisma, e inclui testes unitários e de ponta a ponta (E2E).

## Tecnologias Utilizadas

- **Node.js**: Plataforma JavaScript para construir aplicações de rede rápidas e escaláveis.
- **Fastify**: Framework web para Node.js que prioriza a eficiência e simplicidade.
- **Prisma**: ORM moderno para Node.js e TypeScript, que facilita o gerenciamento de banco de dados.
- **Vitest**: Framework de testes unitários para Node.js.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em containers.
- **Testes**:
  - **Unitários**: Testes que validam a funcionalidade de componentes individuais do sistema.
  - **E2E (End-to-End)**: Testes que validam o comportamento do sistema de ponta a ponta, simulando interações do usuário.

## Instalação

Para começar a utilizar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/gympass-clone.git
   cd gympass-clone
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```env
     DATABASE_URL="seu_url_do_banco_de_dados"
     ```

4. **Rode as migrações do Prisma para criar as tabelas no banco de dados:**
   ```sh
   npx prisma migrate dev
   ```

5. **Inicie o servidor:**
   ```sh
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:3000`.


## Testes

### Testes Unitários

Os testes unitários estão localizados na pasta `tests/unit`. Para rodá-los, utilize o comando:

```sh
npm run test:unit
```

### Testes E2E

Os testes E2E estão localizados na pasta `tests/e2e`. Para rodá-los, utilize o comando:

```sh
npm run test:e2e
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. **Fork o repositório**
2. **Crie uma branch para sua feature ou correção:**
   ```sh
   git checkout -b minha-nova-feature
   ```
3. **Commit suas mudanças:**
   ```sh
   git commit -m 'Adiciona nova feature'
   ```
4. **Faça push para a branch:**
   ```sh
   git push origin minha-nova-feature
   ```
5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ♥ por Carlos Novais (RickZzDev).

# RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil
- [x] Deve ser possível obter o número de check-ins do usuário
- [x] Deve ser possível obter o hisórico de check-ins
- [x] Deve ser possível buscar academias próximas
- [x] Deve ser possível buscar academias pelo nome
- [x] Deve ser possível realizar o check-in
- [x] Deve ser possível validar o check-in
- [x] Deve ser possível cadastrar uma academia


## RNs (Regras de negócios)

- [X] O Usuário nao deve poder se cadatrar com um e-mail duplicado
- [x] O Usuário nao pode fazer 2 check-ins no mesmo dia
- [x] O check-in só pode ser validado 20 minutos após ter sido criado
- [x] o Usuário nao pode fazer o check-in se nao estiver a menos de 100m da academia
- [x] O check-in só pode ser cadastrado por administradores
- [x] A academia só pode ser cadastrada por administradores


## RNFs (Requisitos nao funcionais) 

- [X] A senha deve ser criptografada
- [X] Devemos usar um PGSQL
- [x] Todas listas de dados devem ser paginadas com vinte itens
- [x] O usuário deve ser identificado por um JWT


## COMANDS

 - Prisma: 
    npx prisma init
    npx prisma generate
    npx prisma studio
    npx prisma migrate

 - Link Local Repo
   npm link (Inside local package)
   npm link {package_name}

## Sign


```
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠞⣿⠀⠀⠀⠀
⣀⣀⣀⣀⣀⣸⣿⣿⣷⣄⣀⣄⣄⣠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⡴⠋⠀⣸⣧⣤⣤⣤⣤
⣿⠉⣉⣉⣉⣉⣹⣿⣿⣿⣿⣄⣀⣀⣀⣈⣉⣉⣉⣉⠉⢁⣁⣀⣀⣀⣉⣉⣉⣉⣉⡽⠋⠀⠀⣠⣟⣀⣀⣀⠀⣿
⣿⠀⡿⣿⣯⡉⠉⠙⣿⣿⣿⣿⣯⡉⠉⠉⠉⠉⠉⣿⠀⢸⡏⠉⠉⠉⠉⠉⢉⡽⠋⠀⠀⢀⣴⠋⣩⡿⢻⣿⠀⣿
⣿⠀⡇⠘⣿⣿⣷⣄⡈⠛⢿⣿⣿⡇⣶⣄⠀⠀⠀⣿⠀⢸⡇⠀⠀⠀⢀⡴⢻⡇⠀⢀⣴⢟⡵⠟⠁⢀⡾⢸⠀⣿
⣿⠀⡇⠀⠹⣿⣿⣿⣿⣶⣄⡙⢿⡇⣿⣿⣷⣄⠀⣿⠀⢸⡇⠀⢀⡴⠋⠀⢸⣇⣴⡿⠟⠉⠀⠀⢀⣼⠃⢸⡀⣿
⣿⠀⣷⣶⣦⣌⡛⢿⣿⣿⣿⣧⢰⣅⠻⣿⣿⣿⣷⣿⠀⢸⣇⠴⠋⠀⠀⣠⣾⠟⣿⠇⠀⢀⣠⣾⠿⠓⠋⢩⡇⣿
⣿⠀⡟⢿⣿⣿⣿⣶⣌⡻⢿⣿⣸⣿⣷⣌⠻⣿⣿⣿⣧⣾⡇⠀⢀⣴⣾⠟⠁⢰⣿⣠⣴⡿⠛⠁⠀⠀⣠⢿⠀⣿
⣿⠀⣇⠀⠙⠿⣿⣿⣿⣿⣇⢉⡙⢿⣿⣿⣧⠈⣹⠟⠁⣿⣇⣴⣿⠟⠁⠀⣠⣾⢿⣿⠉⠀⠀⣀⣴⣾⡧⣼⠀⣿
⣿⠀⣿⣿⣶⣦⣌⠛⠿⣿⣿⡜⣿⣦⡻⠋⣡⠎⠀⠀⢀⣿⣿⡏⠁⠀⣠⡾⠟⠁⣼⡇⣀⣴⣾⠿⠛⠁⢀⣿⡅⣿
⣿⠀⣿⣿⣿⣿⣿⣿⣦⡈⠙⠃⠹⣿⡿⢸⠃⠀⣠⣾⠿⢋⣿⠃⣠⡾⠋⠀⠀⣠⣿⣿⡿⠋⠀⠀⠀⢀⡞⢹⠂⣿
⣿⠀⠿⠿⠿⢿⣿⣿⣿⣷⡌⢿⣦⣽⣷⡏⢀⣴⠟⠁⠀⢸⣿⡿⠋⠀⠀⣠⡾⠟⢩⣿⠃⠀⠀⢀⡴⣛⣛⣿⡁⣿
⣿⠀⣰⣶⣦⣤⣙⣻⣿⣿⣷⡘⣿⣿⣿⣷⡿⠋⠀⢀⣴⢿⣿⠀⢀⣴⠾⠋⠀⢀⣿⡏⣠⣴⣾⡿⠟⠉⢀⣾⠀⣿
⣿⠀⡟⢻⣿⣿⣿⣿⣭⣉⠙⠃⠘⢿⣿⡏⠀⢀⣴⠟⠁⣸⣿⣾⡟⠁⠀⠀⣀⣼⣿⣿⡿⠛⠁⠀⠀⢠⡞⢹⠀⣿
⣿⠀⡇⠀⠙⢿⣿⣿⣿⣿⣆⢲⣤⣄⣹⢁⣴⠟⠁⢀⣴⠟⢻⣿⠀⢀⣤⣾⡿⠛⣹⡟⠀⠀⢀⣠⣴⣋⣀⢸⠀⣿
⣿⠀⣧⣴⣦⣤⣈⡙⠻⣿⣿⡌⣿⣿⣿⡿⠋⢀⣴⠟⠃⢀⣿⣷⣾⠿⠋⠁⠀⢠⣿⣣⣴⠾⠛⠋⠉⣹⠏⢸⡄⣿
⣿⠀⣿⠈⠻⣿⣿⣿⣷⣦⡈⠁⠘⠻⣿⠀⣠⡾⠃⢀⣴⣿⣿⡟⠁⠀⣀⣴⣾⣿⣿⠟⠁⠀⠀⢀⡼⠃⠀⢸⠆⣿
⣿⠀⣿⠀⠀⠈⠻⣿⣿⣿⣿⡌⢿⣷⣿⡾⠋⢀⣴⠟⠉⢸⣿⣠⣶⡿⠟⠛⠉⣼⡏⢀⣠⣤⣶⠿⠶⣶⠀⢸⡀⣿
⣿⠀⣿⠰⣿⣿⣶⣦⣌⡉⠛⠻⠈⢿⡏⢀⡴⠟⠁⣠⣴⣿⣿⡟⠉⠀⠀⣀⣸⣿⣾⠿⠛⠉⠀⣀⡾⠃⠀⢸⠀⣿
⣿⠀⣿⠀⠈⠛⢿⣿⣿⣿⣿⣦⢠⣼⡷⢋⣠⣶⡿⠟⠋⣽⣏⣀⣤⣶⣿⠿⢻⣿⠁⠀⣀⣤⠾⠋⠀⠀⠀⢸⡀⣿
⣿⠀⡇⠀⠀⠀⢠⣬⣉⡛⠿⢿⣧⣹⣶⡿⠛⠉⢀⣠⣴⣿⠿⠟⠋⠁⠀⣠⣿⣷⠶⠛⠛⢋⡿⠁⠀⠀⠀⢸⡇⣿
⣿⠀⢷⣄⡀⠀⠈⠻⣿⣿⣿⣶⣦⡟⠉⣀⣤⠶⠛⢉⣿⠇⣀⣠⡴⠶⠛⣽⡟⠀⠀⢀⣠⠟⠀⠀⠀⣀⣤⡾⠃⣿
⠻⢦⣄⡈⠛⠶⣤⣀⠈⠙⠛⠿⣿⡷⠟⠋⢀⣠⣴⣿⡿⠛⠉⠁⣀⣠⣾⣿⣴⡶⠿⢯⣤⣀⣤⡶⠟⠋⣁⣤⡶⠟
⠀⠀⠉⠻⢶⣤⣈⠙⠳⣿⣿⣷⣏⣤⣴⠾⠛⠉⣠⣿⣣⣴⡶⠿⣻⡿⠋⠉⠀⠀⢀⣴⠿⠛⢁⣠⡴⠞⠋⠁⠀⠀
⠀⠀⠀⠀⠀⠈⠙⠷⣦⣄⣽⠿⠋⠉⠀⢀⣠⣾⣿⣯⣭⣤⣤⣾⣿⣤⣤⣤⣶⣾⣿⣤⣴⠾⠋⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠁⣀⣤⡶⠛⠻⣯⣄⣿⠀⠀⣿⣩⣴⠾⠛⢉⣬⣿⠿⠿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⣯⡵⠞⠋⠁⠈⠛⠷⣦⣄⠉⠛⠀⠀⠛⢉⣠⣴⠾⠛⠉⠀⠀⠀⠀⠈⠙⠻⠦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢶⣤⣴⡾⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀





__________.__        __    __________        ________               
\______   \__| ____ |  | __\____    /________\______ \   _______  __
 |       _/  |/ ___\|  |/ /  /     / \___   / |    |  \_/ __ \  \/ /
 |    |   \  \  \___|    <  /     /_  /    /  |    `   \  ___/\   / 
 |____|_  /__|\___  >__|_ \/_______ \/_____ \/_______  /\___  >\_/  
        \/        \/     \/        \/      \/        \/     \/      


```
 
