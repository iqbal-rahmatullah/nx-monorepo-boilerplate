# Nx Monorepo Boilerplate for Express.js API

## Overview

This repository offers a robust monorepo setup utilizing [Nx](https://nx.dev), tailored for building scalable and maintainable Express.js backend applications. It incorporates Domain-Driven Design (DDD) principles to ensure a clear separation of concerns and alignment with business domains. Developers can manage multiple related backend applications, libraries, and utilities within a single repository, promoting code reuse and efficient development workflows.

## Features

- **Monorepo Structure**: Organize multiple Express.js applications and shared libraries in a single repository.
- **Nx Integration**: Leverage Nx's powerful build system for efficient task running and dependency management.

- **Domain-Driven Design (DDD)**: Implement DDD principles to structure the application around business domains, enhancing maintainability and scalability.

## Project Structure

The project is organized into the following directories:

- `apps/`: Contains individual Express.js applications.
- `libs/`: Houses shared libraries and utilities that can be imported across applications.
- `.env.example`: Sample environment variables configuration.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `.prettierignore`: Defines files and directories to be ignored by Prettier.
- `.prettierrc`: Prettier configuration file.
- `eslint.config.mjs`: ESLint configuration file.
- `nx.json`: Nx workspace configuration.
- `package.json`: Project dependencies and scripts.
- `project.json`: Project-specific configuration.
- `tsconfig.base.json`: Base TypeScript configuration.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Nx CLI](https://nx.dev/getting-started/installation)

### Installation

1.  Clone the repository:
    `git clone https://github.com/iqbal-rahmatullah/nx-monorepo-boilerplate.git cd nx-monorepo-boilerplate`

2.  Install dependencies:
    `npm install`

### Running Applications

To serve an application, run:

`nx serve <app-name>`

Replace `<app-name>` with the name of the application you wish to run.

Or if you wanna run all application together run `nx run-many --targets=serve`

### Generating Applications and Libraries

- To generate a new application :
  `nx generate @nrwl/express:app <app-name>`

- To generate a new library :

`nx generate @nrwl/workspace:lib <lib-name>`

Replace `<app-name>` and `<lib-name>` with your desired names.

## Development Workflow

- **Code Generation**: Use Nx's powerful code generation capabilities to scaffold applications and libraries.
- **Linting**: Maintain code quality with ESLint.
- **Code Formatting**: Ensure consistent code style with Prettier.
- **Task Running**: Leverage Nx's task running to execute commands across multiple projects efficiently.

## Domain-Driven Design (DDD) Implementation

![My experience with Domain-Driven Design part 1: naming - Janmeppe.com 👋](https://www.janmeppe.com/assets/2023-06-02-my-experience-with-domain-driven-design-part-1/2023-06-02-17-48-15.png)
This boilerplate incorporates DDD principles to structure the application around business domains. Each domain is encapsulated within its own library, promoting a clear separation of concerns and enhancing maintainability. This approach allows for better alignment with business requirements and facilitates easier scaling of the application.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
