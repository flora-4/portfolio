<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import siteLTSA from "../assets/site-ltsa.png";
import restauUI from "../assets/restaurant-ui.png";
import marienegoce from "../assets/marienegoce.png";
import servicesSupply from "../assets/services-supply.png";
import parfumUI from "../assets/parfum-ui.png";
import artAncestral from "../assets/art-ancestral.png";
import livresUI from "../assets/livres-ui.png";
import biotech from "../assets/biotech.png";

const router = useRouter(); // importé pour compatibilité avec useNavigate initial (non utilisé ici)

const projects = [
  {
    id: 1,
    title: "Site web du LTSA",
    category: "Site Institutionnel",
    description:
      "Développement complet du site officiel du Laboratoire de Technologies et Systèmes Appliqués de l'Université de Douala",
    technologies: ["WordPress", "PHP", "MySQL", "CSS3", "JavaScript"],
    link: "https://ltsa-univ-dla.cm/",
    type: "Site Web",
    status: "En ligne",
    year: "2025",
    image: siteLTSA,
  },
  {
    id: 2,
    title: "Gestion Restaurant - Maquette",
    category: "UI/UX Design",
    description:
      "Conception complète d'une interface de gestion pour restaurants, glaciers et fast-food avec système de commandes et réservations",
    technologies: ["Figma", "UI/UX", "Prototypage", "Design System"],
    link: "https://www.figma.com/proto/uojSAtemNGivKeGdACXKre/Untitled?page-id=0%3A1&node-id=69-608&p=f&viewport=46%2C25%2C0.03&t=AoDgknAwAysJzRUP-1&scaling=scale-down-width&content-scaling=fixed",
    type: "Prototype",
    status: "Terminé",
    year: "2025",
    image: restauUI,
  },
  {
    id: 3,
    title: "Marienegoce",
    category: "E-commerce",
    description:
      "Plateforme de vente en ligne de produits agro-alimentaires avec système de paiement et gestion des stocks",
    technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "Payment Gateway"],
    link: "https://marienegoce.com/",
    type: "E-commerce",
    status: "En ligne",
    year: "2024",
    image: marienegoce,
  },
  {
    id: 4,
    title: "Services & Supply",
    category: "Site Commercial",
    description:
      "Site de vente de matériaux de construction et services avec catalogue produits et système de devis",
    technologies: ["WordPress", "Custom Theme", "PHP", "JavaScript", "MySQL"],
    link: "https://servicesandsupply.net/",
    type: "Site Web",
    status: "En ligne",
    year: "2024",
    image: servicesSupply,
  },
  {
    id: 5,
    title: "Maquette Site Parfums",
    category: "UI/UX Design",
    description:
      "Design moderne pour un site de vente de parfums de marques avec interface élégante et expérience utilisateur optimisée",
    technologies: ["Figma", "Adobe XD", "Design System", "Responsive Design"],
    link: "https://www.figma.com/design/zmTd7f4oOmbd1KRNlir3so/siteweb?node-id=1-2&t=BpXZCpnjVbbhcxga-1",
    type: "Maquette",
    status: "Terminé",
    year: "2024",
    image: parfumUI,
  },
  {
    id: 6,
    title: "Art Ancestral",
    category: "Site Culturel",
    description:
      "Site d'exposition et vente de statues ancestrales avec galerie interactive et système de commande",
    technologies: ["WordPress", "Custom Gallery", "PHP", "JavaScript", "CSS3"],
    link: "https://art.marienegoce.com/",
    type: "Site Web",
    status: "En ligne",
    year: "2024",
    image: artAncestral,
  },
  {
    id: 7,
    title: "Maquette Livres Électroniques",
    category: "UI/UX Design",
    description:
      "Interface moderne pour plateforme de vente de livres électroniques avec système de lecture intégré",
    technologies: ["Figma", "UI/UX", "Wireframing", "User Research"],
    link: "https://www.figma.com/design/drHcbOkgayRW6ufnqTRQxu/site1-eCom?node-id=0-1&t=To4xRhmPTjW5wh9y-1",
    type: "Maquette",
    status: "Terminé",
    year: "2024",
    image: livresUI,
  },
  {
    id: 8,
    title: "Laboratoire Biotech",
    category: "Site Scientifique",
    description:
      "Site professionnel pour laboratoire de biotechnologie avec présentation des services et équipements",
    technologies: ["WordPress", "Custom Theme", "PHP", "MySQL", "Responsive"],
    link: "https://lbiotech.marienegoce.com/",
    type: "Site Web",
    status: "En ligne",
    year: "2024",
    image: biotech,
  },
];

