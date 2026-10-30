<template>
  <canvas ref="starCanvas" class="star-canvas"></canvas>
  <slot></slot>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const starCanvas = ref(null)
let ctx, stars = [], timer
const starCount = 350

class Star {
  constructor() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.r = Math.random() * 1.2
    this.speed = Math.random() * 0.25
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }
  update() {
    this.y += this.speed
    if (this.y > window.innerHeight) {
      this.y = 0
      this.x = Math.random() * window.innerWidth
    }
  }
}

function initStar() {
  const canvas = starCanvas.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
  stars = Array.from({ length: starCount }, () => new Star())
}
function render() {
  ctx.clearRect(0, 0, starCanvas.value.width, starCanvas.value.height)
  stars.forEach(s => {
    s.update()
    s.draw()
  })
  timer = requestAnimationFrame(render)
}
function resize() {
  starCanvas.value.width = window.innerWidth
  starCanvas.value.height = window.innerHeight
}

onMounted(() => {
  initStar()
  render()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  cancelAnimationFrame(timer)
  window.removeEventListener('resize', resize)
})
</script>
<style scoped>
.star-canvas {
  position: fixed;
  top:0;
  left:0;
  z-index: -1;
}
</style>