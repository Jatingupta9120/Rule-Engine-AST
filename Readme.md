# Rule Engine

A simple rule engine application built with Node.js, PostgreSQL, and Sequelize ORM. This application allows for dynamic creation, combination, and evaluation of eligibility rules based on user attributes such as age, department, income, and experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Entities](#entities)
- [License](#license)

## Features

- Create individual rules and store them in a PostgreSQL database.
- Combine multiple rules into a single Abstract Syntax Tree (AST).
- Evaluate user eligibility against defined rules.
- Error handling for invalid rule formats and comparisons.
- Validations for user attributes.
- Modify existing rules dynamically.

## Technologies

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- dotenv (for environment variables)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Sequelize CLI (optional, for migrations)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jatingupta9120/Rule-Engine-AST
   cd rule-engine
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and configure your PostgreSQL database settings:

   ```plaintext
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=rule_engine_db
   DB_HOST=127.0.0.1
   DB_DIALECT=postgres
   ```

2. Create the PostgreSQL database:

   ```sql
   CREATE DATABASE rule_engine_db;
   ```

3. Run database migrations (if using Sequelize CLI):

   ```bash
   npx sequelize-cli db:migrate
   ```

### Running the Application

Start the application using nodemon for development:

```bash
npm run start:dev
```

The server will run at `http://localhost:3000`.

## API Endpoints

- **Create Rule**
  - `POST /rules`
  - Body: `{ "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)" }`
  
- **Combine Rules**
  - `POST /rules/combine`
  - Body: `{ "rules": ["((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)", "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"] }`
  
- **Evaluate Rule**
  - `POST /rules/evaluate`
  - Body: `{ "node": <AST_Node>, "data": { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 } }`

## Entities

### Rule
- Represents a rule that defines eligibility criteria.
- Fields: `id`, `rule_string`, `description`, `createdAt`, `updatedAt`.

### User
- Represents a user with attributes that can be evaluated against rules.
- Fields: `id`, `name`, `age`, `department`, `salary`, `experience`, `createdAt`, `updatedAt`.

### Condition
- Represents individual conditions that can be part of a rule.
- Fields: `id`, `field`, `operator`, `value`, `ruleId`, `createdAt`, `updatedAt`.

```

### Example Modifications

- **GitHub URL**: Replace `https://github.com/Jatingupta9120/Rule-Engine-AST` with the actual link to your GitHub repository.
- **Database Credentials**: Update the environment variable examples in the configuration section to reflect actual requirements.
- **API Example Payloads**: Use real payloads based on your implementation to illustrate usage clearly.

This template gives users clear instructions on how to get started with your application and what they can expect. If you have specific functionalities or details you'd like to include, feel free to ask for further adjustments!