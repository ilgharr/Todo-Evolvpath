# Todo App

A simple and intuitive Todo application developed using React and Bootstrap. This app helps users to keep track of their tasks efficiently.

## Features

- **Add Todo**: Easily add new tasks to your list.
- **Delete Todo**: Remove tasks that are completed or no longer needed.
- **Mark as Complete**: Mark tasks as complete and move them to the completed section.
- **Persist Data**: Data is saved locally, so your tasks remain even after refreshing the browser.

## Technologies Used

- **React**
- **React DOM**
- **Firebase**
- **Bootstrap**
- **React switch selector**

## Installation

  1. Clone he repositoy

  ```bash
    git clone https://github.com/ilgharr/Todo-Evolvpath.git
    cd todo-app
  ```

  2. Install the dependencies:

    ```bash
    npm install
    ```

  3. Create 'Config.js' inside 'src' directory and add Firebase configuration variables

    ```javascript
    const Config = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      databaseURL: ""
    };

    export default Config;
    ```

  4. Start the application:

    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.
