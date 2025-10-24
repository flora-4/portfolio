<template>
  <div class="contact-section">
    <!-- Particules d'arrière-plan -->
    <div class="particles">
      <div
        v-for="(n, i) in 30"
        :key="i"
        class="particle"
        :style="{
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          opacity: Math.random() * 0.5 + 0.2
        }"
      ></div>
    </div>

    <!-- Header -->
    <div class="contact-header">
      <h2 class="about-title">
        CON<span class="highlight">TACTEZ</span>
        MOI
        <div class="scan-effect"></div>
      </h2>
      <p class="subtitle">
        Discutons de vos projets et transformons vos idées en réalité numérique
      </p>
      <div class="divider">
        <div class="divider-blur"></div>
        <div class="divider-line"></div>
      </div>
    </div>

    <div class="contact-content">
      <div
        class="info-section"
        :class="{ visible: isVisible }"
      >
        <div class="info-text">
          <h2>
            Restons en <span class="text-blue">Contact</span>
          </h2>
          <p>
            Je suis actuellement à la recherche d'un stage de 6 mois et ouverte aux opportunités
            passionnantes. N'hésitez pas à me contacter pour discuter de collaborations ou de projets.
          </p>
        </div>

        <div class="info-items">
          <div
            v-for="(info, index) in contactInfo"
            :key="index"
            class="info-item"
            :style="{ transitionDelay: `${0.3 + index * 0.2}s` }"
            :class="{ visible: isVisible }"
          >
            <a
              :href="info.link"
              :target="info.label === 'Adresse' ? '_blank' : '_self'"
              rel="noopener noreferrer"
            >
              <div class="info-icon">{{ info.icon }}</div>
              <div>
                <p class="info-label">{{ info.label }}</p>
                <p class="info-value">{{ info.value }}</p>
              </div>
            </a>
          </div>
        </div>

        <div class="socials" :class="{ visible: isVisible }">
          <h3>Suivez-moi</h3>
          <div class="social-container">
              <div class="social-links">
                <a
                  href="https://www.linkedin.com/in/flora-dolorece-35a57531b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  in
                </a>
              </div>
              <div class="social-links">
              <a
                href="https://github.com/Flora-lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                git
              </a>
              </div>
          </div>
        </div>
      </div>

      <!-- Formulaire -->
      <div
        class="form-section"
        :class="{ visible: isVisible }"
      >
        <div class="form-container">
          <h3>
            Envoyez un <span class="text-blue">Message</span>
          </h3>

          <div
            v-if="submitStatus"
            :class="['status-message', submitStatus]"
          >
            <span class="icon">{{ submitStatus === 'success' ? '✅' : '❌' }}</span>
            <span>{{ statusMessage }}</span>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <div>
                <label>Nom complet *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="Votre nom complet"
                  :disabled="isSubmitting"
                />
              </div>
              <div>
                <label>Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  :disabled="isSubmitting"
                />
              </div>
            </div>

            <div>
              <label>Sujet *</label>
              <input
                v-model="formData.subject"
                type="text"
                required
                placeholder="Sujet de votre message"
                :disabled="isSubmitting"
              />
            </div>

            <div>
              <label>Message *</label>
              <textarea
                v-model="formData.message"
                rows="6"
                required
                placeholder="Décrivez votre projet..."
                :disabled="isSubmitting"
              ></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner"></span>
              <span v-else>⚡ Envoyer le message</span>
            </button>

            <p class="secure-note">
              Sécurisé par EmailJS • Pas de stockage des données
            </p>
          </form>
        </div>
      </div>
    </div>

    <footer>
      © 2025 Flora Dolorece DJOUELA TABEU - Développeuse Web & Mobile
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import emailjs from "@emailjs/browser";

const isVisible = ref(false);
const isSubmitting = ref(false);
const submitStatus = ref("");
const statusMessage = ref("");

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: ""
});

const EMAILJS_CONFIG = {
  serviceID: "service_7v6w49q",
  templateID: "template_wlykvnd",
  publicKey: "iHUyRc9xlxRN0VVKN"
};

onMounted(() => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
  setTimeout(() => (isVisible.value = true), 300);
});

const contactInfo = [
  { icon: "📱", label: "Téléphone", value: "07 74 65 55 63", link: "tel:0774655563" },
  { icon: "📧", label: "Email", value: "floratabeu@gmail.com", link: "mailto:floratabeu@gmail.com" },
  { icon: "📍", label: "Adresse", value: "14 Rue Raphael, 13008 Marseille", link: "https://maps.google.com/?q=14+Rue+Raphael+13008+Marseille" }
];

function clearStatusMessage() {
  setTimeout(() => {
    submitStatus.value = "";
    statusMessage.value = "";
  }, 5000);
}

