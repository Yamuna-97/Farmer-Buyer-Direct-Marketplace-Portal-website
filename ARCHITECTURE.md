# Farmer-Buyer Marketplace - Architecture & Design Documentation

## System Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────┐
│         PRESENTATION LAYER (React.js)           │
│  - User Interface Components                    │
│  - State Management (Context API)               │
│  - Client-side Routing (React Router)           │
│  - HTTP Client (Axios)                          │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         APPLICATION LAYER (Express.js)          │
│  - REST API Endpoints                           │
│  - Business Logic (Controllers)                 │
│  - Request Validation (Middleware)              │
│  - Authentication & Authorization               │
│  - Request Logging                              │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         DATA LAYER (MongoDB)                    │
│  - Document Databases                          │
│  - Data Persistence                            │
│  - Relationships via ObjectId                   │
└─────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App.js
├── Header.js
│   ├── Logo
│   ├── Navigation Links
│   └── User Menu
├── Routes
│   ├── Public Routes
│   │   ├── /login → Login.js
│   │   ├── /register → Register.js
│   │   ├── /marketplace → Marketplace.js
│   │   │   └── ProductCard.js (multiple)
│   │   └── /product/:id → ProductDetails.js
│   │
│   ├── Farmer Routes (Protected)
│   │   ├── /dashboard → FarmerDashboard.js
│   │   └── /add-product → AddProduct.js
│   │
│   └── Buyer Routes (Protected)
│       └── /my-orders → MyOrders.js
│
└── UserContext Provider
    └── UserProvider wraps entire app
```

### Component Responsibilities

#### Header Component
- Displays navigation
- Shows user info
- Logout functionality
- Role-based menu items

#### Authentication (Login/Register)
- Form handling with controlled components
- Input validation
- User context integration
- Redirect to appropriate dashboard

#### Marketplace
- Products listing
- Search and filter functionality
- Category filtering
- Product grid display

#### Product Card
- Product information display
- Farmer details
- Quick action buttons
- Responsive design

#### Product Details
- Detailed product information
- Farmer contact details
- Order form (quantity, delivery address)
- Order summary and calculation
- Order placement

#### Farmer Dashboard
- Product statistics
- Products table
- Edit/Delete actions
- Add new product link

#### Add Product
- Controlled form inputs
- Category selection
- Input validation
- Success/error handling

#### My Orders
- User's order history
- Status tracking with color coding
- Order details display
- Cancel order functionality

### State Management

#### Context API (UserContext)
```javascript
{
  user: {
    id: String,
    name: String,
    email: String,
    role: 'farmer' | 'buyer',
    location: String
  },
  loginUser: Function,
  logoutUser: Function,
  loading: Boolean
}
```

#### localStorage Usage
```javascript
- user: Full user object (JSON string)
- userId: User ID for API calls
- userRole: User role for authorization
```

#### Component-level State (useState)
- Form inputs
- Loading states
- Error messages
- Component-specific data

### Hooks Usage

#### useContext
- Access global user state
- Global state mutations

#### useState
- Form data management
- Loading/error states
- Local component data

#### useEffect
- Fetch data on component mount
- Sync with API
- Cleanup operations

#### useParams
- Extract route parameters
- Dynamic product/user IDs

#### useNavigate
- Programmatic navigation
- Redirect after actions
- Route protection

### API Integration

#### API Base URL
- Development: `http://localhost:5000/api`
- Production: Environment variable `REACT_APP_API_URL`

#### HTTP Methods
- **GET**: Fetch data
- **POST**: Create resources
- **PUT**: Update resources
- **DELETE**: Delete resources

#### Headers
```javascript
{
  'Content-Type': 'application/json',
  'user-id': userId,    // Custom header
  'user-role': userRole // Custom header
}
```

#### Error Handling
- Try-catch blocks
- User-friendly error messages
- Error state management
- Logging for debugging

## Backend Architecture

### Express Server Structure

```
server.js
├── Initialize Express app
├── Middleware Setup
│   ├── CORS
│   ├── JSON parsing
│   ├── Logging
│   └── Static files
├── Routes Registration
│   ├── /api/users
│   ├── /api/products
│   └── /api/orders
├── Error Handling
└── Server Startup
```

