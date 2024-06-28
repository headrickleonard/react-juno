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


## Contributing

We welcome contributions to the `react-juno cli` If you would like to contribute, please follow these steps:

### 1. Fork the Repository:
Click the "Fork" button at the top right corner of this repository to create a copy of the repository in your GitHub account.

### 2. Clone Your Fork:
 Clone your forked repository to your local machine.

``` bash
git clone https://github.com/headrickleonard/react-juno.git

```

```bash
cd react-juno

```

### 3. Create a Branch:
 Create a new branch for your feature or bugfix.

 ```
 git checkout -b feature/your-feature-name

```
### 4. Make Changes:
 Make your changes in the new branch.

### 5. Commit Your Changes:
  Commit your changes with a descriptive commit message.

  ```bash
  git commit -m "Add new feature: your-feature-name"

```
### 6. Push Your Changes:
 Push your changes to your forked repository.

 ```bash
 git push origin feature/your-feature-name

```
### 7. Create a Pull Request:
 Open a pull request to the main repository, explaining your changes and the feature or bugfix you have implemented.