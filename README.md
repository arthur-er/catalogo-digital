<div align="center">
  <h2><b>Catalogo Digital</b></h2>
  <p>Aplicação para gerenciamento de catalogos online, com pedidos via Whatsapp</p>
</div>

## **Pre-requisitos**

- Banco de dados PostgreSQL

## **Instalação**

Clone o repositório, altere o arquivo em `config/catalogo.ts` de acordo com sua prefêrencia. Você também pode alterar as cores da aplicação modificando o tema no arquivo `tailwind.config.js`

Copie o conteúdo do arquivo .env.example para um arquivo .env ou insira as variáveis de ambiente no seu sistema, alterando de acordo com a sua necessidade

Rode as migrations utilizando:

```bash
node ace migration:run
```

Em seguida crie um usuário para administrar a aplicação utilizando o comando:

```bash
node ace create:admin
```

Visite a rota `/dashboard` para acessar o painel de administrador e a rota `/` para a aplicação principal

A partir disso a aplicação funciona como qualquer outra aplicação utilizando AdonisJS, para fazer o deploy utilize como referência a [documentação de deploy](https://docs.adonisjs.com/guides/deployment) e para desenvolver utilize o comando `yarn dev` para rodar a aplicação
