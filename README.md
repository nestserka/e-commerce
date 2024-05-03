# NASA E-commerce Project

## Description

Welcome to the NASA Ecommerce Project! This project is a culmination of the efforts of students from the RS School, driven by a shared passion for space exploration and technology.

At its core, the NASA Ecommerce Project aims to serve as a hub for space enthusiasts, providing them with a seamless platform to explore and purchase merchandise related to NASA missions, space exploration, and astronomy. Whether you're a seasoned astronomer, a devoted fan of space exploration, or simply someone with a curiosity about the cosmos, our platform is designed to cater to your needs and interests.

One of the key features of our platform is its user-friendly interface, designed to provide an intuitive browsing and shopping experience. Users can easily navigate through categories, search for specific items using keywords or mission names, and explore detailed product descriptions and images before making a purchase.

In addition to its ecommerce functionalities, the NASA Ecommerce Project also offers users the opportunity to create accounts, enabling them to track their order history. We welcome feedback from our users and actively seek to incorporate new features and enhancements to make the NASA Ecommerce Project even better.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Available Scripts](#available-scripts)
5. [Authors](#authors)
6. [License](#license)

## Features

- Browse a wide selection of NASA-themed merchandise including apparel, accessories, and collectibles.
- Search for specific items based on keywords, categories, or mission names.
- View detailed product descriptions, images, and prices.
- Add items to a shopping cart and proceed to checkout securely.
- Create an account to track order history and manage shipping details.

## Technologies Used

- Frontend:

  - 💻 Vite
  - ⚛️ React
  - ⚛️ React DOM
  - 🔷 Typescript
  - 🎨 SASS
  - 🧩 Zustand

- Backend:

  - 🛠️ CommerceTools

- DevTools and Utilities:

  - 🛠️ Husky
  - 🔍 ESLint (with plugins for TypeScript and React)
  - 📝 Commitlint
  - 🧹 Lint-staged
  - 🛠️ Prettier
  - 🎨 Stylelint (with related configurations and plugins)

- Testing Frameworks:

  - 🧪 Jest
  - 🧪 Vitest
  - 🧪 Testing Library (Jest-DOM, React)

- Design and Project Management Tools:
  - 🎨 [Figma](https://www.figma.com/file/7cGwEtz80z2Kw5Rc7YQ7Ku/E-comm-Mockups?type=design&node-id=3-10&mode=design&t=HdRoSWX4h4thPlYq-0)
  - 📊 [Jira](https://e-commerce-001.atlassian.net/jira/software/projects/NASA/boards/1?atlOrigin=eyJpIjoiNjI0ZGM2YTI3Y2Q3NGEyYjljMGE3NDM5ODU2NjNkZTkiLCJwIjoiaiJ9)

## Setup Instructions

1. **Install Node.js**

2. **Obtain the Project Files:**
   you have two options for obtaining the project files:

   - **Fork the Repository:**
     If you plan to contribute to the project or make changes to the code, it's recommended to fork the repository. This will create a copy of the repository under your GitHub account.
     [Fork the repository](https://github.com/nestserka/e-commerce/fork) to create a copy under your account.

   - **Download the Repository:**
     If you only intend to use the project locally and don't plan to contribute changes, you can simply download the repository as a ZIP file.
     [Download the repository](https://github.com/nestserka/e-commerce/archive/refs/heads/main.zip) as a ZIP file and extract it to your local machine.

3. **Clone the Repository (if Forked):**
   if you forked the repository, clone your newly created repo to your local machine using the following command:

   ```bash
   git clone https://github.com/your-username/e-commerce.git
   ```

4. **Navigate to the Project Directory:**
   once you have obtained the project files (either by forking or downloading), navigate to the project directory:

   ```bash
   cd e-commerce
   ```

5. **To install all dependencies use:**

   ```bash
   npm install
   ```

6. **Create a .env file in the root directory of the project:**
   refer to the `.env.example` file as a reference or template for configuring .env file and add the environment variables with your own values.

7. **Build the Project:**

   to build the project, use the following command:

   ```bash
   npm run build
   ```

8. **Preview the Project:**
   to preview the project, use the following command:

   ```bash
   npm run preview
   ```

9. **Troubleshooting:**
   if you encounter any issues during the setup process or while running the project, please don't hesitate to reach out to the authors for assistance.

## Available Scripts

In the project directory, you can run:

1. To run the Vite development server, use: `npm run dev`
2. To run the Vite preview, use: `npm run preview`
3. To build the project, use: `npm run build`
4. To format code using Prettier, use: `npm run format`
5. To lint TypeScript and TypeScript React files using ESLint, use: `npm run lint`
6. To fix linting issues in TypeScript and TypeScript React files using ESLint, use: `npm run lint:fix`
7. To prepare the project for Husky Git hooks, use: `npm run prepare`
8. To run Vitest tests, use: `npm test`
9. To run Vitest tests in UI mode, use: `npm run test:ui`
10. To run Vitest tests with coverage, use: `npm run coverage`
11. To remove the `dist` directory, use: `npm run clear`

## Authors

[![marblehands](./public/assets/github-pics/github_pic_marblehands.png)](https://github.com/marblehands)
[![nestserka](./public/assets/github-pics/github_pic_nestserka.png)](https://github.com/nestserka)
[![craftsw0man](./public/assets/github-pics/github_pic_craftsw0man.png)](https://github.com/CRAFTSW0MAN/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
