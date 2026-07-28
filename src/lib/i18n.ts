export type Locale = "en" | "fr";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Programs",
    "nav.impact": "Our Impact",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.donate": "Donate",
    "hero.title": "Progress Through Equal Opportunity",
    "hero.subtitle": "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    "hero.cta": "Donate Now",
    "hero.learn": "Learn More",
    "footer.mission": "Our Mission",
    "footer.mission.desc": "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    "footer.contact": "Contact Us",
    "footer.programs": "Programs",
    "footer.quickLinks": "Quick Links",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "donate.title": "Make a Difference",
    "donate.onetime": "One-Time",
    "donate.monthly": "Monthly",
    "donate.submit": "Donate Now",
    "dashboard.welcome": "Welcome back",
    "newsletter.title": "Stay Updated",
    "newsletter.desc": "Subscribe to our newsletter for the latest updates on our programs and impact.",
    "common.loading": "Loading...",
    "common.save": "Save Changes",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.programs": "Programmes",
    "nav.impact": "Notre Impact",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.donate": "Donner",
    "hero.title": "Le Progrès par l'Égalité des Opportunités",
    "hero.subtitle": "Construire des avenirs durables grâce à l'eau potable, à l'éducation de qualité et aux soins de santé accessibles en Afrique de l'Ouest.",
    "hero.cta": "Donner Maintenant",
    "hero.learn": "En Savoir Plus",
    "footer.mission": "Notre Mission",
    "footer.mission.desc": "Construire des avenirs durables grâce à l'eau potable, à l'éducation de qualité et aux soins de santé accessibles en Afrique de l'Ouest.",
    "footer.contact": "Contactez-nous",
    "footer.programs": "Programmes",
    "footer.quickLinks": "Liens Rapides",
    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "donate.title": "Faites la Différence",
    "donate.onetime": "Ponctuel",
    "donate.monthly": "Mensuel",
    "donate.submit": "Donner Maintenant",
    "dashboard.welcome": "Bienvenue",
    "newsletter.title": "Restez Informé",
    "newsletter.desc": "Abonnez-vous à notre newsletter pour les dernières mises à jour sur nos programmes et notre impact.",
    "common.loading": "Chargement...",
    "common.save": "Enregistrer",
  },
} as const;

export function t(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}
