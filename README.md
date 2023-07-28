# Mongoose-Checkpoint

Mongoose-Checkpoint is a Node.js application that demonstrates how to use MongoDB with Mongoose for creating, reading, updating, and deleting records of a Person model.

## Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB Atlas URI (for database connection)
- Postman (or any API testing tool) for testing the API endpoints

## Installation

1. Clone the repository:

```bash
git clone https://github.com/bashiroo2/Mongoose-Checkpoint.git
cd Mongoose-Checkpoint
```

2. Install dependencies:

```bash
npm install
```

3. Set up Environment Variables:

Update `.env` file in the root directory and add your MongoDB Atlas URI:

```env
MONGO_URI=your-mongodb-atlas-uri
```

4. Run the Application:

```bash
npm start
```

The server will start running on `http://localhost:3000` (or your specified port).

## Usage

Use Postman (or any API testing tool) to interact with the application and perform CRUD operations on the Person model.

### Endpoints

- **POST** `/create-person`: Create and save a new person with name, age, and favoriteFoods.
- **POST** `/create-many`: Create multiple people at once.
- **GET** `/find-by-name/:name`: Find all people with a given name.
- **GET** `/find-by-food/:food`: Find one person with a certain food in their favorites.
- **GET** `/find-by-id/:personId`: Find a person by their _id.
- **PATCH** `/add-food/:personId`: Add a new favorite food to a person by their _id.
- **PATCH** `/update-age/:personName`: Update a person's age by name.
- **DELETE** `/delete-by-id/:personId`: Delete a person by their _id.
- **DELETE** `/delete-by-name/:name`: Delete all people with a specific name.
- **GET** `/burrito-lovers`: Find people who like burritos, sorted by name, with limited fields.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