### Routing Pattern

#### User Routes (`/api/users`)
```
POST   /register          → userController.register
POST   /login             → userController.login
GET    /                  → userController.getAllUsers
GET    /:id               → userController.getUser
```

#### Product Routes (`/api/products`)
```
GET    /                  → productController.getAllProducts
GET    /:id               → productController.getProduct
POST   /                  → authMiddleware → productController.createProduct
PUT    /:id               → authMiddleware → productController.updateProduct
DELETE /:id               → authMiddleware → productController.deleteProduct
GET    /farmer/:farmerId  → productController.getFarmerProducts
```

#### Order Routes (`/api/orders`)
```
GET    /                          → orderController.getAllOrders
GET    /:id                       → orderController.getOrder
POST   /                          → authMiddleware → orderController.createOrder
PUT    /:id/status               → authMiddleware → orderController.updateOrderStatus
GET    /buyer/:buyerId           → authMiddleware → orderController.getBuyerOrders
DELETE /:id                       → authMiddleware → orderController.cancelOrder
```

### Middleware Pipeline

```
Request
  ↓
[CORS Middleware]
  ↓
[JSON Parser]
  ↓
[Logging Middleware]
  ↓
[Route Handler]
  ├─ [Auth Middleware] (if needed)
  ├─ [Role Authorization] (if needed)
  ├─ [Validation Middleware] (if needed)
  └─ [Controller Logic]
  ↓
Response
```

### Controllers Structure

Each controller follows this pattern:

```javascript
exports.functionName = async (req, res) => {
  try {
    // Validate input
    // Fetch/create data from DB
    // Return success response
    res.status(200).json({ data: result });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error message' });
  }
};
```

### Error Handling Pattern

```javascript
try {
  // Business logic
} catch (error) {
  // Log error
  // Return appropriate HTTP status
  res.status(status).json({ 
    message: 'User-friendly message',
    error: error.message // Dev only
  });
}
```

### Database Operations

#### Mongoose Schema Pattern
```javascript
const schema = new mongoose.Schema({
  field: {
    type: DataType,
    required: Boolean,
    default: Value,
    unique: Boolean,
    enum: [AllowedValues],
    ref: 'ReferencedModel'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ModelName', schema);
```

#### Relationships

**User → Product (One-to-Many)**
- Farmer has many products
- Product has one farmer (farmerId reference)

**User → Order (One-to-Many)**
- Buyer has many orders
- Order has one buyer (buyerId reference)

**Product → Order (One-to-Many)**
- Product can be in many orders
- Order has one product (productId reference)

## Data Flow

### User Registration Flow

```
Register Component
  ↓
[User fills form]
  ↓
[validateUser middleware]
  ↓
[userController.register]
  ↓
[Check if user exists]
  ↓
[Create new User document]
  ↓
[Save to MongoDB]
  ↓
[Return user object]
  ↓
[LoginUser context function]
  ↓
[Store in localStorage]
  ↓
[Navigate to dashboard/marketplace]
```

### Product Creation Flow (Farmer)

```
AddProduct Component
  ↓
[Farmer fills form]
  ↓
[validateProduct middleware]
  ↓
[productController.createProduct]
  ↓
[Extract userId from headers]
  ↓
[Create Product document with farmerId]
  ↓
[Save to MongoDB]
  ↓
[Return success response]
  ↓
[Component navigates to dashboard]
```

### Order Placement Flow (Buyer)

```
ProductDetails Component
  ↓
[Buyer enters quantity & address]
  ↓
[validateOrder middleware]
  ↓
[orderController.createOrder]
  ↓
[Check product availability]
  ↓
[Calculate total price]
  ↓
[Create Order document]
  ↓
[Update product quantity]
  ↓
[Save both to MongoDB]
  ↓
[Return order confirmation]
  ↓
[Component redirects to My Orders]
```

## Security Considerations

### Current Implementation (Demo)
- Header-based authentication
- No password hashing
- No HTTPS

