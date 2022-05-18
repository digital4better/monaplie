import type { RequestHandler } from "@sveltejs/kit";

const NETLIFY_CMS_CONFIG = `
publish_mode: editorial_workflow
media_folder: "static/images"
public_folder: "/images"
slug:
  clean_accents: true
collections:
  - name: "categories"
    label: "Catégories"
    folder: "src/lib/content/categories"
    create: true
    fields:
      - {
          name: "layout",
          label: "Layout",
          widget: "hidden",
          default: "category",
        }
      - { name: "title", label: "Titre", widget: "string" }
      - { name: "color", label: "Couleur", widget: "color" }
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
          - name: "file"
            widget: "image"
            label: "Fichier"
            allow_multiple: false
            hint: "Accessibilité: Utiliser un de fichier significatif"
          - name: "alt"
            widget: "string"
            required: false
            label: "Alternative textuelle"
            hint: "Accessibilité: Description textuelle de l'image"
      - { name: "link", label: "URL", widget: "string" }
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
      - {
          name: "layout",
          label: "Layout",
          widget: "hidden",
          default: "tutorial",
        }
      - { name: "title", label: "Titre", widget: "string" }
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
        fields:
          - name: "image"
            label: "Image"
            widget: "object"
            fields:
              - name: "file"
                widget: "image"
                required: false
                label: "Fichier"
                allow_multiple: false
                hint: "Accessibilité: Utiliser un de fichier significatif"
              - name: "alt"
                widget: "string"
                required: false
                label: "Alternative textuelle"
                hint: "Accessibilité: Description textuelle de l'image"
          - name: "text"
            label: "Description"
            widget: "markdown"
            editor_components: []`;

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
    body:
      process.env["NODE_ENV"] === "development"
        ? NETLIFY_CMS_CONFIG.concat(NETLIFY_CMS_LOCAL_DEV_CONFIG)
        : NETLIFY_CMS_CONFIG,
  };
};
