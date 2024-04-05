

## Sobre:

`Rotas abertas:`

1. POST /signUp --- Criação de usuário na DB. 
2. POST /auth/login --- Login do usuário, este que receberá um retorno: token(JWT).
   
`Rotas autenticadas:` 

1. GET /category --- Recebimento de todas categorias disponíveis na DB
2. GET /product --- Recebimendo de todos produtos disponíveis na DB
3. GET /product/:id --- Recebimendo do produto de acordo com o Id na DB
4. POST /product --- Criação de um produto na DB
5. PATCH /product/:id --- Atualização de um produto na DB
6. DELETE /product/:id --- Remoção de um produto na DB

`Principais tecnologias/bibliotecas/frameworks:`

1. Typescript - Para tipagem estática, interfaces e classes. Em outras palavras, para maior segurança e previsibilidade.
2. Bcrypt - Criptografia para armazenar senhas com segurança usando funções hash e salt.
3. Node - Um ótimo ambiente de tempo de execução para criar aplicativos do lado do servidor escaláveis e eficientes com JS.
4. joi - É uma biblioteca de validação de dados que facilita a leitura do código e evita a adição de erros ou bugs no banco de dados.
5. JWT - Para autenticação de usuário segura e escalável.
6. MongoDB - Flexibilidade de esquema e suporte para operações em tempo real em dados não estruturados e semi-estruturados.
7. Mongoose - Solução direta e baseada em esquemas para modelagem de dados de aplicativos.

## Como carregar o dump de desenvolvimento (opcional):

1. No diretório aonde está o dump (Menu---API), abra o terminal.
2. Digite o seguinte comando:
   
```bash
mongorestore --db Menu dump/Menu
```

## Como executar em desenvolvimento:

1. Clone este repositório.
2. Instale todas as dependências.

```bash
npm i
```

3. Configure o arquivo `.env` usando o `.env.example`.

4. Se houver nescessidade de criação da `dist`, utilize: `npx tsc`

5. Inicie o servidor `mongo`, por exemplo: `mongod --dbpath ~/.mongo`

6. Execute o back-end em um ambiente de desenvolvimento:

```bash
npm run watch, npm run redist ou npm run dev(caso tenha a pasta dist)
```

## Como carregar o dump de teste (opcional):

1. No diretório aonde está o dump (Menu---API), abra o terminal.
2. Digite o seguinte comando:
   
```bash
mongorestore --db Menu-test dump/Menu-test
```

## Como executar testes:

1. Configure o arquivo `.env.test` usando o `.env.example`.

2. Execute os testes em um ambiente de desenvolvimento:

```bash
npm run test
```

## Informações do banco:

1. Database name utilizada foi `Menu`, está pode ser definida e alterada no `.env`
2. Foi divida em 3 collections, caso nescessário poderiam ser mais (como a que pode armazenar token do user criptografado):

`collections:`

1. users

```
_id: 6431d9b9e726c78255caaf45
email: exemple@testemail.com
password: 123123
```

2. categories

```
_id: alcoolicas
parent: bebidas
name: Bebidas Alcoólicas
```

3. products

```
_id: "642fc0da7e293a2cce660615"
categories: [{
        "_id": "alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Alcoólicas"
      }]
name: Vinho Seco
qty: 30
price: 20.4
```

## Formato dos envios/retornos:

`POST /signUp`

1. Envio

```
{
    "email": "admin@gmail.com",
    "password": "admin12"
}
```

2. Retorno

```
{
  "user": "User \"admin@gmail.com\" created!"
}
```

`POST /auth/login`

1. Envio

```
{
    "email": "admin@gmail.com",
    "password": "admin12"
}
```

2. Retorno

Em formato Bearer Token, deve ser enviado no header. Tem duração de 1h.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMyZjZjOTI2ZTIyMDI4OTM3MzhhNGEiLCJpYXQiOjE2ODEwNjI5NzksImV4cCI6MTY4MTA2NjU3OX0.bHQZRoDiOYY-6h_IvMGmtdVYuNtzyRGMXNGBTisKHnk"
}
```

`GET /category`

1. Retorno

```
[
  {
    "_id": "bebidas",
    "parent": null,
    "name": "Bebidas"
  },
  {
    "_id": "alcoolicas",
    "parent": "bebidas",
    "name": "Bebidas Alcoólicas"
  },
  {
    "_id": "nao-alcoolicas",
    "parent": "bebidas",
    "name": "Bebidas Não Alcoólicas"
  },
  {
    "_id": "comidas",
    "parent": null,
    "name": "Comidas"
  }
]
```

`GET /product`

1. Retorno

```
  {
    "_id": "642fc0da7e293a2cce660615",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Vinho Seco",
    "qty": 30,
    "price": 20.4,
    "__v": 0
  },
  {
    "_id": "64307f885b2e3e38560351da",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Vinho Tinto",
    "qty": 40,
    "price": 40.4,
    "__v": 0
  },
  {
    "_id": "64308040d0ce999029ae3774",
    "categories": [
      [
        {
          "_id": "comidas",
          "parent": null,
          "name": "Comidas"
        }
      ]
    ],
    "name": "Pizza",
    "qty": 16,
    "price": 10,
    "__v": 0
  }
```

`GET /product/:id`

1. Retorno

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "comidas",
        "parent": null,
        "name": "Comidas"
      }
    ]
  ],
  "name": "Vinho Seco",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

`POST /product`

1. Envio

```
{
  "categories": [
      {
        "_id": "alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Alcoólicas"
      }
  ],
  "name": "Vinho de Cereja",
  "qty": 30,
  "price": 20.40
}
```
2. Retorno

```
{
  "categories": [
    [
      {
        "_id": "alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Alcoólicas"
      }
    ]
  ],
  "name": "Vinho de Cereja",
  "qty": 30,
  "price": 20.4,
  "_id": "6432ff9d69884021ee295254",
  "__v": 0
}
```

`PATCH /product/:id`

O envio de PATCH é bem diverso. Um campo não depende do outro para ser atualizado, sendo assim, você pode enviar apenas o "price", "qty", "categories", "categories.name", "name" e afins, por exemplo, e assim a estrutura será atualizada! Cada estrutura de atualização é independente!

1. Original

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "comidas",
        "parent": null,
        "name": "Comidas"
      }
    ]
  ],
  "name": "Vinho Seco",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

2. Envio

```
{
  "categories": [
      {
        "_id": "nao-alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Não Alcoólicas"
      }
  ],
  "name": "Água mineral"
}
```
3. Retorno

```
{
  "_id": "642fc0da7e293a2cce660615",
  "categories": [
    [
      {
        "_id": "nao-alcoolicas",
        "parent": "bebidas",
        "name": "Bebidas Não Alcoólicas"
      }
    ]
  ],
  "name": "Água mineral",
  "qty": 30,
  "price": 20.4,
  "__v": 0
}
```

`DELETE /product/:id`

1. Retorno

```
{
  "deletedCount": "Product with id 642fc0da7e293a2cce660615 has been deleted"
}
```
