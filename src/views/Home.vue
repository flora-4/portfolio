<template>
  <div class="min-h-screen ">
    
    <Background />
    <PortfolioHeader />

    <div class="space-y-20 relative z-10 text-white">
      <section id="globetech" class="scroll-mt-20">
        <GlobeTech />
      </section>

      <section id="about-me" class="scroll-mt-20">
        <AboutMe />
      </section>

      <section id="skills" class="scroll-mt-20 ">
        <Skills />
      </section>

      <section id="projects" class="scroll-mt-20 ">
        <Projects />
      </section>

      <section id="formations" class="scroll-mt-20">
        <Formations />
      </section>
      <section id="experiences" class="scroll-mt-20">
        <Experiences />
      </section>

      <section id="contact" class="scroll-mt-20">
        <ContactSection />
      </section> 
    </div>
  </div>
</template>

<script setup>
import Background from '../components/Background.vue';
import PortfolioHeader from '../components/PortfolioHeader.vue';
import GlobeTech from '../components/GlobeTech.vue';
import AboutMe from '../components/AboutMe.vue';
import Skills from '../components/skills.vue';
import Projects from '../components/projects.vue';
import Formations from '../components/Formations.vue';
import Experiences from '../components/experiences.vue';
import ContactSection from '../components/ContactSection.vue';
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
section {
  position: relative;
  min-height: fit-content;
}
</style>
