Este é um sistema de gerenciamento de estoque de produtos. 
O projeto consiste em um back-end, desenvolvido com NodeJS, Express, Prisma e banco MySQL e um front-end, desenvolvido utilizando VueJS.

# Instalação do projeto 

## Backend
```
$ cd backend
# Crie o arquivo .env
$ cp .env.development .env
```
## Frontend
```
$ cd frontend
# Crie o arquivo .env
$ cp .env.development .env

```
## Docker
```
# No diretório principal da aplicação, faça o build dos containers Docker
$ docker-compose build

# Execute os containers
$ docker-compose up -d
```
## Configuração do banco
```
# Execute um terminal dentro do container do backend:
$ docker-compose exec backend bash

# Execute as migrations
$ npx prisma migrate dev

# Execute os seeds
$ npx prisma db seed
```
Após este processo, o frontend estará disponível em: http://localhost:8080 e o backend em http://localhost:3000.
O banco foi semeado com o usuário:
```
email: teste@teste.com
senha: teste
```

