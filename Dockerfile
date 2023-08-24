# Use a imagem oficial do Node.js como base
FROM node:14

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package*.json tsconfig.json ./
COPY src ./src
COPY data ./data

# Instale as dependências
RUN npm install

# Compile o TypeScript
RUN npm run build

# Exponha a porta em que a aplicação vai rodar (se necessário)
# EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["node", "./dist/main.js"]
