<template>
  <div class="portfolio-container">
    <div ref="canvasContainer" class="canvas-wrapper"></div>
    <div class="glow-effect"></div>
    <div class="content-section">
      <div class="content-container">
        <img :src="myPhoto" alt="Flora" class="profile-image" />
        <h1 class="main-title">
          DJOUELA 
          <span class="gradient-text">TABEU</span>
          FLORA DOLORECE
          <div class="scan-effect"></div>
        </h1>
        <p class="description">
          Développeuse passionnée, spécialisée en front-end, back-end et web design.
        </p>
        <div class="button-group">
          <button class="spatial-btn" @click="scrollToAbout">
            En savoir plus
          </button>
          <button class="spatial-btn download-btn" @click="downloadCV">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="download-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Télécharger CV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import * as THREE from 'three';
import myPhoto from '../assets/moi.png';
import logoJs from '../assets/js.png';
import logoPython from '../assets/python.png';
import logoReact from '../assets/react.svg';
import logoHtml from '../assets/html.png';
import logoCss from '../assets/css.png';
import logoTailwind from '../assets/tailwind.png';
import logoLaravel from '../assets/laravel.png';
import logoFigma from '../assets/figma.png';
import logoTrello from '../assets/trello.png';

export default {
  name: 'GlobeTech',
  data() {
    return {
      myPhoto,
      threeData: null
    };
  },
  mounted() {
    this.threeData = {
      scene: null,
      camera: null,
      renderer: null,
      planetGroup: null,
      spriteGroup: null,
      ringGroup: null,
      stars: null,
      animationId: null,
      radius: 5.5,
      uranusSphere: null,
      atmosphere: null
    };
    this.initThreeJS();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.threeData.animationId) cancelAnimationFrame(this.threeData.animationId);
  },
  methods: {
    scrollToAbout() {
      const aboutSection = document.getElementById('about-me');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    },

  downloadCV() {
    const cvPath = '/Flora_DJOUELA_TABEU_CV.pdf';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Flora_DJOUELA_TABEU_CV.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

    initThreeJS() {
      const container = this.$refs.canvasContainer;
      const td = this.threeData;

      td.scene = markRaw(new THREE.Scene());
      td.scene.background = this.createGradientBackground();

      td.camera = markRaw(new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000));
      td.camera.position.set(0, 0, 20);

      td.renderer = markRaw(new THREE.WebGLRenderer({ antialias: true }));
      td.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.setRendererSize();
      container.appendChild(td.renderer.domElement);

      const ambientLight = markRaw(new THREE.AmbientLight(0x334455, 0.5));
      const mainLight = markRaw(new THREE.DirectionalLight(0x4db8ff, 1.5));
      const backLight = markRaw(new THREE.DirectionalLight(0x6dd9ff, 0.8));
      mainLight.position.set(10, 5, 10);
      backLight.position.set(-10, -5, -10);
      td.scene.add(ambientLight, mainLight, backLight);

      this.createUranusPlanet();
      this.createStars();

      this.animate();
    },

    setRendererSize() {
      const td = this.threeData;
      const width = window.innerWidth;
      const height = window.innerHeight;
      td.radius = width < 480 ? 2.5 : width < 768 ? 3.5 : width < 1024 ? 4.5 : 5.5;
      td.renderer.setSize(width, height);
      td.camera.aspect = width / height;
      td.camera.updateProjectionMatrix();
    },

    createGradientBackground() {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.3, '#0a0e1a');
      gradient.addColorStop(0.5, '#1a2535');
      gradient.addColorStop(0.7, '#0a0e1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1, 256);
      return new THREE.CanvasTexture(canvas);
    },

    createUranusPlanet() {
      const td = this.threeData;
      td.planetGroup = markRaw(new THREE.Group());
      const isMobile = window.innerWidth < 768;
      td.planetGroup.position.x = isMobile ? 0 : -4;
      td.planetGroup.rotation.z = Math.PI * 0.15;

      const planetTexture = this.createUranusTexture();
      const sphereGeo = markRaw(new THREE.SphereGeometry(td.radius, 64, 64));
      const sphereMat = markRaw(
        new THREE.MeshPhongMaterial({
          map: planetTexture,
          shininess: 15,
          specular: 0x88ccff,
          emissive: 0x112233,
          emissiveIntensity: 0.2
        })
      );
      td.uranusSphere = markRaw(new THREE.Mesh(sphereGeo, sphereMat));
      td.planetGroup.add(td.uranusSphere);
      const atmosphereGeo = markRaw(new THREE.SphereGeometry(td.radius * 1.08, 64, 64));
      const atmosphereMat = markRaw(
        new THREE.MeshBasicMaterial({
          color: 0x66d9ff,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        })
      );
      td.atmosphere = markRaw(new THREE.Mesh(atmosphereGeo, atmosphereMat));
      td.planetGroup.add(td.atmosphere);
      this.createRings();

      this.createLogoSprites();

      td.scene.add(td.planetGroup);
    },

    createUranusTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, '#4dd9ff');
      gradient.addColorStop(0.3, '#3db8d9');
      gradient.addColorStop(0.5, '#2d97b9');
      gradient.addColorStop(0.7, '#3db8d9');
      gradient.addColorStop(1, '#4dd9ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 512);
      return new THREE.CanvasTexture(canvas);
    },

    createRings() {
      const td = this.threeData;
      td.ringGroup = markRaw(new THREE.Group());
      const innerRadius = td.radius * 1.6;
      const outerRadius = td.radius * 2.4;
      const ringGeo = markRaw(new THREE.RingGeometry(innerRadius, outerRadius, 128));
      const ringMat = markRaw(
        new THREE.MeshBasicMaterial({
          map: this.createRingTexture(),
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      const mainRing = markRaw(new THREE.Mesh(ringGeo, ringMat));
      mainRing.rotation.x = Math.PI / 2;
      td.ringGroup.add(mainRing);
      td.planetGroup.add(td.ringGroup);
    },

    createRingTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 512, 0);
      gradient.addColorStop(0, 'rgba(80,120,150,0)');
      gradient.addColorStop(0.2, 'rgba(120,180,220,0.8)');
      gradient.addColorStop(0.5, 'rgba(200,240,255,0.9)');
      gradient.addColorStop(0.8, 'rgba(120,180,220,0.8)');
      gradient.addColorStop(1, 'rgba(80,120,150,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 64);
      return new THREE.CanvasTexture(canvas);
    },

    createLogoSprites() {
      const td = this.threeData;
      const logoPaths = [
        logoJs,
        logoPython,
        logoReact,
        logoHtml,
        logoCss,
        logoTailwind,
        logoLaravel,
        logoFigma,
        logoTrello
      ];
      td.spriteGroup = markRaw(new THREE.Group());
      const loader = new THREE.TextureLoader();
      const orbitRadius = td.radius * 2;

      logoPaths.forEach((logoPath, idx) => {
        loader.load(logoPath, (texture) => {
          const spriteMat = markRaw(
            new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              opacity: 1,
              depthWrite: false
            })
          );
          const sprite = markRaw(new THREE.Sprite(spriteMat));
          const angle = (idx / logoPaths.length) * Math.PI * 2;
          sprite.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);
          const logoScale = window.innerWidth < 768 ? 1.2 : 1.8;
          sprite.scale.set(logoScale, logoScale, 1);
          sprite.userData = { angle, orbitRadius, speed: 0.15 };
          td.spriteGroup.add(sprite);
        });
      });

      td.planetGroup.add(td.spriteGroup);
    },

    createStars() {
      const td = this.threeData;
      const starsCount = window.innerWidth < 768 ? 2000 : 4000;
      const positions = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      }
      const starsGeo = markRaw(new THREE.BufferGeometry());
      starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starsMat = markRaw(
        new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, opacity: 0.8, transparent: true })
      );
      td.stars = markRaw(new THREE.Points(starsGeo, starsMat));
      td.scene.add(td.stars);
    },

    animate() {
      const td = this.threeData;
      const clock = new THREE.Clock();
      const render = () => {
        td.animationId = requestAnimationFrame(render);
        const t = clock.getElapsedTime();

        if (td.uranusSphere) td.uranusSphere.rotation.y = t * 0.08;
        if (td.atmosphere) td.atmosphere.rotation.y = t * 0.08;
        if (td.spriteGroup) {
          td.spriteGroup.children.forEach((sprite) => {
            const data = sprite.userData;
            if (data) {
              const newAngle = data.angle + t * data.speed;
              sprite.position.x = Math.cos(newAngle) * data.orbitRadius;
              sprite.position.z = Math.sin(newAngle) * data.orbitRadius;
            }
          });
        }

        if (td.stars) td.stars.rotation.y = t * 0.002;

        td.renderer.render(td.scene, td.camera);
      };
      render();
    },

    handleResize() {
      this.setRendererSize();
    }
  }
};
</script>

