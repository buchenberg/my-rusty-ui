import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
        "Loading": "Loading",
        "Loaded": "Loaded",
        "Error": "Error",
        "Updating": "Updating",
        "Initializing": "Initializing",
        "Id": "Id",
        "Name": "Name",
        "Method": "Method",
        "Path": "Path",
        "Is Enabled": "Is Enabled",
        "Routes": "Routes",
        "Create a Route": "Create a Route",
        "See a Route": "See a Route",
        "Enabled": "Enabled",
        "Disabled": "Disabled",
        "Submit": "Submit",
        "Enter the name of the route...": "Enter the name of the route...",
        "Enter the route path": "Enter the route path...",
        "Select method...": "Select method...",
        "Enabled?": "Enabled?",
        "Error: {{errorMessage}}": "Error: {{errorMessage}}"
    },
  },
  fr: {
    translation: {
        "Loading": "Chargement",
        "Loaded": "Chargé",
        "Error": "Erreur",
        "Updating": "Mise à jour",
        "Initializing": "Initialisation",
        "Id": "Identifiant",
        "Name": "Nom",
        "Method": "Méthode",
        "Path": "Chemin",
        "Is Enabled": "Est Activé",
        "Routes": "Routes",
        "Create a Route": "Créer un Route",
        "See a Route": "Voir un Route",
        "Enabled": "Activé",
        "Disabled": "Désactivé",
        "Submit": "Soumettre",
        "Enter the name of the route...": "Entrez le nom du route...",
        "Enter the route path": "Entrez le chemin du route...",
        "Select method...": "Sélectionnez la méthode...",
        "Enabled?": "Activé?",
        "Error: {{errorMessage}}": "Erreur: {{errorMessage}}"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