const categories = ["Tous", "Site Web", "E-commerce", "UI/UX Design", "Maquette", "Prototype"];

const isVisible = ref(false);
const selectedCategory = ref("Tous");
const hoveredProject = ref(null);
const imageErrors = ref({});

onMounted(() => {
  const timer = setTimeout(() => (isVisible.value = true), 300);
  // cleanup not strictly necessary here (component unmount will clear), but follow good practice
  // no access to unmount hook in <script setup> without defineExpose — acceptable
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === "Tous") return projects;
  return projects.filter(
    (p) => p.type === selectedCategory.value || p.category.includes(selectedCategory.value)
  );
});

function handleImageError(index) {
  imageErrors.value[index] = true;
}
function handleImageLoad(index) {
  imageErrors.value[index] = false;
}

function getStatusGradient(status) {
  switch (status) {
    case "En ligne":
      return "linear-gradient(90deg, #10b981, #059669)"; // green -> emerald
    case "Terminé":
      return "linear-gradient(90deg, #3b82f6, #06b6d4)"; // blue -> cyan
    case "En cours":
      return "linear-gradient(90deg, #f59e0b, #f97316)"; // yellow -> orange
    default:
      return "linear-gradient(90deg, #6b7280, #4b5563)"; // gray
  }
}
</script>

<template>
  <div class="projects-root">
    <!-- Header -->
    <header class="projects-header">
      <h2 class="projects-title">
        MES
        <span class="gradient-clip"> PROJETS</span>
        <div class="scan-effect"></div>
      </h2>
      <p class="projects-sub">
        Découvrez une sélection de mes réalisations, allant du développement web au design d'interfaces
      </p>
    </header>

    <!-- Filters -->
    <div class="filters-wrap">
      <div class="filters">
        <button
          v-for="(cat, i) in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: selectedCategory === cat || selectedCategory === cat }"
          @click="selectedCategory = cat"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <span :class="{ chosen: selectedCategory === cat }">{{ cat }}</span>
        </button>
      </div>
    </div>

    <!-- Grid -->
    <main class="grid-wrap">
      <div class="grid">
        <div
          v-for="(project, idx) in filteredProjects"
          :key="project.id"
          class="project-item"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <!-- Glow background (appears on hover) -->
          <div
            class="project-glow"
            :style="{
              opacity: hoveredProject === project.id ? 0.6 : 0,
              background:
                'linear-gradient(90deg, rgba(34,211,238,0.25), rgba(168,85,247,0.18), rgba(236,72,153,0.18))'
            }"
          />

          <!-- Card -->
          <article class="project-card" :class="{ hovered: hoveredProject === project.id }">
            <!-- Image area -->
            <div class="project-media">
              <img
                v-if="!imageErrors[idx]"
                :src="project.image"
                :alt="project.title"
                class="project-image"
                @error="handleImageError(idx)"
                @load="handleImageLoad(idx)"
                loading="lazy"
              />
              <div v-else class="fallback">
                {{ project.title.split(' ').map(w => w[0]).join('').slice(0, 3) }}
              </div>

              <!-- Status badge -->
              <div
                class="badge status-badge"
                :style="{ background: getStatusGradient(project.status) }"
              >
                {{ project.status }}
              </div>

              <!-- Year badge -->
              <div class="badge year-badge">
                {{ project.year }}
              </div>

              <!-- Hover overlay with link -->
              <div class="media-overlay" :class="{ visible: hoveredProject === project.id }">
                <a :href="project.link" target="_blank" rel="noopener noreferrer" class="visit-btn">
                  Voir le projet →
                </a>
              </div>
            </div>

            <!-- Content -->
            <div class="project-body">
              <span class="category">{{ project.category }}</span>
              <h3 class="project-title" :class="{ accent: hoveredProject === project.id }">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description }}</p>

              <div class="techs">
                <span
                  v-for="(t, i) in project.technologies.slice(0, 3)"
                  :key="t"
                  class="tech-pill"
                  :class="{ active: hoveredProject === project.id }"
                >
                  {{ t }}
                </span>
                <span v-if="project.technologies.length > 3" class="more-pill">
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.projects-root {
  min-height: 100vh;
  padding: 40px 20px;
  color: #e6eef6;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.projects-header {
  text-align: center;
  margin-bottom: 28px;
  margin-top: 30px;
}
.projects-title {
  font-size: 50px;
  font-weight: 800;
  display: inline-block;
  position: relative;
  margin: 0;
  color: #ffffff;
}
.gradient-clip {
  background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-left: 8px;
  animation: gradientShift 6s linear infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.projects-sub {
  color: #9aa9b8;
  max-width: 900px;
  margin: 12px auto 0;
  line-height: 1.6;
}

.scan-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.12), transparent);
  transform: translateX(-100%);
  animation: title-scan 3s ease-in-out infinite;
  border-radius: 2px;
}
@keyframes title-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Filters */
.filters-wrap {
  display: flex;
  justify-content: center;
  margin: 28px 0;
}
.filters {
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(100,116,139,0.25);
  padding: 12px;
  border-radius: 28px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.filter-btn {
  background: transparent;
  border: 0;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  color: #9aa9b8;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}
.filter-btn:hover {
  color: #ffffff;
  transform: translateY(-2px);
}
.filter-btn .chosen {
  color: #fff;
}
.filter-btn.active,
.filter-btn .chosen {
  color: #fff;
}


.grid-wrap {
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 12px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}


.project-item {
  position: relative;
  transform: translateY(0);
  transition: transform 0.4s ease;
}
.project-item:hover {
  z-index: 10;
}

.project-glow {
  position: absolute;
  inset: -6px;
  border-radius: 20px;
  filter: blur(20px);
  pointer-events: none;
  transition: opacity 0.6s ease;
}

.project-card {
  background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(8,12,20,0.45));
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(100,116,139,0.18);
  box-shadow: 0 8px 24px rgba(3,7,18,0.6);
  transition: transform 0.45s cubic-bezier(.2,.9,.2,1), border-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.project-card.hovered {
  transform: translateY(-12px) scale(1.01);
  border-color: rgba(34,211,238,0.22);
  box-shadow: 0 18px 48px rgba(34,211,238,0.08);
}

.project-media {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(10,20,40,0.85), rgba(0,0,0,0.25));
}
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.project-card:hover .project-image {
  transform: scale(1.08);
}
.fallback {
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  color:#67e8f9;
  background: linear-gradient(135deg, rgba(34,211,238,0.06), rgba(99,102,241,0.06));
}

.badge {
  position: absolute;
  top: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
  box-shadow: 0 4px 18px rgba(0,0,0,0.5);
}
.status-badge {
  right: 14px;
}
.year-badge {
  left: 14px;
  background: rgba(0,0,0,0.45);
  color: #67e8f9;
  border: 1px solid rgba(34,211,238,0.12);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6) 40%, transparent 100%);
  opacity: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 18px;
  transition: opacity 0.35s ease;
}
.media-overlay.visible {
  opacity: 1;
}
.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #06b6d4, #8b5cf6);
  color: #fff;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transform-origin: center;
  transition: transform 0.25s ease;
}
.visit-btn:hover { transform: translateY(-3px) }

