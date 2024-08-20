# Book GPT

This repository contains the backend for a project aimed at creating a way for users to interact with books they have previously read. The core idea is to allow users to engage in conversations with the content of their books by leveraging a custom file storage and vector store system.

## Project Status

⚠️ **Work in Progress**: This project is still under development. Many core functionalities are not yet implemented, and the code is subject to significant changes. Contributions and feedback are welcome as the project evolves.

## Overview

The backend is built using [NestJS](https://nestjs.com/), a progressive Node.js framework. It integrates GraphQL to provide an API for managing books and interactions, alongside a custom vector store for handling and querying book content.

### Core Modules

- **Files Module**: Handles the creation, storage, and management of book files.
- **Messages Module**: Manages user interactions (messages) related to the book content.
- **Vector Store Module**: Implements a vector store using PostgreSQL to store and query book content in a way that facilitates interaction.

### Key Use Cases

- **CreateFileUsecase**: Processes and stores a book file, splitting its content into manageable parts for efficient storage and querying.
- **CreateMessageUsecase**: Manages user interactions with book content by storing messages linked to specific parts of a book.
- **FindAllFilesUsecase**: Retrieves all stored book files.
- **FindFileByIdUsecase**: Retrieves a specific book file by its ID.
- **RemoveFileUsecase**: Removes a book file and its related content from the vector store.

## GraphQL API

The backend exposes a GraphQL API, which can be used to:

- Upload and manage book files.
- Interact with book content via messages.
- Retrieve and query book content.

## Technology Stack

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **GraphQL**: A query language for your API, allowing clients to request specific data and aggregate results from multiple sources.
- **PostgreSQL**: An open-source relational database system used here as a vector store for managing and querying book content.
- **LangChain**: A library used for handling and interacting with vector data and integrating it into the system.
- **Docker & Docker Compose**: Tools for containerizing and managing application services, including the PostgreSQL database setup.


## Roadmap

The roadmap for the project includes the following:

1. **Develop Bot's Message Responses**: Implement and refine the bot's capability to respond to user interactions effectively.
2. **Develop Collections for Multiple File Interactions**: Enable the system to handle interactions with multiple files simultaneously.
3. **Transform into a Monorepo with Angular Frontend**: Transition the project into a monorepo structure, with the frontend developed using Angular.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Bruno Catais Costa](https://www.linkedin.com/in/bruno-catais/)