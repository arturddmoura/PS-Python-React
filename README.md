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

Exemplo de insert para os jogos:

    INSERT INTO products (id, name, price, score, image)
    VALUES
        ('64e9d180-0f02-49d5-b094-7652176119b5', 'Super Mario Odyssey', 197.88, 100, 'super-mario-odyssey.png'),
        ('80d8aa03-30a9-4727-a47a-fd695711df5b', 'Call Of Duty Infinite Warfare', 49.99, 80, 'call-of-duty-infinite-warfare.png'),
        ('07e334ae-0958-4789-b8f0-c7107a3d19f1', 'The Witcher III Wild Hunt', 119.5, 250, 'the-witcher-iii-wild-hunt.png'),
        ('7f8393e7-f062-4373-8dd4-3fc6627a4985', 'Call Of Duty WWII', 249.99, 205, 'call-of-duty-wwii.png'),
        ('c72eace4-4c80-4e40-9aba-e8ecbbdf0942', 'Mortal Kombat XL', 69.99, 150, 'mortal-kombat-xl.png'),
        ('66dcd6e9-3c7a-49c3-9d57-7f9080ababa9', 'Shards of Darkness', 71.94, 400, 'shards-of-darkness.png'),
        ('c764d3d9-a18a-4af6-bde9-a01261345075', 'Terra Média: Sombras de Mordor', 79.99, 50, 'terra-media-sombras-de-mordor.png'),
        ('16cb0824-2fb3-4ed6-af07-a24160e00fdd', 'FIFA 18', 195.39, 325, 'fifa-18.png'),
        ('9f8cebb7-a669-4aef-ae78-a324be2c5323', 'Horizon Zero Dawn', 115.8, 290, 'horizon-zero-dawn.png')

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
