# WebDev Cards

**WebDev Cards** is a Single Page Application built with **React + Vite + JSON server**.

The goal of this project is to practice and deepen understanding of core React concepts by building a practical, feature-rich learning application.

It allows users to create, manage, and review knowledge cards related to modern web development technologies.

## ![App Preview Desktop](./src/assets/preview/image.png)

# Project Purpose

This project was created as part of my path of learning and practicing React development.

The main objectives are:

- Practice React in a real project environment
- Build a scalable Single Page Application architecture
- Improve state management patterns
- Implement authentication and protected routes
- Work with forms, pagination, and filtering
- Apply clean component design and separation of concerns

Although the application contains default development-related cards, users can freely create and manage their own knowledge cards.

_This project is also designed as a personal learning tool. I actively use this application to organize and review knowledge related to web development. By regularly creating and revisiting cards, the goal is to reinforce important concepts and build a structured knowledge base for my everyday development work._

---

# Main Idea

WebDevCards is a knowledge management tool designed for developers who want to organize and review important concepts from different web technologies.

Each card contains:

- Title
- Category (HTML, CSS, JavaScript, React, TypeScript, Git, Web Basics)
- Short Description
- Extended Description
- Example of using or code example (not done yet)
- Links
- Knowledge Status (Completed / Not completed)

Users can:

- Create cards
- Edit cards
- Delete cards
- Mark cards as completed or not completed
- Filter cards by category
- Navigate through paginated results
- Use automatic light / dark theme detection

## How to run

1. Run the clone command in the the folder where you want the project

```bash
git clone https://github.com/ep1cvoice/WebDev-Cards.git
```
2. Install dependencies

```bash
npm install
```

3. Start JSON Server (mock backend)

```bash
npm run server
```

4. Start the frontend (in a separate terminal! ⚠️)

```bash
npm run dev
```

## Backend (JSON Server)

The project uses JSON Server as a mock REST API.

- Contains predefined development-related cards
- Data is loaded dynamically after server startup
- Simulates real backend behavior for development purposes

## Supported Technologies (Categories)

Currently supported categories:

- HTML
- CSS
- JavaScript
- React
- TypeScript
- Git
- Web Basics

Users can create cards for any of these technologies.

## Core Features

### Card Management (CRUD)

- Create new cards
- Edit existing cards
- Delete cards
- Toggle knowledge status

### Pagination

- Paginated card list
- Dynamic page navigation
- Efficient rendering

### Filtering

- Filter by selected technology
- Display only relevant concepts

### Search

- Search cards by keywords
- Quickly locate specific concepts or topics
- Filters results dynamically while typing

### Sorting

- Sort cards by completion status
- Sort completed and not completed cards
- Flexible ordering to quickly review unfinished topics

### Theme Support

- Automatic theme detection based on system preferences
- Dark or light mode applied automatically
- Manual theme switch planned for a future update

## Upcoming Improvements

The following features are planned for future updates:

- Manual light / dark theme switch
- Theme preference stored in localStorage
- Example usage field inside cards
- Predefined learning card set covering HTML, CSS, JavaScript and React
- Option to remove all predefined cards and start with an empty collection

## React Concepts Practiced

This project is designed to cover and reinforce:

- Functional Components
- Props
- useState
- useEffect
- Conditional Rendering
- Controlled Forms
- Lifting State Up
- Component Composition
- Custom Hooks
- Context API
- React Router
- Protected Routes
- Pagination Logic
- Form Validation
- Performance Optimization (memo, useCallback, useMemo)

## Architecture Overview

- Single Page Application (SPA)
- Modular component structure
- Reusable UI components (Button, Card, Form, Badge, etc.)
- Clear separation of concerns
- Organized folder structure

## Learning Goals

WebDev Cards is about:

- Understanding how React works internally
- Building scalable frontend architecture
- Practicing state management patterns
- Gaining confidence with real-world SPA development
- Writing clean and maintainable code
- Use app for myself in everyday-learning dev process

## Screenshots presenting UI and responsiveness

### Desktop dark theme

![App Preview Desktop](./src/assets/preview/card-page.png)
![App Preview Desktop](./src/assets/preview/edit-card.png)

---

### Mobile light theme

![App Preview Desktop](./src/assets/preview/preview.png)
![App Preview Desktop](./src/assets/preview/preview2.png)
