# 📚 Biblioteca Digital - Frontend

Um sistema de gerenciamento de biblioteca digital desenvolvido em React com TypeScript, consumindo uma API REST .NET.

## 🚀 Funcionalidades

### Gêneros Literários
- ✅ Listagem de gêneros
- ✅ Criação de novos gêneros
- ✅ Edição de gêneros existentes
- ✅ Exclusão de gêneros

### Autores
- ✅ Listagem de autores
- ✅ Criação de novos autores
- ✅ Edição de autores existentes
- ✅ Exclusão de autores
- ✅ Informações de biografia e data de nascimento

### Livros
- ✅ Listagem de livros
- ✅ Criação de novos livros
- ✅ Edição de livros existentes
- ✅ Exclusão de livros
- ✅ Seleção de autor e gênero
- ✅ Validação de ISBN
- ✅ Informações completas (título, ISBN, ano, sinopse)

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Formik + Yup** - Formulários e validação
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado
- **Vitest + React Testing Library** - Testes unitários

## 📁 Estrutura do Projeto

```
src/
├── api/
│   └── axios.ts                 # Configuração do Axios com interceptors
├── components/
│   ├── __tests__/               # Testes unitários
│   ├── ConfirmDialog.tsx        # Diálogo de confirmação
│   ├── LoadingSpinner.tsx       # Componente de loading
│   └── NotificationContainer.tsx # Sistema de notificações
├── environments/
│   └── config.ts                # Configuração de ambientes
├── models/
│   └── types.ts                 # Tipos TypeScript
├── pages/
│   ├── autores/                 # Páginas de autores
│   ├── generos/                 # Páginas de gêneros
│   └── livros/                  # Páginas de livros
├── services/
│   ├── autorService.ts          # Serviços de autores
│   ├── generoService.ts         # Serviços de gêneros
│   └── livroService.ts          # Serviços de livros
├── store/
│   └── useNotificationStore.ts  # Store de notificações
└── App.tsx                      # Componente principal
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd desafio-wa-fenix-frontend

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:5173
```

### Build de Produção
```bash
# Gere o build de produção
npm run build

# Visualize o build
npm run preview
```

### Testes
```bash
# Execute os testes
npm test

# Execute os testes com UI
npm run test:ui

# Execute os testes com cobertura
npm run test:coverage
```

### Linting
```bash
# Execute o linter
npm run lint
```

## ⚙️ Configuração

### Ambientes
O projeto suporta diferentes ambientes através do arquivo `src/environments/config.ts`:

- **Development**: `https://localhost:7229/api/v1`
- **Production**: `https://api.seudominio.com/api/v1`
- **Test**: `https://localhost:7229/api/v1`

### API Endpoints
O frontend consome os seguintes endpoints da API:

#### Gêneros
- `GET /api/v1/generos` - Listar todos
- `GET /api/v1/generos/{id}` - Buscar por ID
- `POST /api/v1/generos` - Criar novo
- `PUT /api/v1/generos/{id}` - Atualizar
- `DELETE /api/v1/generos/{id}` - Excluir

#### Autores
- `GET /api/v1/autores` - Listar todos
- `GET /api/v1/autores/{id}` - Buscar por ID
- `POST /api/v1/autores` - Criar novo
- `PUT /api/v1/autores/{id}` - Atualizar
- `DELETE /api/v1/autores/{id}` - Excluir

#### Livros
- `GET /api/v1/livros` - Listar todos
- `GET /api/v1/livros/{id}` - Buscar por ID
- `POST /api/v1/livros` - Criar novo
- `PUT /api/v1/livros/{id}` - Atualizar
- `DELETE /api/v1/livros/{id}` - Excluir
- `GET /api/v1/livros/autor/{autorId}` - Buscar por autor
- `GET /api/v1/livros/genero/{generoId}` - Buscar por gênero

## 🎨 Características da Interface

### Design System
- Interface limpa e moderna
- Design responsivo (mobile-first)
- Animações suaves
- Feedback visual para ações do usuário

### Componentes Reutilizáveis
- **LoadingSpinner**: Indicador de carregamento
- **ConfirmDialog**: Diálogos de confirmação
- **NotificationContainer**: Sistema de notificações
- **Formulários**: Com validação integrada

### Validações
- **Gêneros**: Nome obrigatório (2-100 chars), descrição opcional
- **Autores**: Nome obrigatório (2-100 chars), biografia opcional, data válida
- **Livros**: Título obrigatório, ISBN válido, ano válido, autor e gênero obrigatórios

## 🧪 Testes

O projeto inclui testes unitários para componentes principais:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes com cobertura
npm run test:coverage
```

### Cobertura de Testes
- Componentes reutilizáveis
- Validação de props
- Interações do usuário
- Estados de loading e erro

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🔧 Boas Práticas Implementadas

### Código
- ✅ TypeScript para tipagem estática
- ✅ Componentes funcionais com hooks
- ✅ Separação de responsabilidades
- ✅ Código limpo e legível
- ✅ Tratamento de erros robusto

### Arquitetura
- ✅ Estrutura modular
- ✅ Serviços para comunicação com API
- ✅ Store centralizado para estado global
- ✅ Interceptors para tratamento de erros
- ✅ Configuração de ambientes

### UX/UI
- ✅ Feedback visual para ações
- ✅ Estados de loading
- ✅ Validação em tempo real
- ✅ Confirmações para ações destrutivas
- ✅ Notificações de sucesso/erro

### Testes
- ✅ Testes unitários
- ✅ Testes de componentes
- ✅ Cobertura de código
- ✅ Mocks para APIs

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor web estático.

### Variáveis de Ambiente
Para produção, configure as variáveis de ambiente necessárias:

```env
VITE_API_URL=https://api.seudominio.com
VITE_API_VERSION=v1
```

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando React e TypeScript.

**Melhorias futuras:**
- [ ] Adicionar autenticação JWT
- [ ] Implementar tema escuro
- [ ] Adicionar busca e filtros
- [ ] Melhorar responsividade mobile
- [ ] Adicionar testes de integração