<style scoped>
.portfolio-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
}

.glow-effect {
  position: absolute;
  top: 25%;
  left: 0;
  width: 100%;
  height: 75%;
  background: radial-gradient(circle at left center, rgba(77, 217, 255, 0.2), transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.content-section {
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
}

.content-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  max-width: 100%;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(77, 217, 255, 0.6);
  border: 3px solid rgba(77, 217, 255, 0.5);
  opacity: 0;
  transform: rotateY(180deg) scale(0.5);
  animation: photoEntry 1s ease forwards;
}

.main-title {
  font-size: clamp(1.2rem, 4vw, 2rem);
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
  opacity: 0;
  transform: translateY(-30px);
  animation: nameEntry 0.8s ease forwards;
  animation-delay: 1.2s;
  max-width: 90%;
  word-break: break-word;
  position: relative;
}

.gradient-text {
  background: linear-gradient(45deg, #00ffff, #a855f7, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: pulse 2s ease-in-out infinite alternate;
}

.description {
  text-align: center;
  max-width: 280px;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.4;
  opacity: 0;
  transform: translateY(-20px);
  animation: descEntry 0.8s ease forwards;
  animation-delay: 2s;
  margin: 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  animation: btnEntry 0.6s ease forwards;
  animation-delay: 2.8s;
}

.spatial-btn {
  padding: clamp(0.5rem, 2vw, 0.7rem) clamp(1rem, 4vw, 1.7rem);
  border-radius: 10px;
  border: 1px solid rgba(77, 217, 255, 0.5);
  background: rgba(77, 217, 255, 0.15);
  color: white;
  font-weight: bold;
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spatial-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(77, 217, 255, 0.5), rgba(0, 150, 255, 0.2), rgba(77, 217, 255, 0.5));
  transition: all 0.5s ease;
}

.spatial-btn:hover::before {
  left: 100%;
}

.spatial-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(77, 217, 255, 0.5);
}