/* Body */
.project-body {
  padding: 18px;
}
.category {
  color: #67e8f9;
  font-weight: 700;
  font-size: 13px;
}
/* Harmonisation du titre avec les autres sections */
.projects-title {
  font-size: 3rem; /* ≈ 48px : cohérent avec la section Expériences */
  font-weight: 900;
  display: inline-block;
  position: relative;
  margin: 0;
  color: #ffffff;
  line-height: 1.1;
}

@media (max-width: 768px) {
  .projects-title {
    font-size: 2.4rem; /* bonne lisibilité sur tablette */
  }
}

@media (max-width: 480px) {
  .projects-title {
    font-size: 2rem; /* même taille mobile que les autres */
  }
}

.project-title.accent {
  color: #06b6d4;
}
.project-desc {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
  max-height: 3.6em; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.techs {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tech-pill {
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 8px;
  background: rgba(71,85,105,0.18);
  color: #9aa9b8;
  border: 1px solid rgba(100,116,139,0.12);
  transition: all 0.25s ease;
}
.tech-pill.active {
  background: rgba(34,211,238,0.12);
  color: #67e8f9;
  border-color: rgba(34,211,238,0.22);
}
.more-pill {
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 8px;
  color: #94a3b8;
  background: rgba(55,65,81,0.12);
  border: 1px solid rgba(100,116,139,0.08);
}

@media (max-width: 480px) {
  .project-media { height: 160px; }
  .project-title { font-size: 16px; }
  .projects-title { font-size: 28px; }
}

</style>