async function handleSubmit() {
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    submitStatus.value = "error";
    statusMessage.value = "Veuillez remplir tous les champs obligatoires.";
    clearStatusMessage();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    submitStatus.value = "error";
    statusMessage.value = "Veuillez entrer une adresse email valide.";
    clearStatusMessage();
    return;
  }

  isSubmitting.value = true;

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "floratabeu@gmail.com",
      reply_to: formData.email,
      timestamp: new Date().toLocaleString("fr-FR")
    };

    await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams);
    submitStatus.value = "success";
    statusMessage.value = `Merci ${formData.name} ! Votre message a été envoyé avec succès.`;
    Object.assign(formData, { name: "", email: "", subject: "", message: "" });
  } catch (error) {
    console.error(error);
    submitStatus.value = "error";
    statusMessage.value = "Une erreur s'est produite. Veuillez réessayer plus tard.";
  } finally {
    isSubmitting.value = false;
    clearStatusMessage();
  }
}
</script>
<style scoped>
.contact-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: white;
  font-family: "Poppins", sans-serif;
}

/* Particules */
.particles {
  position: absolute;
  inset: 0;
}
.particle {
  position: absolute;
  border-radius: 9999px;
  background-color: #93c5fd;
  animation: pulse 3s infinite;
}

/* Header */
.contact-header {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 3rem 1rem 2rem;
}
.about-title {
  font-size: 3rem;
  font-weight: 900;
}
.highlight {
  background: linear-gradient(to right, #22d3ee, #a855f7, #ec4899);
  -webkit-background-clip: text;
  color: transparent;
}
.subtitle {
  color: rgba(191, 219, 254, 0.8);
  max-width: 650px;
  margin: 0 auto; /* centré par défaut */
  text-align: center;
  font-size: 1rem;
  line-height: 1.6;
  padding: 0 1rem; /* marges latérales sur petits écrans */
}

/* Sur écrans moyens et plus grands */
@media (min-width: 768px) {
  .subtitle {
    font-size: 1.1rem;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .subtitle {
    text-align: left;
    margin-left: 290px; 
    padding: 0;
  }
}

.divider {
  position: relative;
  width: 160px;
  height: 4px;
  margin: 1.5rem auto;
}
.divider-blur {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #3b82f6, #06b6d4);
  border-radius: 9999px;
  filter: blur(4px);
  opacity: 0.75;
}
.divider-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #3b82f6, #06b6d4);
  border-radius: 9999px;
}

/* Grille */
.contact-content {
  position: relative;
  z-index: 10;
  display: grid;
  gap: 2rem;
  max-width: 100vw;
  margin: auto;
  padding: 2rem;
}
@media (min-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr 1fr;
  }
}

/* Info section */
.info-section {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 1s ease;
}
.info-section.visible {
  opacity: 1;
  transform: translateX(0);
}
.info-text h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

.info-text p {
  color: rgba(191, 219, 254, 0.8);
  line-height: 1.6;
  margin-bottom: 10px;
}
.text-blue {
  color: #3b82f6;
}

/* Contact info */
.info-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
}
.info-item.visible {
  opacity: 1;
  transform: translateY(0);
}
.info-item a {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 20px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
}
.info-item a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.4);
}
.info-icon {
  width: 56px;
  height: 56px;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
}
.info-label {
  color: #93c5fd;
  font-size: 0.9rem;
}
.info-value {
  font-weight: 600;
}

.socials {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
}
.social-container{
    display: flex;
    gap: 3px;
}
.socials.visible {
  opacity: 1;
  transform: translateY(0);
}
.socials h3 {
  margin-bottom: 0.5rem;
}
.social-links a {
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.75rem;
  background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.3));
  transition: all 0.3s ease;
}
.social-links a:hover {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.3);
}

.form-section {
  opacity: 0;
  transform: translateX(20px);
  transition: all 1s ease;
}
.form-section.visible {
  opacity: 1;
  transform: translateX(0);
}
.form-container {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
}
.form-container h3 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.form-row {
  display: grid;
  gap: 1rem;
}
@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}
label {
  font-size: 0.9rem;
  color: #bfdbfe;
}
input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #ffffff; 
  transition: all 0.3s ease;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

input:focus,
textarea:focus {
  border-color: rgba(59, 130, 246, 0.6);
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #0ea5e9 100%);
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
  transition: all 0.4s ease;
}
button:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}
.secure-note {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(191, 219, 254, 0.6);
  margin-top: 1rem;
}

/* Messages de statut */
.status-message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  animation: fade-in 0.5s ease-out;
}
.status-message.success {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #bbf7d0;
}
.status-message.error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fecaca;
}
.status-message .icon {
  margin-right: 8px;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem 0;
  color: rgba(191, 219, 254, 0.8);
  font-size: 0.9rem;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>