# Sistema de Solicitação do Lavador - DCML

Sistema para gerenciamento de solicitações de lavagem, desenvolvido para a DCML. O sistema permite o controle e acompanhamento em tempo real das solicitações de lavagem de peças e componentes.

## 🚀 Funcionalidades

- **Gestão de Solicitações**
  - Cadastro de novas solicitações de lavagem
  - Edição e exclusão de solicitações existentes
  - Acompanhamento em tempo real do status
  
- **Sistema de Prioridades**
  - Urgente
  - Importante
  - Normal

- **Status de Lavagem**
  - Aberto (status inicial automático)
  - Em Lavagem
  - Encerrado

- **Recursos Adicionais**
  - Interface responsiva (desktop e mobile)
  - Atualização em tempo real via WebSocket
  - Capitalização automática de textos
  - Filtros por status de lavagem

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js
- Socket.IO Client
- React Router DOM
- CSS Modules
- Vite (build tool)

### Backend
- Node.js
- Express
- Socket.IO
- Prisma ORM
- MongoDB

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB instalado e rodando
- Git

### Passos para Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Backend Setup:
```bash
cd backend
npm install
# Configure o arquivo .env com suas variáveis de ambiente
# Exemplo:
# DATABASE_URL="mongodb://localhost:27017/lavador"
# PORT=3000

# Execute as migrações do Prisma
npx prisma generate
npx prisma db push

# Inicie o servidor
npm start
```

3. Frontend Setup:
```bash
cd frontend
npm install
# Configure o arquivo .env se necessário
npm run dev
```

## 🚀 Uso

1. Acesse o sistema através do navegador (padrão: http://localhost:5173)
2. Na página inicial:
   - Visualize solicitações com status "Aberto"
   - Adicione novas solicitações (status inicial será "Aberto")
   
3. No Menu:
   - Gerencie todas as solicitações
   - Edite status, prioridades e demais informações
   - Visualize solicitações "Aberto" e "Em Lavagem"

## 🔧 Estrutura do Projeto

### Frontend
```
frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── Routes/         # Páginas e rotas
│   ├── services/       # Serviços e API
│   └── contexts/       # Contextos React
```

### Backend
```
backend/
├── prisma/            # Schemas e migrações
├── routes/            # Rotas da API
├── generated/         # Arquivos gerados
└── server.js         # Entrada da aplicação
```

## 👥 Contato e Suporte

Para dúvidas, suporte ou informações comerciais:
- Email: isac.lima@dcml.com.br
- Departamento: DCML

## 📄 Licença

© 2024 DCML. Todos os direitos reservados.

---

Desenvolvido com ❤️ pela equipe DCML
