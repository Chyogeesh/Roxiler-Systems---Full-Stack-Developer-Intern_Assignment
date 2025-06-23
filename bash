git clone https://github.com/your-repo/store-rating-platform
cd backend
npm install

# Configure .env
cp .env.example .env
# Edit DB credentials and JWT_SECRET

# Migrate & seed
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

# Start server
npm run dev
cd frontend
npm install

# Start dev server
npm start
