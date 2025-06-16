# Mi Blog - Desafío Storyblok Headless CMS

Este proyecto es un blog personal moderno, desarrollado con **React**, **Vite** como bundler y **Tailwind CSS** para un diseño responsivo y elegante. La gestión de todo el contenido se realiza a través de **Storyblok**, un potente Headless CMS. Este proyecto fue creado para participar en el [Storyblok Headless CMS Challenge](https://dev.to/devteam/join-the-storyblok-headless-cms-challenge-3000-in-prizes-154n?).

## 🌟 Características Destacadas y Cumplimiento del Challenge

Nos hemos enfocado en los criterios de evaluación del desafío para ofrecer una experiencia de usuario sólida y un desarrollo eficiente:

-   **Uso Significativo de Storyblok**:
    -   Todo el contenido del blog (posts, títulos, imágenes, contenido enriquecido) se gestiona y consume íntegramente desde Storyblok via su API. Esto demuestra la flexibilidad de un CMS headless.
    -   Se utiliza el concepto de `stories` y `slugs` para la navegación dinámica, permitiendo añadir y gestionar nuevos posts de forma autónoma desde el panel de Storyblok sin tocar el código.
    -   Listo para aprovechar el Visual Editor de Storyblok (configurando el dominio en Storyblok) para una experiencia de edición de contenido en tiempo real.

-   **Creatividad y Diseño**: 
    -   Interfaz de usuario moderna y atractiva con una paleta de colores vibrantes (violetas y naranjas/morados) usando Tailwind CSS.
    -   Diseño responsive que se adapta a diferentes tamaños de pantalla (móvil, tablet, desktop).
    -   Navegación dinámica con `react-router-dom` para una experiencia de usuario fluida.

-   **Facilidad de Uso y Accesibilidad (UX/DX)**:
    -   **UX:** Interfaz limpia y fácil de navegar para el usuario final.
    -   **Accesibilidad:** Implementación de roles y etiquetas `aria-label` en los componentes clave (`App.jsx`, `Home.jsx`, `Post.jsx`) para mejorar la experiencia de usuarios con lectores de pantalla.
    -   **DX (Desarrolladores):** Configuración sencilla con Vite, dependencias actualizadas y un workflow de CI/CD para despliegues automáticos.

-   **Complejidad**:
    -   Integración de un CMS headless con un frontend React moderno.
    -   Manejo de rutas dinámicas y renderizado de contenido enriquecido (Richtext) desde Storyblok.

-   **(Opcional) Categoría Amazing AI**: Este proyecto está preparado para futuras integraciones de IA. Podría incluir funcionalidades como resúmenes automáticos de posts, búsqueda inteligente o generación de contenido con IA, aprovechando la flexibilidad de Storyblok.

## 🚀 Despliegue y Acceso

Este proyecto está configurado para un despliegue continuo en Vercel.

**Demo en vivo:** [https://mi-blog-eta.vercel.app](https://mi-blog-eta.vercel.app) (¡Recuerda actualizar esta URL cuando hagas tu deploy!)

## 📦 Instalación y Uso (Para Testing)

Para probar el proyecto localmente o por parte del jurado:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/mi-blog.git
    cd mi-blog
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura Storyblok API Key:**
    -   Crea una cuenta gratuita en [Storyblok](https://www.storyblok.com/).
    -   Crea un nuevo espacio y copia tu `Preview Token`.
    -   Copia el archivo `.env.example` a `.env` y reemplaza `your_api_key_here` con tu `Preview Token`:
        ```bash
        cp .env.example .env
        ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:5173/home](http://localhost:5173/home) en tu navegador para ver el blog.

### **Configuración en Vercel (para deploy)**

Para el despliegue automático en Vercel:

1.  **Variables de Entorno en Vercel:** Configura `VITE_STORYBLOK_API_KEY` con tu `Preview Token` de Storyblok en el panel de Vercel de tu proyecto.
2.  **Allowed Domains en Storyblok:** Asegúrate de añadir la URL de tu despliegue en Vercel (ej. `https://mi-blog-eta.vercel.app`) en la sección **API tokens > Allowed Domains** dentro de la configuración de tu espacio de Storyblok.
3.  **Archivo `vercel.json`:** Este repositorio incluye un archivo `vercel.json` en la raíz para asegurar que React Router maneje correctamente las rutas en Vercel (esencial para Single Page Applications).

## 🛠 Tecnologías Utilizadas

-   **React**: Biblioteca principal para la interfaz de usuario.
-   **Vite**: Herramienta de construcción y servidor de desarrollo ultrarrápido.
-   **Tailwind CSS**: Framework de CSS para diseño responsivo y utilities-first.
-   **Storyblok**: Headless CMS para la gestión de contenido.
-   **React Router**: Para la navegación en la aplicación.

## 📜 Licencia

MIT
