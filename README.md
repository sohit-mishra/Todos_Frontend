# Todos_Frontend

This project is a simple and efficient frontend application for managing to-do tasks. It offers features such as adding, updating, deleting, and patching tasks. It also includes user authentication (login/signup), token management, and a contact form.

## Features

- **Add Task**: Create a new to-do task.
- **Update Task**: Modify an existing task.
- **Delete Task**: Remove a task from the list.
- **Patch Task**: Make partial updates to tasks.
- **User Authentication**: Login and signup functionality with token-based authentication.
- **Contact Form**: Users can submit inquiries or feedback.

## Technologies Used

- **Frontend**: React.js, Chakra UI (UI components)
- **State Management**: Context API / Redux (Optional)
- **Authentication**: JWT (JSON Web Token)
- **UI Components**: Chakra UI

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/sohit-mishra/Todos_Frontend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Todos_Frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your API URL:
    ```dotenv
    REACT_APP_API_URL=https://your-api-url.com
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

   This will start the development server, and you can view the application in your browser at `http://localhost:3000`.

## Chakra UI Setup

Chakra UI is used for building accessible and user-friendly UI components.

To set up Chakra UI, ensure you have the following in your project:

1. Install Chakra UI:
    ```bash
    npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
    ```

2. Wrap your app with the ChakraProvider in `src/index.js` (or `src/App.js`):

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { ChakraProvider } from '@chakra-ui/react';
    import App from './App';
    
    ReactDOM.render(
      <ChakraProvider>
        <App />
      </ChakraProvider>,
      document.getElementById('root')
    );
    ```

## API Endpoints

### Task Management

- **Add Task**: `POST /api/tasks`
- **Update Task**: `PUT /api/tasks/:id`
- **Delete Task**: `DELETE /api/tasks/:id`
- **Patch Task**: `PATCH /api/tasks/:id`

### User Authentication

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`

### Contact Form

- **Submit Inquiry**: `POST /api/contact`

## Authentication & Tokens

1. **Signup**: Users can create an account by sending a `POST` request to `/api/auth/signup` with their username, email, and password.

2. **Login**: Upon successful login, a JWT token will be returned. This token should be included in the `Authorization` header for subsequent requests.

   Example:
   ```bash
   Authorization: Bearer <your-jwt-token>
