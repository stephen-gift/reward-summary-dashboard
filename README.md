# Rewards Summary Page - Balanceè Platform

This project is a **Rewards Summary Page** built as part of the Balanceè platform. It enables customers to track their cashback earnings, view transaction history, and cash out rewards. The page is developed using **Next.js**, providing a smooth user experience while ensuring scalability and performance.

## Table of Contents

- [Overview](#overview)
  - [Links](#links)
- [Technologies Used](#technologies-used)
- [Why Next.js](#why-nextjs-over-react)
- [Key Features](#key-features)
- [Setup Instructions](#setup-instructions)
  - [Clone the repository](#clone-the-repository)
  - [Install dependencies](#install-dependencies)
  - [Run the development server](#run-the-development-server)
- [My Process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

The Rewards Summary Page allows customers to view their total cashback earnings, transaction history, and choose from various cashout options. With features such as form validation and state management, the page ensures a reliable, user-friendly experience.

### Links

- Live Site URL: [Balanceè Rewards Summary](https://reward-summary-dashboard.vercel.app/)
- GitHub URL: [Repository](https://github.com/stephen-gift/reward-summary-dashboard/)

## Technologies Used

- **Next.js**: A React-based framework for building fast, optimized web applications.
- **Zustand**: A simple, small, and fast state management library for managing global states efficiently.
- **Formik**: A form library that simplifies form management, validation, and handling in React applications.
- **Yup**: Schema-based validation used in conjunction with Formik for form validation.
- **React Icons**: A collection of popular icons for easily adding icons to the UI.

## Why Next.js Over React

I chose **Next.js** over traditional **React** for several key reasons:

1. **Server-Side Rendering (SSR)**: Next.js provides built-in SSR, which allows the rewards page to be pre-rendered on the server, improving performance and SEO. This is crucial for e-commerce websites where quick loading times and search engine visibility are critical.

2. **Static Site Generation (SSG)**: Since this page is a part of a static e-commerce platform, Next.js’ SSG capabilities allow the rewards page to be generated at build time, resulting in lightning-fast load times and reduced server load.

3. **File-Based Routing**: Next.js simplifies routing by using a file-based system. This eliminates the need to configure routes manually, making the project more organized and maintainable.

4. **Optimized Performance**: With features like automatic image optimization and code-splitting, Next.js ensures the website is fast, even with large data loads like cashback transactions and history.

5. **Full-Stack Capabilities**: Next.js offers an API layer, which can be extended in the future for building APIs within the same codebase, making it a more flexible choice for future platform enhancements.

## Key Features

1. **Earnings Overview**:
    - Displays the customer's total cashback earnings and current available balance.

2. **Cashback History**:
    - Lists all previous cashback transactions with details like transaction date and amount.

3. **Cashout Options**:
    - Allows users to cash out their cashback rewards through direct cashout or promo codes.

4. **Form Validation**:
    - Using Formik and Yup, the page provides robust form validation, ensuring correct user input.

5. **State Management**:
    - Zustand is used to manage global states efficiently, making the application lightweight and easy to maintain.

6. **Icon Integration**:
    - React Icons are used to seamlessly integrate visually appealing icons into the UI, enhancing user interaction.

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/your-username/rewards-summary-page.git
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Access the development server at [http://localhost:3000](http://localhost:3000).

## My Process

### Built With

- **Next.js**: For SSR, SSG, routing, and performance optimization.
- **Zustand**: For global state management.
- **Formik**: For form handling.
- **Yup**: For form validation.
- **React Icons**: For icon integration into the UI.
- **Chakra UI**: For responsive and accessible component-based design.
- **Framer Motion**: For animations and transitions.

### What I Learned

- **Next.js Performance Benefits**: Leveraging SSR and SSG features allowed me to build a fast and SEO-optimized rewards page.
- **State Management with Zustand**: Zustand provided a simpler state management solution compared to more complex libraries like Redux, while maintaining excellent performance.
- **Formik and Yup Integration**: Formik and Yup helped create robust, validated forms that ensure the integrity of user inputs.

### Continued Development

- **API Integration**: The next step involves connecting the page to live Balanceè APIs to display real-time cashback data.
- **Enhanced Cashout Options**: Adding more cashout methods, such as cryptocurrency or platform-specific gift cards, could offer more flexibility to users.

## Author

- **Stephen Gift Dada**
    - Portfolio: [stephengift.vercel.app](https://stephengift.vercel.app/)
    - LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/stephen-gift-8894131b6)
    - GitHub: [@stephen-gift](https://github.com/stephen-gift)
    - Email: [stephengift43@gmail.com](mailto:stephengift43@gmail.com)

