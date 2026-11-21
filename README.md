# Tara Ecommerce

Tara Store is a React storefront backed by an Express API and MongoDB. User accounts and orders are stored in MongoDB; the current product catalogue remains the existing frontend catalogue.

## Run locally

1. Start MongoDB locally, or use a MongoDB connection string.
2. If `backend/.env` does not exist, copy `backend/.env.example` to `backend/.env`; otherwise make sure `MONGO_URI` and a private, random `JWT_SECRET` are set there.
3. In `backend`, run `npm install`, then `npm run dev`. The API starts on port 5000 after MongoDB connects.
4. In `frontend`, run `npm install`, then `npm run dev`. Open the URL printed by Vite.

To use a different API URL, set `VITE_API_URL` in the frontend environment (for example, `http://localhost:5000/api`) before starting or building the frontend.

## Google sign-in

1. In the Google Cloud Console, create an OAuth 2.0 Client ID for a **Web application** and add your local frontend origin (for example, `http://localhost:5173`) to its authorized JavaScript origins.
2. Copy the client ID into `VITE_GOOGLE_CLIENT_ID` in `frontend/.env` and into `GOOGLE_CLIENT_ID` in `backend/.env`. Example environment files are provided in each project directory; do not commit your actual `.env` files.
3. Restart the frontend and backend. The login and registration pages will then show Google's credential button; when the frontend ID is not configured, the button explains how to configure it instead of attempting a broken sign-in.

The backend verifies Google's ID token against its configured client ID before finding or creating a user and issuing a Tara Store JWT. Google-created accounts can add a phone number later during checkout.

## Product catalog images

The 60 catalog entries use individual `/images/products/<slug>.jpg` image paths. Product cards automatically fall back to a same-name `.png`, then to the supplied `.svg` package illustration. Add a real `parle-g.jpg` (or `.png`) beside `parle-g.svg` to replace that illustration without changing the catalog. Regenerate the default illustrations with `npm run generate:product-images` from `frontend`.

To upsert the same catalog and image paths into MongoDB, run `npm run seed:products` from `backend` after configuring its `.env`. The seed script reads the frontend catalog so product names, IDs, prices, and image paths stay aligned.

## Main flows

- Register with a unique email and 10-digit Indian mobile number. New passwords must be at least 8 characters and contain uppercase and lowercase letters, a number, and a symbol. Login requires only email and a non-empty password for compatibility with existing accounts.
- Logged-in customers can add or update their phone number from My Account. Password changes require the current password and use the same strong-password rules as registration.
- Sign in or create an account with Google after configuring the OAuth client ID.
- Browse/search products by category and maintain a cart in the browser. The floating Tara Shopping Assistant matches shopping lists to catalog items, suggests budget-aware occasion combos, recommends pairings, and can add individual items or a full list to the cart.
- Logged-in customers can place orders with a 10-digit Indian mobile number and a 6-digit Indian PIN code; MongoDB stores order items, shipping details, totals, and status.
- Successful checkout displays an order receipt with the order number, items, total, status, and delivery address. Logged-in customers can also view their order history and status.
- Admin accounts can view dashboard totals and update order statuses. To grant admin access, set the account's `isAdmin` field to `true` in MongoDB.

The frontend and backend each have their own package scripts. Run `npm run build` and `npm run lint` from `frontend` to validate the client.
