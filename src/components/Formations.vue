<script setup>
import { ref, onMounted } from "vue";
import epitechLogo from "../assets/Epitech.png";
import dclicLogo from "../assets/dclic.png";
import inchclassLogo from "../assets/inchclass.png";
import iutDoualaLogo from "../assets/iut.png";

const formations = [
  {
    title: "Master Of Science",
    school: "EPITECH",
    date: "2025 - 2028",
    desc: "Développement web, JAVA, Réseau, IA, Data...",
    image: epitechLogo,
    imageAlt: "Logo EPITECH",
  },
  {
    title: "Formation en développement mobile",
    school: "D-CLIC",
    date: "Juin - Sept 2025",
    desc: "Apprentissage en ligne du développement mobile",
    image: dclicLogo,
    imageAlt: "Logo D-CLIC",
  },
  {
    title: "Formation en développement web",
    school: "InchClass",
    date: "Janv - Mai 2025",
    desc: "Bases solides en développement web moderne",
    image: inchclassLogo,
    imageAlt: "Logo InchClass",
  },
  {
    title: "Diplôme Universitaire des Technologies",
    school: "IUT DOUALA",
    date: "Sept 2023 - Juin 2025",
    desc: "Bac +2 Génie informatique",
    image: iutDoualaLogo,
    imageAlt: "Logo IUT DOUALA",
  },
];

const isVisible = ref(false);
const imageErrors = ref({});

const handleImageError = (index) => {
  imageErrors.value[index] = true;
};

const handleImageLoad = (index) => {
  imageErrors.value[index] = false;
};

onMounted(() => {
  setTimeout(() => (isVisible.value = true), 500);
});
</script>

<template>
  <div class="formations-container">
    <!-- Particules -->
    <div class="particles">
      <div
        v-for="i in 50"
        :key="i"
        class="particle"
        :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          opacity: Math.random() * 0.7,
        }"
      ></div>
    </div>

    <div class="header" :class="{ visible: isVisible }">
      <h2>
        MES
        <span class="gradient-text">FORMAT</span>IONS
        <div class="scan-effect"></div>
      </h2>
      <div class="separator"></div>
    </div>

    <div class="content">
      <div class="left-panel">
        <svg class="arc-svg" viewBox="0 0 300 400">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00ffff" />
              <stop offset="30%" stop-color="#0080ff" />
              <stop offset="70%" stop-color="#0040ff" />
              <stop offset="100%" stop-color="#00ffff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 80 350 A 100 100 0 0 1 80 50"
            stroke="#00ffff"
            stroke-width="12"
            stroke-linecap="round"
            fill="none"
            opacity="0.3"
            filter="url(#glow)"
            :style="{
              strokeDasharray: 314,
              strokeDashoffset: isVisible ? 0 : 314,
              transition: 'stroke-dashoffset 3s ease-out',
            }"
          />
          <path
            d="M 80 350 A 100 100 0 0 1 80 50"
            stroke="url(#neonGradient)"
            stroke-width="6"
            stroke-linecap="round"
            fill="none"
            filter="url(#glow)"
            :style="{
              strokeDasharray: 314,
              strokeDashoffset: isVisible ? 0 : 314,
              transition: 'stroke-dashoffset 3s ease-out 0.5s',
            }"
          />
        </svg>

        <svg class="arc-svg inner" viewBox="0 0 300 400">
          <path
            d="M 110 320 A 70 70 0 0 1 110 80"
            stroke="#00d4ff"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            :style="{
              strokeDasharray: 220,
              strokeDashoffset: isVisible ? 0 : 220,
              transition: 'stroke-dashoffset 2.5s ease-out 1s',
            }"
          />
        </svg>

        <div
          v-for="(f, index) in formations"
          :key="index"
          class="arc-dot"
          :style="{
            left: 80 - 100 * Math.cos((index / (formations.length - 1)) * Math.PI) + 'px',
            top: 200 - 100 * Math.sin((index / (formations.length - 1)) * Math.PI) + 'px',
            transitionDelay: 1.5 + index * 0.2 + 's',
          }"
          :class="{ visible: isVisible }"
        ></div>

        <div class="arc-text" :class="{ visible: isVisible }">
          <h3>PARCOURS</h3>
          <div class="arc-line"></div>
          <p>Évolution académique et professionnelle</p>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <div
          v-for="(formation, index) in formations"
          :key="index"
          class="timeline-item"
        >
          <div class="number" :style="{ transitionDelay: 2 + index * 0.3 + 's' }" :class="{ visible: isVisible }">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <div class="card" :class="{ visible: isVisible }" :style="{ transitionDelay: 2.2 + index * 0.3 + 's' }">
            <div class="card-left">
              <div class="card-image">
                <template v-if="!imageErrors[index]">
                  <img
                    :src="formation.image"
                    :alt="formation.imageAlt"
                    @error="handleImageError(index)"
                    @load="handleImageLoad(index)"
                  />
                </template>
                <template v-else>
                  <span>{{ formation.school.slice(0, 2) }}</span>
                </template>
              </div>
            </div>

            <div class="card-content">
              <h3>{{ formation.title }}</h3>
              <p class="school">{{ formation.school }}</p>
              <p class="date">{{ formation.date }}</p>
              <p class="desc">{{ formation.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formations-container {
  position: relative;
  min-height: 100vh;
  color: white;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #22d3ee;
  border-radius: 50%;
  animation: pulse 3s infinite;
}

/* === HEADER === */
.header {
  text-align: center;
  padding: 4rem 0 2rem;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 1.5s ease;
}
.header.visible {
  opacity: 1;
  transform: translateY(0);
}
.header h2 {
  font-size: 3rem;
  font-weight: 900;
  position: relative;
}
.gradient-text {
  background: linear-gradient(to right, #22d3ee, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  color: transparent;
  animation: pulse 3s infinite alternate;
}
.separator {
  width: 8rem;
  height: 4px;
  margin: 1rem auto 0;
  background: linear-gradient(to right, #22d3ee, #60a5fa);
  border-radius: 4px;
}

/* === CONTENT === */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  position: relative;
  padding-bottom: 4rem;
}
@media (min-width: 1024px) {
  .content {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
}

/* === LEFT PANEL === */
.left-panel {
  position: relative;
  width: 400px;
  height: 600px;
  margin-bottom: 3rem;
}
.arc-svg {
  position: absolute;
  inset: 0;
}
.arc-svg.inner {
  opacity: 0.8;
}
.arc-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #22d3ee;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
  transform: scale(0);
  transition: all 0.8s ease;
}
.arc-dot.visible {
  transform: scale(1);
}
.arc-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 1.5s ease;
}
.arc-text.visible {
  opacity: 1;
  transform: translateX(0);
}
.arc-text h3 {
  font-size: 1.5rem;
  font-weight: bold;
}
.arc-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, #22d3ee, transparent);
  margin: 8px 0;
}
.arc-text p {
  font-size: 0.9rem;
  color: #a5f3fc;
}

/* === TIMELINE === */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.timeline-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffff, #0040ff);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0) rotate(180deg);
  transition: all 1s ease;
}
.number.visible {
  opacity: 1;
  transform: scale(1) rotate(0);
}

