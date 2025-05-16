# Guia de Inicialização do Backend

Configuração do backend do Dashboard, desenvolvido com **NestJS**, **Gemini API**, **PrismaORM** e **PostgreSQL** .

## Pré-requisitos

- **Node.js**: Versão 18.x ou superior. Verifique com `node -v`.
- **Docker**: Instalado e em execução no computador.

## Configuração

Siga os passos abaixo a partir da raiz do repositório:

1. **Navegar ao Diretório do Backend**  
   Acesse a pasta do backend:

   ```bash
   cd backend
   ```

2. **Iniciar o Container PostgreSQL**  
   Com o Docker aberto no computador, inicie o container do banco de dados:

   ```bash
   docker-compose up
   ```

   _Nota_: O container pode demorar alguns minutos para ficar pronto e o banco de dados PostgreSQL estar disponível. Verifique os logs no terminal para confirmar.

3. **Instalar Dependências**  
   Instale as dependências do projeto:

   ```bash
   npm i
   ```

4. **Configurar Variáveis de Ambiente**  
   Renomeie o arquivo de exemplo para `.env`:

   ```bash
   mv .env.example .env
   ```

   No arquivo `.env`, insira a chave `GEMINI_API_KEY`, obtida no [Google AI Studio](https://aistudio.google.com/app/apikey). Verifique se outras variáveis, como `DATABASE_URL`, estão corretas.

5. **Executar Migrações do Banco de Dados**  
   Com o container PostgreSQL ativo, aplique as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. **(Opcional) Popular o Banco de Dados**  
   Execute o script de seed para preencher o banco com dados iniciais:

   ```bash
   npm run seed
   ```

7. **Construir a Aplicação**  
   Gere a build do backend:

   ```bash
   nest build
   ```

8. **Iniciar o Backend**  
   Rode a aplicação:
   ```bash
   node dist/src/main
   ```
