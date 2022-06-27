import type { RequestHandler } from "@sveltejs/kit";

const NETLIFY_CMS_CONFIG = `
publish_mode: editorial_workflow
media_folder: "static/images"
public_folder: "images"
slug:
  clean_accents: true
collections:
  - name: "links"
    label: "Liens"
    folder: "src/lib/content/links"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "link" }
      - { name: "title", label: "Titre", widget: "string" }
      - name: "image"
        label: "Image"
        widget: "object"
        fields:
          - name: "src"
            widget: "image"
            label: "Fichier"
            allow_multiple: false
            hint: "Accessibilité: Utiliser un de fichier significatif"
          - name: "alt"
            widget: "string"
            required: false
            label: "Alternative textuelle"
            hint: "Accessibilité: Description textuelle de l'image. L'absence d'alternative masquera l'image aux lecteurs d'écran."
      - { name: "url", label: "URL", widget: "string" }
      - name: "category"
        label: "Catégorie"
        widget: "relation"
        collection: "categories"
        value_field: "title"
        search_fields: ["title"]
      - name: "label"
        label: "Description"
        widget: "markdown"
        buttons: ["bold", "italic"]
        editor_components: []
  - name: "tutorials"
    label: "Tutorials"
    folder: "src/lib/content/tutorials"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "tutorial" }
      - { name: "title", label: "Titre", widget: "string" }
      - name: "icon"
        label: "Icon"
        widget: "object"
        fields:
          - name: "src"
            widget: "image"
            required: false
            label: "Fichier"
            allow_multiple: false
            hint: "Sur la page d'accueil, cet icône sera placé devant le titre du tutoriel"
      - name: "service"
        label: "Service"
        widget: "select"
        default: "generic"
        options:
          - "Générique"
          - "CAF"
          - "Pôle Emploi"
          - "MDPH"
          - "Sécurité sociale"
          - "Compte CPF"
      - name: "steps"
        label: "Étapes"
        widget: "list"
        min: 1
        summary: "{{fields.text | truncate(100, '...')}}" # TODO use "Étape {{index}}" if/when available
        fields:
          - name: "image"
            label: "Image"
            widget: "object"
            fields:
              - name: "src"
                widget: "image"
                required: false
                label: "Fichier"
                allow_multiple: false
                hint: "Accessibilité: Utiliser un nom de fichier significatif"
              - name: "alt"
                widget: "string"
                required: false
                label: "Alternative textuelle"
                hint: "Accessibilité: Description textuelle de l'image. L'absence d'alternative masquera l'image aux lecteurs d'écran."
          - name: "text"
            label: "Description"
            widget: "markdown"
            editor_components: []
  - name: "categories"
    label: "Catégories"
    folder: "src/lib/content/categories"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "category" }
      - { name: "title", label: "Titre", widget: "string" }
      - { name: "color", label: "Couleur", widget: "color" }
  - name: "others"
    label: "Autres"
    files:
      - label: "Barre latérale"
        name: "sidebar"
        file: "src/lib/content/sidebar.md"
        fields:
          - { name: "layout", label: "Layout", widget: "hidden", default: "sidebar" }
          - name: "logo"
            label: "Logo"
            widget: "object"
            fields:
              - name: "src"
                widget: "image"
                label: "Fichier"
                allow_multiple: false
                hint: "Accessibilité: Utiliser un de fichier significatif"
              - name: "alt"
                widget: "string"
                required: false
                label: "Alternative textuelle"
                hint: "Accessibilité: Description textuelle de l'image. L'absence d'alternative masquera l'image aux lecteurs d'écran."
          - { name: "description", label: "Description", widget: "markdown" }
          - name: "details"
            label: "Détails"
            widget: "list"
            min: 1
            collapsed: true
            summary: "{{fields.title}}"
            fields:
              - { name: "title", label: "Titre", widget: "string" }
              - { name: "content", label: "Contenu", widget: "markdown" }
          - name: "links"
            label: "Liens"
            widget: "list"
            min: 1
            collapsed: true
            summary: "{{fields.link}}"
            fields:
              - { name: "title", label: "Titre", widget: "string" }
              - { name: "url", label: "URL", widget: "string" }`;

const NETLIFY_CMS_LOCAL_PRD_CONFIG = `
backend:
  name: github
  repo: digital4better/laplie
  branch: main
  site_domain: enchanting-pegasus-785727.netlify.com`;
const NETLIFY_CMS_LOCAL_DEV_CONFIG = `
backend:
  name: git-gateway
local_backend: true`;

/**
 * Expose specific Netlify CMS configuration according to the environment
 * @returns the Netlify CMS configuration
 */
export const get: RequestHandler = async () => {
  return {
    body: NETLIFY_CMS_CONFIG.concat(
      process.env["NODE_ENV"] === "development"
        ? NETLIFY_CMS_LOCAL_DEV_CONFIG
        : NETLIFY_CMS_LOCAL_PRD_CONFIG
    ),
  };
};
