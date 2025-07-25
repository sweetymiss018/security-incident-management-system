Prerequisites

Node.js 16+
PostgreSQL 12+
Modern web browser

Installation

Clone the repository

bash
git clone https://github.com/yourusername/security-incident-system.git
cd security-incident-system

Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env
# Configure your database connection and API keys

Initialize database

bash
npm run db:migrate
npm run db:seed

Start the application

bash
npm run dev
Visit http://localhost:3000 to access the dashboard.
