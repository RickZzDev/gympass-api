# App

Gympass like app.

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
- [ ] O check-in só pode ser validado 20 minutos após ter sido criado
- [x] o Usuário nao pode fazer o check-in se nao estiver a menos de 100m da academia
- [ ] O check-in só pode ser cadastrado por administradores
- [ ] A academia só pode ser cadastrada por administradores


## RNFs (Requisitos nao funcionais) 

- [X] A senha deve ser criptografada
- [X] Devemos usar um PGSQL
- [x] Todas listas de dados devem ser paginadas com vinte itens
- [ ] O usuário deve ser identificado por um JWT


## COMANDS

 - Prisma: 
    npx prisma init
    npx prisma generate
    npx prisma studio
    npx prisma migrate

 - Link Local Repo
   npm link (Inside local package)
   npm link {package_name}
