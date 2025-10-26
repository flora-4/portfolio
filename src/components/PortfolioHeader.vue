<template>
  <div>
    <header
      class="site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="{ scrolled: isScrolled }"
    >
      <div class="header-inner max-w-7xl mx-auto">
        <div class="flex items-center justify-between h-20">
          <div
            @click="scrollToSection('globetech')"
            class="flex items-center space-x-3 cursor-pointer group"
          >
            <div class="relative">
              <div
                class="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
              >
                <span class="text-white font-bold text-xl">F</span>
              </div>
              <div
                class="absolute -inset-1 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              ></div>
            </div>
            <div class="hidden sm:block">
              <h2 class="text-xl font-bold text-white">Flora</h2>
              <p class="text-sm text-cyan-400 -mt-1">Dev Full Stack</p>
            </div>
          </div>
          <nav class="hidden md:flex flex-1 justify-end gap-8">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="scrollToSection(item.id)"
              :class="[
                'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group',
                activeSection === item.id
                  ? 'text-cyan-400 bg-cyan-500/10 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              ]"
            >
              <component 
                :is="item.icon" 
                :size="16"
                :class="[
                  'transition-transform duration-300',
                  activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'
                ]"
              />
              <span>{{ item.label }}</span>
              <div
                v-if="activeSection === item.id"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              ></div>
            </button>
          </nav>

          <!-- Bouton mobile -->
          <button
            @click="toggleMenu"
            class="md:hidden w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-700/50 transition-all duration-300"
          >
            <X v-if="isMobileMenuOpen" :size="22" />
            <Menu v-else :size="22" />
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <transition name="slide-fade">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-t border-gray-700/50"
        >
          <div class="max-w-7xl mx-auto px-4 py-4">
            <nav class="flex flex-col gap-3">
              <button
                v-for="item in navigationItems"
                :key="item.id"
                @click="scrollToSection(item.id)"
                :class="[ 
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                  activeSection === item.id
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                ]"
              >
                <component :is="item.icon" :size="18" />
                <span class="font-medium">{{ item.label }}</span>
              </button>
            </nav>
          </div>
        </div>
      </transition>
    </header>
    <button
      v-if="isScrolled"
      @click="scrollToSection('globetech')"
      class="fixed bottom-8 right-8 w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-300 z-40"
    >
      ↑
    </button>
    <div class="h-20"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Code, User, Briefcase, Mail, Home, Award, BookOpen } from 'lucide-vue-next'

const isScrolled = ref(false)
const activeSection = ref('globetech')
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { id: 'globetech', label: 'Accueil', icon: Home },
  { id: 'about-me', label: 'À propos', icon: User },
  { id: 'skills', label: 'Compétences', icon: Code },
  { id: 'projects', label: 'Projets', icon: Briefcase },
  { id: 'formations', label: 'Formations', icon: BookOpen },
  { id: 'experiences', label: 'Expériences', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  const current = navigationItems.find((item) => {
    const element = document.getElementById(item.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= 100 && rect.bottom >= 100
    }
    return false
  })

  if (current) activeSection.value = current.id
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerHeight = 80
    const position = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
    window.scrollTo({ top: position, behavior: 'smooth' })
  }
  isMobileMenuOpen.value = false
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.site-header {
  background: rgba(17, 24, 39, 0.95); 
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}
.site-header.scrolled {
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.6);
  border-bottom-color: rgba(6, 182, 212, 0.12); 
}
.header-inner {
  padding-left: 0;
  padding-right: 0;
}
@media (min-width: 1024px) {
  .header-inner {
    padding-left: 40px;
    padding-right: 40px;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.28s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
nav button,
button,
.cursor-pointer {
  cursor: pointer;
}
.backdrop-blur-xl { backdrop-filter: blur(24px); }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.blur { filter: blur(12px); }
</style>
