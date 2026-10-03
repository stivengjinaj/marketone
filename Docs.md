## Principal business and logic functions

The functions below define the application's main behavior. API functions currently use in-memory mock data; they do not persist data to a backend.

### Authentication and access control

| Function                           | Location                        | Responsibility                                                                                                                                                                                                                                                    |
|------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `login(credentials)`               | `src/api/authApi.ts`            | Finds a matching account in `MOCK_ACCOUNTS`. Email comparison is case-insensitive; password comparison is exact. Resolves with the user after a 500 ms delay, or rejects with `Invalid email or password`.                                                        |
| `AuthProvider`                     | `src/context/AuthContext.tsx`   | Loads the saved user from `localStorage` on initialization. Its `login` method manages loading/error state, calls the API login function, and saves a successful session under `marketone.session`. Its `logout` method clears that session and the current user. |
| `useAuth()`                        | `src/hooks/useAuth.ts`          | Reads the authentication context for components and throws an error when used outside `AuthProvider`.                                                                                                                                                             |
| `ProtectedRoute({ allowedRoles })` | `src/routes/ProtectedRoute.tsx` | Redirects signed-out users to `/login`; redirects signed-in users who lack an allowed role to their role's default page; otherwise renders the nested route. This is client-side route gating, not backend authorization.                                         |

### Product loading and shopping cart

| Function            | Location                      | Responsibility                                                                                                                                                                                                                                                  |
|---------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fetchProducts()`   | `src/api/productsApi.ts`      | Returns the mock product list through `simulateRequest`, with a 700 ms delay.                                                                                                                                                                                   |
| `useProducts()`     | `src/hooks/useProducts.ts`    | Loads products when the hook mounts and exposes `products`, `status`, `error`, and `reload`. Status values are `idle`, `loading`, `success`, and `error`; `reload` starts a new request and updates the state.                                                  |
| `CartProvider`      | `src/context/CartContext.tsx` | Owns the in-memory cart. `addProduct` increments the quantity if the product is already present, or adds it with quantity 1. `removeProduct` removes a product; `updateQuantity` changes its quantity or removes it at zero or below; `clear` empties the cart. |
| Cart derived values | `src/context/CartContext.tsx` | `total` sums each product's price multiplied by its quantity. `itemCount` sums quantities, so it counts units rather than distinct product lines.                                                                                                               |
| `useCart()`         | `src/hooks/useCart.ts`        | Reads the cart context and provides its cart operations and derived values to components.                                                                                                                                                                       |

### Orders and dashboard statistics

| Function                   | Location                         | Responsibility                                                                                                                                                                              |
|----------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `submitOrder(items)`       | `src/api/ordersApi.ts`           | Calculates the order total, creates an order with a generated ID, current timestamp, and `confirmed` status, then resolves it after an 800 ms simulated delay. It does not store the order. |
| `fetchDashboardStats()`    | `src/api/statsApi.ts`            | Returns mock dashboard statistics through `simulateRequest`, with a 700 ms delay.                                                                                                           |
| `useDashboardStats()`      | `src/hooks/useDashboardStats.ts` | Loads dashboard statistics on mount and exposes `stats`, `status`, `error`, and `reload`, using the same loading/success/error lifecycle as `useProducts`.                                  |
| `buildSalesTrend()`        | `src/mocks/stats.ts`             | Creates 14 daily revenue points ending today. The sample revenue values are fixed; order counts are estimated from revenue.                                                                 |
| `buildExpiringProducts()`  | `src/mocks/stats.ts`             | Selects products with an expiry date, maps them to the alert shape, and sorts them by soonest expiry first.                                                                                 |
| `buildLowStockProducts()`  | `src/mocks/stats.ts`             | Selects products with stock above zero and at or below the threshold of 10, then sorts from lowest stock upward. Products with zero stock are excluded.                                     |
| `buildCategoryBreakdown()` | `src/mocks/stats.ts`             | Adds estimated stock value per category by multiplying each product's price by its stock, treating zero stock as one for this calculation, and rounds the result.                           |

### Shared utilities

| Function                         | Location                      | Responsibility                                                                                                                                         |
|----------------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `simulateRequest(data, options)` | `src/api/simulateRequest.ts`  | Wraps mock data in a promise with a configurable delay. It can simulate a rejected network request using `failRate`; the default failure rate is zero. |
| `formatCurrency(amount)`         | `src/utils/formatCurrency.ts` | Formats a numeric amount using Albanian locale conventions and the Albanian lek currency (`ALL`).                                                      |