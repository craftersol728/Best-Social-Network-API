# Best-Social-Network-API


This is a RESTful API for a social network platform built using Node.js and MongoDB with the Mongoose ODM.

## Features

- User authentication and authorization using JWT
- CRUD operations for user profiles
- Ability to follow/unfollow other users
- CRUD operations for posts
- Ability to like/unlike posts
- Ability to comment on posts
- Real-time updates using WebSockets

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository to your local machine
git clone https://github.com/<repo-url>.git


2. Navigate to the project directory
cd social-network-api

3. Install dependencies
npm install


4. Start the development server
npm run dev


The API will be running on `http://localhost:3001 `

## Endpoints

The API has the following endpoints:

- `GET /api/users` - Retrieve a list of all users
- `GET /api/users/:id` - Retrieve a specific user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a specific user by ID
- `DELETE /api/users/:id` - Delete a specific user by ID
- `GET /api/posts` - Retrieve a list of all posts
- `GET /api/posts/:id` - Retrieve a specific post by ID
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a specific post by ID
- `DELETE /api/posts/:id` - Delete a specific post by ID

## Built With

- [Node.js](https://nodejs.org) - The JavaScript runtime used
- [Express.js](https://expressjs.com) - The web framework used
- [MongoDB](https://mongodb.com) - The NoSQL database used
- [Mongoose](https://mongoosejs.com) - The ODM used to interact with MongoDB
- [JWT](https://jwt.io) - The standard used for user authentication and authorization
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - The technology used for real-time updates

## Contributing

Contributions are welcome. To contribute, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
