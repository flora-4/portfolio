<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isVisible = ref(false);
const hoveredCard = ref(null);

const experiences = [
  {
    title: "Stage en Développement Web",
    company: "InchClass",
    period: "Janv - Mai 2025",
    type: "Stage",
    description:
      "Concevoir et développer une ou plusieurs applications web complètes, évolutives et responsives, les sécuriser et les déployer",
    skills: ["React", "Node.js", "MongoDB", "Sécurité Web", "Déploiement"],
    icon: "🌐",
    color: "linear-gradient(to right, #3b82f6, #06b6d4)",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    title: "Stage en Génie Logiciel",
    company: "Mentalist",
    period: "Juin - Août 2024",
    type: "Stage",
    description:
      "Manipuler des bases de données, gérer l'intégration avec des APIs et appliquer les bonnes pratiques de programmation",
    skills: ["SQL", "APIs REST", "Architecture", "Clean Code", "Tests"],
    icon: "⚙️",
    color: "linear-gradient(to right, #a855f7, #ec4899)",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
];

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 300);
});
</script>

<template>
  <div class="experiences-container">
    <header :class="['header', isVisible ? 'visible' : 'hidden']">
      <h2>
        MES<span class="gradient-text"> EXPERIEN</span>CES
        <div class="scan-effect"></div>
      </h2>
      <div class="separator"></div>
      <p>
        Découvrez mon parcours professionnel et les projets qui ont façonné mes
        compétences
      </p>
    </header>

    <main class="cards-container">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="card-wrapper"
        :class="{ visible: isVisible }"
        :style="{ transitionDelay: `${index * 400 + 600}ms` }"
        @mouseenter="hoveredCard = index"
        @mouseleave="hoveredCard = null"
      >
        <div
          class="card-glow"
          :style="{
            background: `linear-gradient(135deg, ${exp.glowColor}, transparent)`,
          }"
        ></div>

        <div
          class="card"
          :class="{ hovered: hoveredCard === index }"
          :style="{
            boxShadow:
              hoveredCard === index
                ? `0 15px 40px ${exp.glowColor}, 0 0 0 1px rgba(255,255,255,0.1)`
                : '0 8px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          }"
        >
          <div class="badge" :style="{ background: exp.color, boxShadow: `0 0 15px ${exp.glowColor}` }">
            {{ exp.type }}
          </div>

          <div class="card-header">
            <div class="icon" :style="{ background: exp.color, boxShadow: `0 0 15px ${exp.glowColor}` }">
              {{ exp.icon }}
            </div>
            <div>
              <h3>{{ exp.title }}</h3>
              <p class="company">{{ exp.company }}</p>
              <p class="period">{{ exp.period }}</p>
            </div>
          </div>

          <p class="description">{{ exp.description }}</p>

          <div class="skills">
            <span
              v-for="(skill, skillIndex) in exp.skills"
              :key="skillIndex"
              class="skill"
              :class="{ active: hoveredCard === index }"
              :style="{ transitionDelay: `${skillIndex * 50}ms` }"
            >
              {{ skill }}
            </span>
          </div>

          <div class="progress-bar">
            <div
              class="progress"
              :style="{
                background: exp.color,
                boxShadow: `0 0 8px ${exp.glowColor}`,
                width: isVisible ? '100%' : '0%',
                transitionDelay: `${index * 400 + 1200}ms`,
              }"
            ></div>
          </div>

          <div class="scan-overlay"></div>
        </div>
      </div>
    </main>

    <section class="stats" :class="{ visible: isVisible }">
      <div class="stat-box">
        <div class="number cyan">02</div>
        <p>Stages Réalisés</p>
      </div>
      <div class="divider"></div>
      <div class="stat-box">
        <div class="number purple">10+</div>
        <p>Technologies</p>
      </div>
      <div class="divider"></div>
      <div class="stat-box">
        <div class="number pink">06</div>
        <p>Mois d'Expérience</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---- Global Layout ---- */
