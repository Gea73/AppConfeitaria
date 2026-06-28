# Sistema de Confeitaria

Aplicativo mobile de cardápio online para confeitaria, desenvolvido com React Native, Expo e Firebase.

O sistema permite que clientes visualizem produtos e realizem pedidos, enquanto o administrador gerencia o cardápio e acompanha os pedidos.

---

# Funcionalidades

## Área do Dono da Confeitaria

### Autenticação
- Login com usuário e senha
- Apenas usuários com função `ADMIN`

### Gerenciamento do Cardápio
- Adicionar item
- Editar item
- Remover item
- Listar itens

### Gerenciamento de Pedidos
- Visualizar pedidos
- Alterar status do pedido:
  - `PENDENTE`
  - `EM_PREPARO`
  - `ENTREGUE`

---

## Área do Cliente

### Autenticação
- Cadastro
- Login

### Cardápio
- Visualizar itens disponíveis

### Pedido
- Criar pedido
- Adicionar itens
- Editar quantidade
- Remover itens
- Finalizar pedido

### Acompanhamento
- Ver status do pedido

---

# Fluxo do Cliente

1. Cadastro
2. Login
3. Visualizar Cardápio
4. Criar Pedido
5. Adicionar Itens
6. Finalizar Pedido
7. Acompanhar Status do Pedido

---

# Fluxo do Admin / Dono da Confeitaria

1. Login
2. Gerenciar Cardápio
3. Visualizar Pedidos
4. Atualizar Status

---

# Estrutura do Projeto

```txt
src/
├── app/
│   ├── auth/
│   ├── user/
│   └── admin/
│   └── item/
│   └── order/
│
├── components/
│
├── services/
│   ├── firebase/
│   ├── auth/
│   └── firestore/
│
├── hooks/
│
├── contexts/
│
├── routes/
│
├── styles/
│
├── utils/
│
└── types/
```

---

# Estrutura do Banco de Dados

## Usuarios

| Campo | Tipo |
|---|---|
| uid | varchar |
| name | varchar |
| password_hash | varchar |
| role | varchar |
| createdAt | dateTime |


---

## Pedidos

| Campo | Tipo |
|---|---|
| uid | varchar |
| customerId | varchar |
| status | varchar |
| total | decimal |
| createdAt | dateTime |

---

## Itens

| Campo | Tipo |
|---|---|
| uid | varchar |
| name | varchar |
| description | varchar |
| price | decimal |
| imageUrl | varchar |
| createdAt | dateTime |

---

## Pedidos-Itens

| Campo | Tipo |
|---|---|
| uid | varchar |
| orderId | varchar |
| itemId | varchar |
| quantity | int |
| price | decimal |

