# My Blog - Storyblok Headless CMS Challenge

This project is a modern personal blog, developed with **React**, **Vite** as the bundler, and **Tailwind CSS** for responsive and elegant design. All content management is handled through **Storyblok**, a powerful Headless CMS. This project was created to participate in the [Storyblok Headless CMS Challenge](https://dev.to/devteam/join-the-storyblok-headless-cms-challenge-3000-in-prizes-154n?).

## 🌟 Key Features and Challenge Compliance

We have focused on the challenge evaluation criteria to deliver a solid user experience and efficient development:

-   **Significant Use of Storyblok**:
    -   All blog content (posts, titles, images, rich content) is managed and consumed entirely from Storyblok via its API, demonstrating the flexibility of a headless CMS.
    -   We utilize the concept of `stories` and `slugs` for dynamic navigation, allowing autonomous addition and management of new posts from the Storyblok panel without touching the code.
    -   Ready to leverage Storyblok's Visual Editor (by configuring the domain in Storyblok) for real-time content editing experience.

-   **Creativity and Design**: 
    -   Modern and attractive user interface with a vibrant color palette (violets and oranges/purples) using Tailwind CSS.
    -   Responsive design that adapts to different screen sizes (mobile, tablet, desktop).
    -   Dynamic navigation with `react-router-dom` for a fluid user experience.

-   **Ease of Use and Accessibility (UX/DX)**:
    -   **UX:** Clean and easy-to-navigate interface for end users.
    -   **Accessibility:** Implementation of roles and `aria-label` tags in key components (`App.jsx`, `Home.jsx`, `Post.jsx`) to enhance the experience for screen reader users.
    -   **DX (Developers):** Simple configuration with Vite, updated dependencies, and a CI/CD workflow for automatic deployments.

-   **Complexity**:
    -   Integration of a headless CMS with a modern React frontend.
    -   Handling of dynamic routes and rendering of rich content (Richtext) from Storyblok.

-   **(Optional) Amazing AI Category**: This project is prepared for future AI integrations. It could include features like automatic post summaries, intelligent search, or AI-powered content generation, leveraging Storyblok's flexibility.

## 🚀 Deployment and Access

This project is configured for continuous deployment on Vercel.

**Live Demo:** [https://mi-blog-eta.vercel.app](https://mi-blog-eta.vercel.app)

## 📦 Installation and Usage (For Testing)

To test the project locally or by the jury:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mi-blog.git
    cd mi-blog
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Storyblok API Key:**
    -   Create a free account on [Storyblok](https://www.storyblok.com/).
    -   Create a new space and copy your `Preview Token`.
    -   Copy the `.env.example` file to `.env` and replace `your_api_key_here` with your `Preview Token`:
        ```bash
        cp .env.example .env
        ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173/home](http://localhost:5173/home) in your browser to view the blog.

### **Vercel Configuration (for deployment)**

For automatic deployment on Vercel:

1.  **Environment Variables in Vercel:** Configure `VITE_STORYBLOK_API_KEY` with your Storyblok `Preview Token` in your project's Vercel panel.
2.  **Allowed Domains in Storyblok:** Make sure to add your Vercel deployment URL (e.g., `https://mi-blog-eta.vercel.app`) in the **API tokens > Allowed Domains** section within your Storyblok space settings.
3.  **`vercel.json` file:** This repository includes a `vercel.json` file in the root to ensure React Router handles routes correctly in Vercel (essential for Single Page Applications).

## 🛠 Technologies Used

-   **React**: Main library for building the user interface. React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.

-   **Vite**: Ultra-fast build tool and development server. Vite is a modern frontend build tool that significantly improves the frontend development experience by providing:
    - Instant server start with native ESM (uses browser's built-in module system for faster development)
    - Hot Module Replacement (HMR) that's extremely fast
    - True on-demand compilation
    - Optimized builds with Rollup

-   **Tailwind CSS**: Utility-first CSS framework for responsive design. Tailwind CSS is a highly customizable, low-level CSS framework that gives you all the building blocks you need to build designs directly in your markup. It provides:
    - Utility-first approach for rapid UI development
    - Responsive design utilities
    - Dark mode support
    - Customizable design system

-   **Storyblok**: Headless CMS for content management. Storyblok is a headless CMS that provides:
    - Visual editing experience
    - Real-time preview
    - Content versioning
    - API-first approach
    - Built-in image optimization

-   **React Router**: For application navigation. React Router is the standard routing library for React that enables:
    - Dynamic routing
    - Nested routes
    - Route parameters
    - Programmatic navigation

-   **Vercel**: Cloud platform for static sites and Serverless Functions. Vercel provides:
    - Automatic deployments from Git
    - Global CDN
    - Serverless Functions
    - Edge Functions
    - Automatic HTTPS
    - Preview deployments for every push

## 📜 License

MIT
