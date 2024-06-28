# React-juno

![npm](https://img.shields.io/npm/v/react-juno)
![npm](https://img.shields.io/npm/dt/react-juno)
![npm](https://img.shields.io/npm/l/react-juno)

`react-juno` is a command-line tool to bootstrap a new React project with Vite and Tailwind CSS. This tool allows you to quickly set up a React project with essential configurations like Redux, React Router, ESLint, Prettier, and Jest for testing.

## Features

- **Vite** for fast build and development.
- **Tailwind CSS** for styling.
- **Redux** for state management (optional).
- **React Router** for routing (optional).
- **ESLint** for code linting (optional).
- **Prettier** for code formatting (optional).
- **Jest** and **React Testing Library** for testing (optional).
- Creates a well-structured project directory.

## Installation

To install the CLI globally, run:

```bash
npm install -g react-juno

```
## Usage
After you have installed the react-juno cli globally ,run this command to create a project

```bash
react-juno init <projectName>

```
### After the initialization the project structure will look like this

```bash
my-new-project/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── redux/
│   │   └── store.js
│   ├── routes/
│   │   └── AppRouter.js
│   ├── styles/
│   │   └── global.js
│   ├── utils/
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── tailwind.config.js
├── package.json
├── package-lock.json
└── README.md
```
