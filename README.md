# Ouswear - Premium Streetwear E-commerce

A cutting-edge e-commerce platform for streetwear featuring **3D product previews**, dark "opium aura" aesthetics, and modern web technologies.

![Ouswear Logo](https://via.placeholder.com/200x80/ff2b4a/ffffff?text=OUSWEAR)

## 🌟 Features

### 🛍️ Core E-commerce
- **Product Catalog** with advanced filtering and sorting
- **3D Product Previews** using React Three Fiber
- **Shopping Cart** with persistent state
- **Checkout Process** with Stripe integration
- **User Authentication** with NextAuth.js
- **Order Management** and tracking
- **Admin Dashboard** for product and inventory management

### 🎨 Design & UX
- **Dark "Opium Aura" Theme** with layered red gradients
- **Framer Motion Animations** with hover effects and page transitions
- **Responsive Design** optimized for mobile and desktop
- **3D Interactive Models** with rotation and zoom controls
- **Glass-morphism UI** elements and effects
- **Custom Color Palette** with brand-specific colors

### 🔧 Technical Stack
- **Next.js 14** with App Router and TypeScript
- **MongoDB** with Mongoose ODM
- **React Three Fiber** + Drei for 3D graphics
- **TailwindCSS** with custom design system
- **NextAuth.js** for authentication
- **Stripe** for payment processing
- **Framer Motion** for animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Stripe account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ouswear-ecommerce.git
   cd ouswear-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your Ouswear store! 🎉

## 📁 Project Structure

```
ouswear-ecommerce/
├── app/                    # Next.js 14 App Router pages
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── home/             # Homepage sections
│   ├── product/          # Product-related components
│   ├── layout/           # Layout components
│   ├── ui/               # Reusable UI components
│   └── admin/            # Admin dashboard
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── models/               # Mongoose schemas
├── public/               # Static assets
│   └── models/           # 3D model files (GLB/GLTF)
├── scripts/              # Database seeding and utilities
└── README.md
```

## 🛠️ Development Guide

### Adding New Products

1. **Using the Admin Dashboard** (Recommended)
   - Login as admin at `/admin`
   - Use the product management interface

2. **Using the API**
   ```bash
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{
       "title": "New Cap",
       "description": "Amazing new design",
       "price": 49.99,
       "images": ["https://example.com/image.jpg"],
       "stock": 100,
       "tags": ["streetwear", "premium"]
     }'
   ```

3. **Bulk Import via Seeding**
   - Edit `scripts/seed-products.js`
   - Run `npm run seed`

### Working with 3D Models

1. **Prepare your models**
   - Export as GLB or GLTF format
   - Optimize for web (< 5MB recommended)
   - Place in `public/models/` directory

2. **Update ProductViewer3D component**
   ```tsx
   // Replace the placeholder Model3D component
   function Model3D({ url }: { url: string }) {
     const { scene } = useGLTF(url);
     return <primitive object={scene} />;
   }
   ```

3. **Add model URLs to products**
   ```json
   {
     "models": ["/models/your-cap.glb"],
     "variants": [
       {
         "name": "Color",
         "value": "Red",
         "modelUrl": "/models/red-cap.glb"
       }
     ]
   }
   ```

### Customizing the Theme

The brand uses a dark "opium aura" aesthetic. Customize in `tailwind.config.ts`:

```js
colors: {
  brand: {
    black: '#0a0a0a',      // Main background
    darkRed: '#1b0000',    // Dark accent
    crimson: '#8b0000',    // Medium red
    auraRed: '#ff2b4a',    // Bright accent
    accent: 'rgba(255, 44, 74, 0.12)', // Transparent overlay
  }
}
```

## 🔐 Authentication & Authorization

### User Roles
- **Customer**: Browse, purchase, manage profile
- **Admin**: Full access to products, orders, and users

### Setting up Admin User
1. Register a normal account
2. Update user role in MongoDB:
   ```js
   db.users.updateOne(
     { email: "admin@ouswear.com" },
     { $set: { role: "admin" } }
   )
   ```

### Protected Routes
- `/profile` - Requires authentication
- `/admin/*` - Requires admin role
- `/api/admin/*` - Protected API endpoints

## 💳 Payment Integration

### Stripe Setup
1. Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add to `.env.local`:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Set up webhooks for order updates

### Testing Payments
Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

## 📦 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are set:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXTAUTH_URL`

### Recommended Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

## 🎯 Performance Optimization

### 3D Models
- Use optimized GLB files (< 5MB)
- Implement LOD (Level of Detail) for thumbnails
- Lazy load models with Suspense boundaries

### Images
- WebP format for better compression
- Next.js Image optimization enabled
- CDN integration for faster delivery

### Code Splitting
- Route-based splitting with Next.js App Router
- Component lazy loading for heavy 3D components
- Dynamic imports for admin functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Products API
- `GET /api/products` - List products with filtering
- `GET /api/products/[slug]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[slug]` - Update product (admin)
- `DELETE /api/products/[slug]` - Delete product (admin)

### Orders API
- `GET /api/orders` - User's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Order details

### Admin API
- `GET /api/admin/products` - All products management
- `GET /api/admin/orders` - All orders management
- `GET /api/admin/users` - User management

## 🏷️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by the Ouswear team

---

**Top off your look. Own your vibe.** 🧢✨

For questions or support, reach out to us at hello@ouswear.com