### Production Recommendations
```
├── Authentication
│   ├── JWT token generation
│   ├── Token refresh mechanism
│   └── Secure token storage
│
├── Authorization
│   ├── Role-based access control (RBAC)
│   ├── Permission verification
│   └── Resource ownership validation
│
├── Data Protection
│   ├── Password hashing (bcrypt/argon2)
│   ├── Input sanitization
│   ├── SQL injection prevention
│   ├── XSS protection
│   └── CSRF tokens
│
├── Network Security
│   ├── HTTPS/TLS
│   ├── CORS configuration
│   ├── Rate limiting
│   ├── API key authentication
│   └── Request validation
│
└── Infrastructure
    ├── Database encryption
    ├── Environment variable protection
    ├── Secure secrets management
    └── Regular security audits
```

## Performance Optimization

### Frontend
```
├── Code Splitting
│   ├── Lazy load routes
│   ├── Lazy load components
│   └── Load on demand modules
│
├── Caching
│   ├── localStorage for user data
│   ├── Browser caching
│   └── API response caching
│
├── Bundle Size
│   ├── Tree shaking
│   ├── Minification
│   ├── Compression
│   └── Unused code removal
│
└── Rendering
    ├── Memoization (React.memo)
    ├── useCallback optimization
    ├── useMemo for heavy computation
    └── Virtual scrolling for large lists
```

### Backend
```
├── Database
│   ├── Indexing on frequently queried fields
│   ├── Connection pooling
│   ├── Query optimization
│   └── Pagination for large datasets
│
├── Caching
│   ├── Redis for session data
│   ├── API response caching
│   └── Database result caching
│
├── Scalability
│   ├── Horizontal scaling
│   ├── Load balancing
│   ├── Microservices architecture
│   └── Message queues for async tasks
│
└── Performance
    ├── Async operations
    ├── Connection pooling
    ├── Compression
    └── CDN for static assets
```

## Testing Strategy

### Frontend Testing
```
├── Unit Tests
│   ├── Components (React Testing Library)
│   ├── Hooks (Custom hook tests)
│   └── Utilities
│
├── Integration Tests
│   ├── User flows
│   ├── API integration
│   └── State management
│
└── E2E Tests
    ├── Cypress/Playwright
    ├── Critical user journeys
    └── Cross-browser testing
```

### Backend Testing
```
├── Unit Tests
│   ├── Controllers
│   ├── Middleware
│   ├── Utilities
│   └── Models
│
├── Integration Tests
│   ├── API endpoints
│   ├── Database operations
│   └── Authentication flow
│
└── API Tests
    ├── Postman collections
    ├── REST client tests
    └── Performance testing
```

## Deployment Architecture

### Development Environment
```
localhost:3000 (Frontend) ←→ localhost:5000 (Backend) ←→ MongoDB local
```

### Staging Environment
```
Vercel (Frontend) ←→ Railway/Render (Backend) ←→ MongoDB Atlas
```

### Production Environment
```
Netlify/Vercel (Frontend) ←→ AWS/GCP/Azure (Backend) ←→ Managed MongoDB
```

## Monitoring & Logging

### Frontend Monitoring
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Session recording

### Backend Monitoring
- Request logging
- Error tracking
- Database query monitoring
- Server performance metrics
- Uptime monitoring

## Future Enhancements Architecture

### Phase 1: Core Features
- User reviews & ratings
- Cart functionality
- Wishlist feature

### Phase 2: Advanced Features
- Payment gateway integration
- Real-time notifications
- Chat messaging system
- Farmer analytics dashboard

### Phase 3: Enterprise Features
- Admin panel
- Reporting & analytics
- Multi-language support
- API documentation (Swagger)
- GraphQL alternative to REST

### Phase 4: Scalability
- Microservices architecture
- Event-driven system
- Kafka for streaming
- Elasticsearch for search
- Redis for caching

---

**Key Design Principles Used:**
- Separation of Concerns
- DRY (Don't Repeat Yourself)
- Single Responsibility
- KISS (Keep It Simple, Stupid)
- SOLID Principles (where applicable)