/* === CARD === */
.card {
  background: linear-gradient(135deg, rgba(0, 20, 40, 0.8), rgba(0, 40, 80, 0.6));
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  width: 500px;
  box-shadow: 0 8px 32px rgba(0, 200, 255, 0.2);
  transform: translateX(20px) scale(0.95);
  opacity: 0;
  transition: all 1.2s ease;
}
.card.visible {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.card:hover {
  transform: scale(1.05);
  border-color: #22d3ee;
}
.card-left {
  float: left;
  margin-right: 1rem;
}
.card-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 211, 238, 0.15);
  border: 1px solid rgba(0, 255, 255, 0.3);
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.card-image:hover img {
  transform: scale(1.1);
}
.card-content h3 {
  font-weight: bold;
  font-size: 1.1rem;
}
.card-content .school {
  color: #22d3ee;
  font-weight: 600;
}
.card-content .date {
  color: #67e8f9;
  font-size: 0.9rem;
}
.card-content .desc {
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* === ANIMATIONS === */
.scan-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: scan 3s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes scan {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

/* =============================
   📱 RESPONSIVE DESIGN
============================= */

/* --- TABLETTES (768–1024px) --- */
@media (max-width: 1024px) {
  .header h2 { font-size: 2.5rem; }
  .left-panel { width: 300px; height: 480px; }
  .arc-text h3 { font-size: 1.2rem; }
  .card { width: 400px; padding: 1.2rem; }
  .number { width: 50px; height: 50px; font-size: 1rem; }
}

/* --- MOBILES (≤768px) --- */
@media (max-width: 768px) {
  .header { padding: 2rem 0 1rem; }
  .header h2 { font-size: 1.8rem; }
  .separator { width: 5rem; height: 3px; }

  .content { flex-direction: column; align-items: center; }
  .left-panel {
    width: 220px;
    height: 350px;
    margin-bottom: 2rem;
  }
  .arc-text h3 { font-size: 1rem; }
  .arc-text p { font-size: 0.75rem; }
  .arc-dot { width: 8px; height: 8px; }

  .timeline { gap: 1.2rem; }
  .timeline-item { flex-direction: column; align-items: center; text-align: center; }
  .number {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .card {
    width: 90%;
    padding: 1rem;
    transform: none;
  }
  .card:hover { transform: scale(1.02); }
  .card-left {
    float: none;
    margin: 0 auto 0.5rem;
  }
  .card-image {
    width: 48px;
    height: 48px;
    margin: 0 auto;
  }
  .card-content h3 { font-size: 1rem; }
  .card-content .school { font-size: 0.85rem; }
  .card-content .date { font-size: 0.8rem; }
  .card-content .desc {
    font-size: 0.85rem;
    line-height: 1.3;
  }
}

/* --- TÉLÉPHONES ÉTROITS (≤480px) --- */
@media (max-width: 480px) {
  .header h2 { font-size: 1.5rem; }
  .left-panel { width: 180px; height: 300px; }
  .card { width: 95%; padding: 0.8rem; }
  .card-content h3 { font-size: 0.9rem; }
  .card-content .desc { font-size: 0.8rem; }
}
</style>