.experiences-container {
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  padding: 2rem 1rem;
}

/* ---- Header ---- */
.header {
  text-align: center;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 1.5s ease;
  margin-bottom: 2rem;
  position: relative;
}

.header.visible {
  opacity: 1;
  transform: translateY(0);
}

.header h2 {
  font-size: 3rem;
  font-weight: 900;
  position: relative;
  display: inline-block;
}

@media (max-width: 768px) {
 .header h2 {
    font-size: 2.4rem;
  }
}

@media (max-width: 480px) {
  .header h2 {
    font-size: 2rem; 
  }
}


.gradient-text {
  background: linear-gradient(to right, #22d3ee, #a855f7, #ec4899);
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientMove 5s ease infinite alternate;
}

.separator {
  width: 12rem;
  height: 4px;
  margin: 1rem auto 1.5rem;
  background: linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent);
  border-radius: 4px;
  animation: pulse 2s infinite;
}

.header p {
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ---- Cards ---- */
.cards-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .cards-container {
    grid-template-columns: 1fr 1fr;
  }
}

.card-wrapper {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1s ease;
  position: relative;
}

.card-wrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-glow {
  position: absolute;
  inset: -10px;
  border-radius: 20px;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.card-wrapper:hover .card-glow {
  opacity: 0.6;
}

.card {
  position: relative;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
  border: 2px solid rgba(100, 116, 139, 0.4);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.7s ease;
  overflow: hidden;
}

.card.hovered {
  border-color: #22d3ee;
  transform: translateY(-8px) rotate(1deg);
}

.badge {
  position: absolute;
  top: -12px;
  right: -12px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  color: white;
  font-size: 0.8rem;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-right: 1rem;
  transition: transform 0.5s ease;
}

.card-wrapper:hover .icon {
  transform: rotate(12deg) scale(1.1);
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.company {
  color: #22d3ee;
  font-weight: 600;
}

.period {
  color: #94a3b8;
  font-family: monospace;
  font-size: 0.9rem;
}

.description {
  color: #cbd5e1;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skill {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(107, 114, 128, 0.4);
  color: #9ca3af;
  background: rgba(55, 65, 81, 0.4);
  transition: all 0.3s ease;
}

.skill.active {
  background: rgba(34, 211, 238, 0.2);
  color: #67e8f9;
  border-color: rgba(34, 211, 238, 0.4);
}

.progress-bar {
  height: 6px;
  background: rgba(71, 85, 105, 0.4);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  transition: all 1.5s ease;
}

.scan-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 1s ease;
}

.card-wrapper:hover .scan-overlay {
  transform: translateX(100%);
}

.stats {
  text-align: center;
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.5s ease;
  display: flex;
  justify-content: center;
  align-items: stretch; 
  gap: 2rem;
  flex-wrap: wrap;
}

.stats.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-box {
  width: 220px;
  height: 160px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 116, 139, 0.4);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.stat-box:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 25px rgba(34, 211, 238, 0.3);
}

.number {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  animation: pulse 2s infinite;
}

.number.cyan {
  color: #22d3ee;
}
.number.purple {
  color: #a855f7;
}
.number.pink {
  color: #ec4899;
}

.stat-box p {
  color: #cbd5e1;
  font-size: 1rem;
  font-weight: 500;
}

.divider {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #475569, transparent);
}

@media (max-width: 768px) {
  .stats {
    flex-direction: column;
    gap: 1rem;
  }

  .divider {
    display: none;
  }

  .stat-box {
    width: 100%;
    height: auto;
    padding: 1.5rem;
  }
}

/* --- Badge “Stage” amélioré --- */
.badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-weight: 700;
  color: #fff;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 5;

  /* meilleure visibilité */
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  transform: rotate(5deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover .badge {
  transform: rotate(0deg) scale(1.05);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
}


/* ---- Animations ---- */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}

@keyframes scan {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.scan-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: scan 3s ease-in-out infinite;
}
</style>
