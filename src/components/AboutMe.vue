<template>
  <div class="relative w-full h-full text-white">
    <div ref="mountRef" class="absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="about-card relative z-10 p-6 md:p-12">
      <h1 class="about-title text-3xl md:text-5xl font-bold mb-4 relative">
        À 
        <span class="gradient-text animate-pulse">PROPOS</span> DE MOI
        <div class="scan-effect absolute inset-0"></div>
      </h1>

      <div class="separator-line h-1 w-24 bg-cyan-400 mb-6"></div>

      <h1 class="name text-2xl md:text-3xl font-semibold mb-2">DJOUELA TABEU Flora Dolorece</h1>
      <h2 class="role text-lg md:text-xl mb-4">
        Étudiante | Web Designer | Développeuse Web & Mobile | Experte WordPress
      </h2>

      <div class="content space-y-4">
        <p>
          Actuellement <strong>à la recherche d'un stage de 6 mois</strong>,
          je suis passionnée par le numérique. Curieuse et rigoureuse, je
          conçois des solutions digitales modernes et accessibles, avec une
          réelle sensibilité à l'expérience utilisateur.
        </p>

        <p>
          J'utilise des technologies comme <strong>HTML, CSS, JavaScript, PHP, Python</strong>,
          ainsi que des outils de conception comme <strong>Figma</strong> et de gestion de
          projet comme <strong>Trello</strong>.
        </p>

        <div class="languages-section mt-6">
          <h4 class="languages-title font-semibold mb-2">Langues</h4>
          <div class="languages-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="language-item">
              <span class="language-name">🇫🇷 Français</span>
              <span class="language-level text-cyan-400">Langue Maternelle</span>
            </div>
            <div class="language-item">
              <span class="language-name">En Anglais</span>
              <span class="language-level text-blue-400">Niveau B2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const mountRef = ref(null);

let renderer, scene, camera, knot, animationId;

onMounted(() => {
  const container = mountRef.value;
  if (!container) return;

  scene = new THREE.Scene();

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 12;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x6eeeff, 0.45);
  scene.add(ambient);
  const key = new THREE.PointLight(0x00aaff, 1.0, 120);
  key.position.set(10, 8, 10);
  scene.add(key);
  const geo = new THREE.TorusKnotGeometry(3.2, 0.9, 180, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.7,
    roughness: 0.25,
    emissive: 0x003344,
    emissiveIntensity: 0.6,
  });
  knot = new THREE.Mesh(geo, mat);
  scene.add(knot);

  const clock = new THREE.Clock();
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    knot.rotation.x = t * 0.07;
    knot.rotation.y = t * 0.12;
    renderer.render(scene, camera);
  };
  animate();

  const handleResize = () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
    scene.clear();
  });
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #06b6d4, #3b82f6, #9333ea);
  background-clip: text;  
  -webkit-text-fill-color: transparent;
}

.scan-effect {
  background: linear-gradient(90deg, transparent, rgba(77, 217, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: scan 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes scan {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}
</style>
