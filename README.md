# Mi Blog - Storyblok Headless CMS Challenge

Este proyecto es un blog personal construido con React, Vite, Tailwind CSS y Storyblok como CMS. Fue desarrollado como parte del [Storyblok Headless CMS Challenge](https://dev.to/devteam/join-the-storyblok-headless-cms-challenge-3000-in-prizes-154n?).

## Características

- **React + Vite**: Desarrollo rápido y eficiente.
- **Tailwind CSS**: Diseño responsive y moderno.
- **Storyblok CMS**: Gestión de contenido flexible y potente.
- **React Router**: Navegación dinámica entre páginas.
- **Accesibilidad**: Diseñado para ser usable por todos.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/mi-blog.git
   cd mi-blog
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Storyblok:
   - Crea una cuenta en [Storyblok](https://www.storyblok.com/).
   - Crea un nuevo espacio y copia tu API key.
   - Crea un archivo `.env` en la raíz del proyecto y añade:
     ```
     VITE_STORYBLOK_API_KEY=tu_api_key
     ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Uso

- **Home**: Lista de posts del blog.
- **Blog Post**: Página individual de cada post.

## Tecnologías

- **React**: Biblioteca para construir interfaces.
- **Vite**: Bundler y servidor de desarrollo.
- **Tailwind CSS**: Framework de estilos.
- **Storyblok**: CMS headless para gestionar contenido.
- **React Router**: Navegación entre páginas.

## Storyblok

Este proyecto utiliza Storyblok como CMS headless. Los posts se almacenan en una carpeta "blog/" en Storyblok, y cada post tiene un título y un slug único. La integración se realiza mediante la API de Storyblok.

## Demo

Puedes ver una demo en vivo aquí: [Demo](https://tu-demo-url.com)

## Recursos

- [Documentación de Storyblok](https://www.storyblok.com/docs)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Licencia

MIT