.download-btn {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
  border: 1px solid rgba(168, 85, 247, 0.5);
}

.download-btn:hover {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.download-icon {
  flex-shrink: 0;
}

.scan-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(77, 217, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: scan 3s ease-in-out infinite;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .content-section {
    width: 60%;
    padding: 0.8rem;
  }
  
  .profile-image {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 768px) {
  .content-section {
    width: 100%;
    right: 0;
    padding: 1rem 2rem;
    justify-content: flex-start;
    padding-top: 15vh;
  }
  
  .profile-image {
    width: 140px;
    height: 140px;
  }

  .description {
    max-width: 90%;
  }

  .button-group {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    max-width: 280px;
  }

  .spatial-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 1rem 1.5rem;
    padding-top: 20vh;
  }
  
  .profile-image {
    width: 120px;
    height: 120px;
  }

  .content-container {
    gap: 0.8rem;
  }
}

@keyframes photoEntry {
  0% { opacity: 0; transform: rotateY(180deg) scale(0.5); }
  100% { opacity: 1; transform: rotateY(0deg) scale(1); }
}

@keyframes nameEntry {
  0% { opacity: 0; transform: translateY(-30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes descEntry {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes btnEntry {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0% { opacity: 1; }
  100% { opacity: 0.7; }
}

@keyframes scan {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}
</style>