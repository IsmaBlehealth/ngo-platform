export type BlogPost = {
  title: string;
  category: string;
  publishedAt: string;
  image: string;
  content: string;
  excerpt: string;
};

export const blogPosts: Record<string, BlogPost> = {
  "about-child-trauma": {
    title: "About Child Trauma",
    category: "Healthcare",
    publishedAt: "2024-09-19",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
    excerpt:
      "A traumatic event is a frightening, dangerous, or violent event that poses a threat to a child's life or bodily integrity.",
    content:
      "A traumatic event is a frightening, dangerous, or violent event that poses a threat to a child's life or bodily integrity. Experiencing abuse or neglect can have lasting effects on a child's mental and physical health. Early intervention and support are crucial for helping children recover from trauma and build resilience.\n\nSigns of trauma in children may include changes in behavior, sleep disturbances, difficulty concentrating, withdrawal from activities, and increased anxiety or fearfulness. As an organization committed to the well-being of underserved communities, we work to provide access to mental health resources and support services for children who have experienced traumatic events.",
  },
  "global-impact-of-clean-water": {
    title: "Global Impact of Clean Water on Health and Development",
    category: "Clean Water",
    publishedAt: "2024-09-19",
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&h=600&fit=crop",
    excerpt:
      "Clean water initiatives play a crucial role in shaping the health and development of communities around the world.",
    content:
      "Clean water initiatives play a crucial role in shaping the health and development of communities around the world. Access to clean and safe drinking water reduces waterborne diseases, improves nutrition, and supports educational outcomes. When communities have reliable water sources, children — especially girls — can attend school instead of spending hours fetching water.\n\nGlobal Approach To Development has been working to provide clean water solutions in West Africa, including well construction and water purification systems. Our efforts have helped reduce waterborne illness and improved the overall quality of life for thousands of families.",
  },
  "scholarships-for-underprivileged": {
    title: "Scholarships for Underprivileged: Breaking Barriers",
    category: "Education",
    publishedAt: "2024-09-19",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=600&fit=crop",
    excerpt:
      "Scholarships provide a critical lifeline for underprivileged students, allowing them to pursue higher education despite financial hardships.",
    content:
      "Scholarships provide a critical lifeline for underprivileged students, allowing them to pursue higher education despite financial hardships. Education is the most powerful tool for breaking the cycle of poverty.\n\nThrough our Education & Scholarships program, we have helped students in Cote d'Ivoire and Mali access quality education. Our school in Cote d'Ivoire serves 332 students with a 99% national passing rate. In Mali, we run children's clubs, literacy courses, and art education programs across three villages. Every scholarship awarded represents a future transformed.",
  },
  "mobile-health-clinics": {
    title: "Mobile Health Clinics Bringing Aid to Remote Regions",
    category: "Healthcare",
    publishedAt: "2024-09-19",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    excerpt:
      "Mobile health clinics are revolutionizing access to healthcare for populations in remote and underserved regions.",
    content:
      "Mobile health clinics are revolutionizing access to healthcare for populations in remote and underserved regions. These clinics bring essential medical services directly to communities that lack access to hospitals and clinics. Services typically include preventive care, maternal and child health, vaccinations, and health education.\n\nGlobal Approach To Development operates healthcare programs in three villages in the Sikasso region of Mali, providing medical care and health education to communities that would otherwise have no access to healthcare services.",
  },
};

export const categoryColors: Record<string, { bg: string; text: string }> = {
  Healthcare: { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Clean Water": { bg: "bg-blue-100", text: "text-blue-700" },
  Education: { bg: "bg-purple-100", text: "text-purple-700" },
};

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
