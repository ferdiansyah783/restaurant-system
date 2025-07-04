## Config
rename .env.example to .env

## Run Locally
docker-compose up --build

## Test API
GET http://localhost:3000/order/menu 
GET http://localhost:3000/order/1
POST http://localhost:3000/order


## Documentation

# 📟 OrderService - Restaurant Ordering API

OrderService is the main backend service for handling restaurant orders. It is built using **NestJS**, powered by **MySQL**, and integrates with other microservices via **RabbitMQ**. This service exposes REST APIs to:

- View the menu
- Place a new order
- Track order status

---

## 🚀 Base URL

```
http://localhost:3001
```

---

## 📦 API Endpoints

### 📋 GET `/order/menu`

Returns a list of available menu items.

#### ✅ Example Response:

```json
[
  { "id": 1, "name": "Nasi Goreng", "price": 20000 },
  { "id": 2, "name": "Ayam Bakar", "price": 25000 },
  { "id": 3, "name": "Es Teh", "price": 5000 }
]
```

#### 🧪 How to Test:

```bash
curl http://localhost:3001/order/menu
```

---

### 👎 POST `/order`

Places a new order with the customer's email and selected item IDs.

#### 📤 Request Body:

```json
{
  "customerEmail": "test@example.com",
  "items": [1, 2]
}
```

#### ✅ Example Response:

```json
{
  "orderId": "1",
}
```

#### 🧪 How to Test:

```bash
curl -X POST http://localhost:3001/order \
  -H "Content-Type: application/json" \
  -d '{"customerEmail":"test@example.com","items":[1,2]}'
```

---

### 🔍 GET `/order/:id`

Gets the current status of an order using its ID.

#### ✅ Example Response:

```json
{
  "id": "1",
  "customerEmail": "test@example.com",
  "status": "Processed",
  "items": [
    { "id": 1, "name": "Nasi Goreng", "price": 20000 }
  ]
}
```

#### 🧪 How to Test:

```bash
curl http://localhost:3001/order/<order_id>
```

Replace `<order_id>` with a valid order ID from the previous response.

---

## 🍽 Menu Seeder

On first application start, the following menu items will be seeded automatically if the menu table is empty:

- Nasi Goreng (Rp20,000)
- Ayam Bakar (Rp25,000)
- Es Teh (Rp5,000)

Check your logs:

```
✅ Menu data seeded.
```

---

## 🔗 RabbitMQ Events

OrderService publishes events to other microservices:

| Event                | Routing Key                    | Description                |
| -------------------- | ------------------------------ | -------------------------- |
| `order.process`      | Sent to `kitchen-service`      | Start processing the order |
| `order.confirmation` | Sent to `notification-service` | Send email confirmation    |

---

## ⚙️ Configuration (.env)

```
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=restaurant

RABBITMQ_URL=amqp://rabbitmq:5672
```

---

## 💠 Tech Stack

- **Framework**: NestJS
- **Database**: MySQL
- **Queue**: RabbitMQ
- **Transport**: REST (port 3001)

---

## 🧪 Testing Checklist

| Feature     | How to Test                               |
| ----------- | ----------------------------------------- |
| Get Menu    | `GET /order/menu` via browser or `curl`         |
| Place Order | `POST /order` with valid email & item IDs |
| Track Order | `GET /order/:id` with existing order ID   |

---

## 📁 Project Structure

```
apps/order-service/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   └── main.ts
├── public/         # (if serving static files)
├── .env
└── README.md
```

---

## 📄 License

MIT

