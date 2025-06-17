# Localization Metaproject

A NestJS-based e-commerce project with multi-language support for items, categories, and labels.

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone git@github.com:Zingeon/metaproject.git
cd localization-metaproject
```

2. Create a `.env` file in the root directory:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=localization_metaproject
DB_SSL=false
```

3. Start the Docker containers:
```bash
docker-compose up -d
```

4. Install dependencies:
```bash
npm install
```

5. Run migrations:
```bash
npm run migration:run
```

6. Seed the database:
```bash
npm run seed
```

7. Start the application:
```bash
npm run start
```

The application will be available at `http://localhost:3000`

### Manual Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd localization-metaproject
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database named `localization_metaproject`

4. Create a `.env` file in the root directory with your database configuration:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=localization_metaproject
DB_SSL=false
```

5. Run migrations:
```bash
npm run migration:run
```

6. Seed the database:
```bash
npm run seed
```

7. Start the application:
```bash
npm run start:dev
```

## API Endpoints

- `GET /items` - Get random items
- `GET /items/:id/similar` - Get similar items