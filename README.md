# monaplie.fr

## Description

monaplie.fr est une application web responsive créée à la demande du PLIE (Plan Local d’Insertion pour l’Emploi) de la métropole nantaise. Elle rassemble un ensemble de ressources en ligne permettant aux utilisateurs de se réinsérer plus facilement dans la vie active.

## Installation & fonctionnement

```sh
# installation des dépendances
npm install

# démarrage du serveur de développement
npm run dev


# création d'une version de production
npm run build

# prévisionnage de la version
npm run preview

> L'application est déployé sur Github Pages
```

## Technologies

- Typescript : langage JavaScript typé
- Framework Sveltekit : générateur d'applications web statiques
- Netlify CMS : gestionnaire de contenu

## Structure du projet

Le projet respecte la structure type de Sveltekit. [Voir leur doc](https://kit.svelte.dev/docs/project-structure)

Le contenu géré par Netlify est stocké dans des fichiers Markdown (`src/lib/content/*/*.md`).
Ce gestionnaire de contenu est configuré dans le fichier `src/routes/admin/config.yml/+server.ts`.