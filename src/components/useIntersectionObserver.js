import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

export function useIntersectionObserver({
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
  once = false, 
  delayReset = 300, 
} = {}) {
  const element = ref(null)
  const isVisible = ref(false)
  let observer = null
  let timeout

  const handleEntries = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        isVisible.value = true
        if (timeout) clearTimeout(timeout)
      } else {
        timeout = setTimeout(() => {
          isVisible.value = false
        }, delayReset)
      }
    })
  }

  onMounted(async () => {
    await nextTick()
    if (!element.value) return

    observer = new IntersectionObserver(handleEntries, {
      threshold,
      rootMargin,
    })
    observer.observe(element.value)
  })

  onBeforeUnmount(() => {
    if (observer && element.value) observer.unobserve(element.value)
    if (timeout) clearTimeout(timeout)
  })

  return { element, isVisible }
}
