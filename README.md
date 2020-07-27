# code-challenge
A small CRUD app using NodeJS and SQLite

## Installation

 - Clone `git clone git@github.com:kimobrian/code-challenge.git`
 - Install deps: `yarn`
 - Create a .env file and set it like `.env.sample`
 - Setup the DB by running the following commands:
    -  `yarn migrate`
    -  `yarn seed`
 - Run the app with `yarn start` or `yarn start:dev` in development

 ### Routes

 #### Users

 - Signup `http://localhost:3000/signup`
  > sample json body data
    ```json
    {
      "username": "jose",
      "password": "pass123",
      "name": "Joseph Mwamba",
      "birthDate": "2020-07-26"
    }
    ```

- Login `http://localhost:3000/login`
  ```json
  {
    "username": "jose",
    "password": "pass123",
  }
  ```

- Get own user info `http://localhost:3000/users/me` (Auth required)
  - Supply a jwt token obtained afetr login using `authorization` header

- Get user by id or username: (Auth required)
  - `http://localhost:3000/users/id` e.g http://localhost:3000/users/3
  - `http://localhost:3000/users/username` e.g http://localhost:3000/users/kim

- Get all users `http://localhost:3000/users/` (Auth required)

- Update user. A PUT request to `http://localhost:3000/users/me` (Auth required)
  - Sample data
  ```json
  {
    "name": "Joseph Mwamba",
    "birthDate": "2020-07-26"
  }
  ```

- Delete own account DEL request to `http://localhost:3000/users/me` (Auth required)

#### Locks

- All operations here require authentication. Provide an `authorization` header

- GET all user locks(GET request) (`http://localhost:3000/locks`)
- GET lock by id or macId(GET request)
  - Sample request `http://localhost:3000/locks/38d5b621-80d6-4885-b49d-9cfafee09b9b` (with macId)
  - Using lock Id `http://localhost:3000/locks/3`

- Create a lock(POST request) to `http://localhost:3000/locks`
- Delete lock(DELETE request) to `http://localhost:3000/locks/:lockId`
- Update lock(PUT request) to `http://localhost:3000/locks/:lockId`

- Get all user locks(GET request) (`http://localhost:3000/locks/38d5b621-80d6-4885-b49d-9cfafee09b9b`)
