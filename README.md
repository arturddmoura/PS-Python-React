# # Avaliação Python + React

# Como rodar o projeto utilizando docker

Para rodar o projeto utilizando o docker:

Crie um arquivo chamado .env na pasta backend, e adicione seu banco de dados PostgreSQL utilizando uma variável chamada DATABASE_URL.

Entre na pasta do backend e rode os seguintes comandos:

    docker build -t python-react-backend .
    docker run -p 8000:8000 python-react-backend

Entre na pasta do frontend e rode os seguintes comandos:

    docker build -t python-react-frontend .
    docker run -p 5173:5173 python-react-frontend

O projeto estará acessível em localhost:5173 e a api em localhost:8000.

# Como rodar o projeto localmente

Crie um arquivo chamado .env na pasta backend, e adicione seu banco de dados PostgreSQL utilizando uma variável chamada DATABASE_URL.

Entre na pasta do backend e rode os seguintes comandos:

    python -m venv venv
    Ative a venv
    pip install -r requirements.txt
    uvicorn main:app --host=0.0.0.0 --port=8000

Entre na pasta do frontend e rode os seguintes comandos:

    npm install
    npm run dev

O projeto estará acessível em localhost:5173 e a api em localhost:8000.

## Documentação da API

Após rodar o projeto, a documentação da API gerada pelo Swagger fica disponível em localhost:8000/docs.

Para o cadastro do usuário, foi criado o endpoint/user/create
Para o login do usuário, foi criado o endpoint user/login

Para adicionar produtos no carrinho, foi criado o endpoint /cart/add
Para remover produtos do carrinho, foi criado o endpoint cart/delete/{id}

Para ordenar os produtos por preço, foi criado o endpoint /products/list/price
Para ordenar os produtos por popularidade, foi criado o endpoint /products/list/score
Para ordenar os produtos por nome, foi criado o endpoint /products/list/name

Para o checkout do carrinho, foi criado o endpoint cart/checkout/{email}
Para a consulta dos pedidos feitos, foram criados dois endpoints, um para retornar o número dos pedidos, /orders/get/ e um para retornar a lista de produtos do pedido, /orders/get/{order_id}
