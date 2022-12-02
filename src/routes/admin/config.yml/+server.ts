export const prerender = true;

import { base } from "$app/paths";
import type { RequestHandler } from "@sveltejs/kit";

const NETLIFY_CMS_CONFIG = `
publish_mode: editorial_workflow
media_folder: "static/images"
public_folder: "${base}/images"
slug:
  clean_accents: true
collections:
  - name: "site"
    label: "Configuration générale"
    files:
      - name: "site"
        label: "Site"
        file: "src/lib/content/site.md"
        fields:
          - { name: "layout", label: "Layout", widget: "hidden", default: "site" }
          - { name: "title", label: "Titre", widget: "string" }
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
              - { name: "url", label: "URL", widget: "string" }
  - name: "links"
    label: "Sites publics"
    folder: "src/lib/content/links"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "link" }
      - { name: "title", label: "Titre", widget: "string" }
      - name: "order"
        label: "Priorité"
        widget: "number"
        hint: "Gère l'ordre des ressources, 1 la plus importante (Champ non obligatoire, la ressource est en fin de liste si non rempli)"
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
        collection: "link_categories"
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
      - name: "order"
        label: "Priorité"
        widget: "number"
        hint: "Gère l'ordre des ressources, 1 la plus importante (Champ non obligatoire, la ressource est en fin de liste si non rempli)"
      - name: "icon"
        label: "Icon"
        widget: "select"
        options: ["email", "fichier", "point d'interrogation", "compte", "télécharger"]
        required: false
        hint: "Sur la page d'accueil, cet icône sera placé devant le titre du tutoriel"
      - name: "url"
        label: "Lien externe"
        widget: "string"
        required: false
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
  - name: "resources"
    label: "Ressources"
    folder: "src/lib/content/resources"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "resources" }
      - { name: "title", label: "Titre", widget: "string" }
      - name: "order"
        label: "Priorité"
        widget: "number"
        hint: "Gère l'ordre des ressources, 1 la plus importante (Champ non obligatoire, la ressource est en fin de liste si non rempli)"
      - name: "image"
        label: "Image"
        widget: "object"
        fields:
          - name: "src"
            widget: "image"
            label: "Fichier"
            allow_multiple: false
            hint: "Accessibilité: Utiliser un de fichier significatif"
      - { name: "url", label: "URL", widget: "string" }
      - name: "category"
        label: "Catégorie"
        widget: "relation"      
        collection: "resource_categories"      
        value_field: "title"      
        search_fields: ["title"] 
      - name: "label"
        label: "Description"
        widget: "markdown"
        buttons: ["bold", "italic"]
        editor_components: []
  - name: "link_categories"
    label: "Catégories des liens externes"
    folder: "src/lib/content/link_categories"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "category" }
      - { name: "title", label: "Titre", widget: "string" }
      - { name: "color", label: "Couleur", widget: "color" }
  - name: "resource_categories"
    label: "Catégories des ressources"
    folder: "src/lib/content/resource_categories"
    create: true
    fields:
      - { name: "layout", label: "Layout", widget: "hidden", default: "category" }
      - { name: "title", label: "Titre", widget: "string" }
`;

const NETLIFY_CMS_LOCAL_PRD_CONFIG = `
backend:
  name: github
  repo: digital4better/monaplie
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
export const GET: RequestHandler = async () => {
  return new Response(
    NETLIFY_CMS_CONFIG.concat(
      process.env["NODE_ENV"] === "development"
        ? NETLIFY_CMS_LOCAL_DEV_CONFIG
        : NETLIFY_CMS_LOCAL_PRD_CONFIG
    )
  );
};
