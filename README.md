# survey_platform_back

backend application for conducting surveys

## install

- Clone the repository

  ```
  git clone https://github.com/Fileurix3/survey_platform_back.git
  ```

- Go to the folder with this application

  ```
  cd survey_platform_back
  ```

- Install dependencies

  ```
  npm i
  ```

- Compile this app

  ```
  npm run build
  ```

- Start this app
  ```
  npm start
  ```

## Endpoints

- #### Auth

  - register

    ```bash
    POST /auth/register
    {"name": "example name", "password": "example password"}
    ```

  - login

    ```bash
    POST /auth/login
    {"name": "example name", "password": "example password"}
    ```

  - logout

    ```bash
    GET /auth/logout
    ```

- #### Users

  - add or remove favourite anime

    ```bash
    POST user/change/anime/favorites
    {"animeId": "animeId"}
    ```

  - get user profile by name

    ```bash
    GET user/profile/:userName
    ```

- #### Anime

  - search for an anime by title excerpt

    ```bash
    GET anime/search/:searchParams
    ```

  - get anime by id

    ```bash
    GET anime/get/:animeId
    ```

- #### Recommendations

  - get anime recommendations

    ```bash
    GET recommendations/anime
    ```

## Commands

- **npm run build**: Compiles TypeScript files to JavaScript.
- **npm start**: Runs the compiled JavaScript code.
- **npm run test**: Runs tests.
- **npm run dev**: Starts the server with `nodemon` for auto-reloading on file changes.

## Dependencies

- **[mongoose](https://www.npmjs.com/package/mongoose)**  
  to use mongodb

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**  
  for hashing passwords securely

- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**  
  to handle cookies in Express

- **[dotenv](https://www.npmjs.com/package/dotenv)**  
  to manage environment variables from a `.env` file

- **[express](https://www.npmjs.com/package/express)**  
  framework for building APIs and web applications

- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**  
  for creating and verifying JSON Web Tokens (JWT) for secure user authentication

- **[redis](https://www.npmjs.com/package/redis)**  
  for caching and managing session data

## Dev Dependencies

- **[@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)**  
  Type definitions for bcrypt

- **[@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser)**  
  Type definitions for cookie-parser

- **[@types/express](https://www.npmjs.com/package/@types/express)**  
  Type definitions for Express

- **[@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)**  
  Type definitions for jsonwebtoken

- **[@types/node](https://www.npmjs.com/package/@types/node)**  
  Type definitions for Node.js

- **[chai](https://www.npmjs.com/package/chai)**  
  assertion library for testing

- **[mocha](https://www.npmjs.com/package/mocha)**  
  JavaScript test framework for Node.js

- **[nodemon](https://www.npmjs.com/package/nodemon)**  
  utility that automatically restarts the Node.js application when file changes are detected

- **[supertest](https://www.npmjs.com/package/supertest)**  
  library for testing HTTP servers

- **[typescript](https://www.npmjs.com/package/typescript)**  
  TypeScript compiler to add static types to JavaScript
