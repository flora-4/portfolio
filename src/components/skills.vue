<template>
  <div
    class="min-h-screen flex justify-center items-center overflow-hidden mt-45" 
    style="font-family: 'Orbitron', monospace; color: white; margin-top: 60px;"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        class="absolute flex flex-col justify-center items-center cursor-pointer transition-all duration-300 z-10 central-hexagon"
        :style="{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: '2px solid #00ffff',
          width: '220px',
          height: '220px',
          animation: 'rotate-initial 3s ease-in-out, glow-pulse 2s ease-in-out infinite alternate'
        }"
      >
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-3xl mb-4 central-icon"
          style="background: linear-gradient(45deg, #ff0080, #00ffff);
                 box-shadow: 0 0 15px rgba(255, 0, 128, 0.5);
                 animation: profile-glow 3s ease-in-out infinite alternate;">
          ⚡
        </div>
        <div
          class="text-cyan-400 text-sm text-center font-bold tracking-widest central-text"
          style="text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);"
        >
          COMPÉTENCES<br />SYSTÈME
        </div>
      </div>

      <!-- 🔹 Lignes + cartes -->
      <template v-for="(pos, index) in positions" :key="index">
        <div
          class="absolute h-0.5 connection-line"
          :style="{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            transformOrigin: 'left center',
            width: `${getDistance(pos)}px`,
            left: `calc(50% + ${pos.x * 0.35}px)`,
            top: `calc(50% + ${pos.y * 0.35}px)`,
            transform: `rotate(${getAngle(pos)}deg)`,
            opacity: animationStarted ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }"
        ></div>

        <div
          class="absolute flex flex-col justify-center items-center bg-black/40 backdrop-blur-xl rounded-xl skill-card"
          :style="{
            left: `calc(50% + ${getCurrentPos(pos, index).x}px - 70px)`,
            top: `calc(50% + ${getCurrentPos(pos, index).y}px - 70px)`,
            opacity: animationStarted ? 1 : 0,
            transform: animationStarted ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.5s ease',
            border: '1px solid #00ffff',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
            width: '140px',
            height: '140px'
          }"
        >
          <img
            :src="skills[index].icon"
            :alt="skills[index].name"
            class="w-12 h-12 object-contain mb-2 skill-icon"
          />
          <div
            class="text-xs font-bold text-center tracking-wider skill-text"
            style="color: #00ffff;
                   text-shadow: 0 0 8px rgba(0, 255, 255, 0.6);
                   white-space: pre-line;"
          >
            {{ skills[index].name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Logos
import reactLogo from '../assets/react.svg'
import jsLogo from '../assets/js.png'
import htmlLogo from '../assets/html.png'
import pythonLogo from '../assets/python.png'
import laravelLogo from '../assets/laravel.png'
import flutterLogo from '../assets/flutter.png'
import wordpressLogo from '../assets/wordpress.png'
import tailwindLogo from '../assets/tailwind.png'

const animationStarted = ref(false)

// Positions desktop
const positions = [
  { x: 0, y: -260 },
  { x: 226, y: -200 },
  { x: 300, y: 0 },
  { x: 226, y: 226 },
  { x: 0, y: 250 },
  { x: -226, y: 226 },
  { x: -300, y: 0 },
  { x: -226, y: -226 }
]

// Positions mobile (rapprochées)
const mobilePositions = [
  { x: 30, y: -130 },
  { x: 120, y: -100 },
  { x: 170, y: 0 },
  { x: 140, y: 120 },
  { x: 40, y: 170 },
  { x: -80, y: 100 },
  { x: -100, y: 0 },
  { x: -60, y: -90 }
]

const skills = [
  { icon: reactLogo, name: 'REACT\nFRONTEND' },
  { icon: jsLogo, name: 'JAVASCRIPT\nES6+' },
  { icon: htmlLogo, name: 'HTML5\nMARKUP' },
  { icon: pythonLogo, name: 'PYTHON\nBACKEND' },
  { icon: laravelLogo, name: 'LARAVEL\nPHP' },
  { icon: flutterLogo, name: 'FLUTTER\nMOBILE' },
  { icon: wordpressLogo, name: 'WORDPRESS\nCMS' },
  { icon: tailwindLogo, name: 'TAILWIND\nCSS' }
]

// 🔧 Fonctions
const getDistance = (pos) => {
  return window.innerWidth <= 768
    ? Math.sqrt(pos.x ** 2 + pos.y ** 2) - 100
    : Math.sqrt(pos.x ** 2 + pos.y ** 2) - 160
}

const getAngle = (pos) => Math.atan2(pos.y, pos.x) * (180 / Math.PI)
const getCurrentPos = (pos, index) =>
  window.innerWidth <= 768 ? mobilePositions[index] : pos

onMounted(() => {
  setTimeout(() => {
    animationStarted.value = true
  }, 1000)
})
</script>

<style scoped>
@keyframes rotate-initial {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes glow-pulse {
  0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
  100% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8); }
}
@keyframes profile-glow {
  0% { box-shadow: 0 0 15px rgba(255, 0, 128, 0.5); }
  100% { box-shadow: 0 0 25px rgba(255, 0, 128, 0.8), 0 0 35px rgba(0, 255, 255, 0.4); }
}

/*  Responsive */
@media (max-width: 768px) {

  .central-hexagon {
    width: 130px !important;
    height: 130px !important;
  }
  .central-icon {
    width: 40px !important;
    height: 40px !important;
    font-size: 18px !important;
    margin-bottom: 6px !important;
  }
  .central-text {
    font-size: 8px !important;
    line-height: 1.1 !important;
  }
  .skill-card {
    width: 70px !important;
    height: 70px !important;
  }
  .skill-icon {
    width: 20px !important;
    height: 20px !important;
    margin-bottom: 2px !important;
  }
  .skill-text {
    font-size: 7px !important;
    line-height: 1.1 !important;
  }
  .connection-line {
    display: none !important;
  }
}
</style>
