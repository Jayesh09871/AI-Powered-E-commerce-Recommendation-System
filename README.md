# AI-Powered E-commerce Recommendation System

## Product Requirement Document (PRD) – GenAI Only

### 1. Objective
Build a Generative AI–based Recommendation System for an e-commerce platform using:
- Vector Embeddings
- LangChain
- LangGraph
- Semantic Search
- LLM-based reasoning

**No traditional ML models or model training pipelines should be used.**

### 2. Key Features
- Product similarity suggestions using embeddings
- Personalized recommendations based on user behavior
- Real-time product suggestions on product pages and cart
- Lightweight user profile (preferences + browsing history)
- LLM-based ranking using LangChain
- Optional admin dashboard for performance insights

### 3. User Stories
- As a user, I want to see similar products on the product page.
- As a user, I want recommendations based on my browsing and purchase behavior.
- As an admin, I want to monitor recommendation performance and system logs.

### 4. Technical Requirements

**Frontend**
- React.js
- API integration for recommendation endpoints

**Backend**
- Node.js + Express
- MongoDB (products + user data)
- Qdrant or Pinecone (vector DB)
- LangChain + LangGraph (AI agents & workflows)
- OpenAI embeddings + LLM

**AI Components**
- Embeddings for product description & metadata
- Vector similarity search
- LLM-based contextual ranking
- No ML model training (strictly GenAI)

### 5. System Workflow

**(A) Product Ingestion**
- Store product metadata
- Generate embeddings using OpenAI
- Save vectors in Qdrant/Pinecone with metadata

**(B) User Activity Tracking**
- Track: product views, cart items, purchases
- Update lightweight preference profile

**(C) Recommendation Flow**
1. Retrieve similar products through vector similarity
2. Merge results with user profile preferences
3. Use LLM to produce the final ranked recommendations

### 6. APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /recommend/similar/:productId | Get similar product suggestions |
| GET | /recommend/user/:userId | Personalized recommendations |
| GET | /recommend/cart/:userId | Cart-based recommendations |

### 7. Folder Structure
```
/ecommerce-recommendation
|-- /client                 # React Frontend
|-- /server                 # Node Backend
|-- /microservices
|   |-- /recommendation-agent  # LangGraph agents
|   |-- /product-service
|   |-- /user-data
```

### 8. Data Format

**Product Schema**
```json
{
  "id": "123",
  "title": "Sample Product",
  "description": "Product description",
  "category": "Category",
  "price": 899,
  "tags": ["tag1", "tag2"]
}
```

**Embedding Payload**
```json
{
  "vector": [0.234, 0.548, ...],
  "payload": {
    "productId": "123",
    "category": "Category",
    "price": 899
  }
}
```

### 9. Filters Used
- Category-based filtering
- Price range filtering
- Exclusion rules: purchased items, duplicates
