/**
 * Galaxy Background Animation
 * Draws twinkling stars, nebula clouds, shooting stars, and interactive constellations
 * Optimized for both desktop and mobile
 */
class GalaxyCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.nebulaClouds = [];

    // Detect mobile
    this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Adjust counts for mobile performance
    this.starCount = this.isMobile ? 80 : 200;
    this.maxConstellationDist = this.isMobile ? 0 : 100; // Disable on mobile
    this.nebulaCount = this.isMobile ? 3 : 5;
    this.maxShootingStars = this.isMobile ? 1 : 2;

    this.mouse = { x: null, y: null, radius: this.isMobile ? 120 : 180 };
    // Smooth cursor position (for aurora glow)
    this.cursorGlow = { x: -200, y: -200, targetX: -200, targetY: -200, active: false };
    this.cursorTrail = [];
    this.maxTrailLength = this.isMobile ? 10 : 18;
    this.time = 0;

    this.resize();
    this.initStars();
    this.initNebula();
    this.animate();

    // Resize handler with debounce for mobile orientation changes
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        this.starCount = this.isMobile ? 80 : 200;
        this.maxConstellationDist = this.isMobile ? 0 : 100;
        this.nebulaCount = this.isMobile ? 3 : 5;
        this.maxShootingStars = this.isMobile ? 1 : 2;
        this.maxTrailLength = this.isMobile ? 10 : 18;
        this.resize();
        this.initStars();
        this.initNebula();
      }, 150);
    });

    // Track mouse on document level (canvas has pointer-events: none)
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursorGlow.targetX = e.clientX;
      this.cursorGlow.targetY = e.clientY;
      this.cursorGlow.active = true;
    });
    document.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
      this.cursorGlow.active = false;
    });

    // Touch support for mobile aurora glow
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch) {
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        this.cursorGlow.targetX = touch.clientX;
        this.cursorGlow.targetY = touch.clientY;
        this.cursorGlow.active = true;
      }
    }, { passive: true });
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (touch) {
        this.cursorGlow.targetX = touch.clientX;
        this.cursorGlow.targetY = touch.clientY;
        this.cursorGlow.x = touch.clientX;
        this.cursorGlow.y = touch.clientY;
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        this.cursorGlow.active = true;
      }
    }, { passive: true });
    document.addEventListener('touchend', () => {
      // Fade out after touch ends
      setTimeout(() => {
        this.mouse.x = null;
        this.mouse.y = null;
        this.cursorGlow.active = false;
      }, 800);
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * (this.isMobile ? 1.5 : 1.8) + 0.3,
        baseOpacity: Math.random() * 0.6 + 0.3,
        opacity: 0,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Slight drift
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        // Color variation
        color: this.getStarColor()
      });
    }
  }

  getStarColor() {
    const colors = [
      { r: 255, g: 255, b: 255 },   // pure white
      { r: 200, g: 220, b: 255 },   // blue-white
      { r: 255, g: 240, b: 220 },   // warm white
      { r: 180, g: 230, b: 255 },   // light cyan
      { r: 220, g: 200, b: 255 },   // light purple
      { r: 139, g: 92, b: 246 },    // accent purple (rare)
      { r: 6, g: 182, b: 212 },     // accent cyan (rare)
    ];
    // Weighted: most stars are white/blue-white
    const weights = [30, 25, 15, 12, 10, 4, 4];
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < colors.length; i++) {
      r -= weights[i];
      if (r <= 0) return colors[i];
    }
    return colors[0];
  }

  initNebula() {
    this.nebulaClouds = [];
    const colors = [
      'rgba(139, 92, 246,',   // purple
      'rgba(6, 182, 212,',    // cyan
      'rgba(236, 72, 153,',   // pink
      'rgba(59, 130, 246,',   // blue
      'rgba(16, 185, 129,',   // emerald
    ];
    for (let i = 0; i < this.nebulaCount; i++) {
      this.nebulaClouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * (this.isMobile ? 150 : 250) + (this.isMobile ? 80 : 150),
        color: colors[i % colors.length],
        opacity: Math.random() * 0.04 + 0.015,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.1,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  spawnShootingStar() {
    if (this.shootingStars.length >= this.maxShootingStars) return;
    if (Math.random() > 0.003) return; // rare occurrence

    const startX = Math.random() * this.canvas.width;
    const startY = Math.random() * this.canvas.height * 0.4;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
    const speed = Math.random() * (this.isMobile ? 4 : 6) + (this.isMobile ? 3 : 4);

    this.shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      trail: [],
      maxTrailLength: Math.floor(Math.random() * (this.isMobile ? 12 : 20) + (this.isMobile ? 8 : 15)),
      life: 1,
      decay: Math.random() * 0.015 + 0.01,
      size: Math.random() * (this.isMobile ? 1.5 : 2) + 1,
    });
  }

  drawNebula() {
    this.nebulaClouds.forEach(cloud => {
      // Drift
      cloud.x += cloud.driftX;
      cloud.y += cloud.driftY;

      // Wrap
      if (cloud.x < -cloud.radius) cloud.x = this.canvas.width + cloud.radius;
      if (cloud.x > this.canvas.width + cloud.radius) cloud.x = -cloud.radius;
      if (cloud.y < -cloud.radius) cloud.y = this.canvas.height + cloud.radius;
      if (cloud.y > this.canvas.height + cloud.radius) cloud.y = -cloud.radius;

      // Pulse
      const pulse = Math.sin(this.time * cloud.pulseSpeed + cloud.pulseOffset) * 0.5 + 0.5;
      const opacity = cloud.opacity * (0.6 + pulse * 0.4);

      const gradient = this.ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.radius
      );
      gradient.addColorStop(0, cloud.color + opacity + ')');
      gradient.addColorStop(0.4, cloud.color + (opacity * 0.5) + ')');
      gradient.addColorStop(1, cloud.color + '0)');

      this.ctx.beginPath();
      this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }

  drawStars() {
    this.stars.forEach((star, i) => {
      // Twinkle
      const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset);
      star.opacity = star.baseOpacity * (0.5 + twinkle * 0.5);

      // Gentle drift
      star.x += star.vx;
      star.y += star.vy;

      // Wrap
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;

      // Mouse/touch interaction — stars glow brighter near cursor
      let glowBoost = 0;
      if (this.mouse.x !== null) {
        const dx = star.x - this.mouse.x;
        const dy = star.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          glowBoost = (1 - dist / this.mouse.radius) * 0.6;
          // Slight push away
          star.x += (dx / dist) * 0.3;
          star.y += (dy / dist) * 0.3;
        }
      }

      const finalOpacity = Math.min(star.opacity + glowBoost, 1);
      const { r, g, b } = star.color;

      // Glow effect for brighter stars (skip on mobile for perf unless boosted)
      if (star.radius > 1.2 || (!this.isMobile && glowBoost > 0.2) || (this.isMobile && glowBoost > 0.4)) {
        const glowRadius = star.radius * (this.isMobile ? 3 : 4);
        const glow = this.ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowRadius
        );
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${finalOpacity * 0.4})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = glow;
        this.ctx.fill();
      }

      // Star core
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
      this.ctx.fill();

      // Draw faint constellation lines between nearby stars (desktop only)
      if (this.maxConstellationDist > 0) {
        for (let j = i + 1; j < this.stars.length; j++) {
          const s2 = this.stars[j];
          const dx = star.x - s2.x;
          const dy = star.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.maxConstellationDist) {
            const alpha = (1 - dist / this.maxConstellationDist) * 0.06;
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(s2.x, s2.y);
            this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }
    });
  }

  drawShootingStars() {
    this.shootingStars = this.shootingStars.filter(s => s.life > 0);

    this.shootingStars.forEach(s => {
      // Update position
      s.trail.unshift({ x: s.x, y: s.y });
      if (s.trail.length > s.maxTrailLength) s.trail.pop();

      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      // Draw trail
      for (let i = 0; i < s.trail.length; i++) {
        const t = s.trail[i];
        const progress = i / s.trail.length;
        const alpha = (1 - progress) * s.life * 0.8;
        const size = s.size * (1 - progress * 0.7);

        this.ctx.beginPath();
        this.ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
      }

      // Draw bright head
      const headGlow = this.ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${s.life * 0.9})`);
      headGlow.addColorStop(0.3, `rgba(6, 182, 212, ${s.life * 0.4})`);
      headGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = headGlow;
      this.ctx.fill();
    });
  }

  drawCursorAurora() {
    // Smooth follow with easing
    const ease = this.isMobile ? 0.12 : 0.08;
    this.cursorGlow.x += (this.cursorGlow.targetX - this.cursorGlow.x) * ease;
    this.cursorGlow.y += (this.cursorGlow.targetY - this.cursorGlow.y) * ease;

    const cx = this.cursorGlow.x;
    const cy = this.cursorGlow.y;

    if (!this.cursorGlow.active) return;

    // Add trail point
    this.cursorTrail.unshift({ x: cx, y: cy, age: 0 });
    if (this.cursorTrail.length > this.maxTrailLength) this.cursorTrail.pop();

    // Draw aurora trail (fewer points on mobile)
    this.cursorTrail.forEach((point, i) => {
      point.age++;
      const progress = i / this.maxTrailLength;
      const alpha = (1 - progress) * (this.isMobile ? 0.04 : 0.035);
      const radius = (this.isMobile ? 60 : 80) + progress * (this.isMobile ? 40 : 60);

      // Rotating hue based on time and position
      const hueShift = (this.time * 0.3 + i * 15) % 360;
      const colors = [
        { stop: 0, color: `hsla(${(270 + hueShift) % 360}, 80%, 65%, ${alpha * 1.2})` },
        { stop: 0.4, color: `hsla(${(190 + hueShift) % 360}, 85%, 55%, ${alpha * 0.6})` },
        { stop: 1, color: `hsla(${(320 + hueShift) % 360}, 70%, 50%, 0)` },
      ];

      const gradient = this.ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      colors.forEach(c => gradient.addColorStop(c.stop, c.color));

      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });

    // Main cursor glow — large soft nebula orb
    const mainRadius = this.isMobile ? 80 : 120;
    const mainGlow = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, mainRadius);
    const hue = (this.time * 0.5) % 360;
    mainGlow.addColorStop(0, `hsla(${(270 + hue) % 360}, 90%, 70%, ${this.isMobile ? 0.09 : 0.07})`);
    mainGlow.addColorStop(0.3, `hsla(${(200 + hue) % 360}, 85%, 60%, ${this.isMobile ? 0.05 : 0.04})`);
    mainGlow.addColorStop(0.6, `hsla(${(330 + hue) % 360}, 75%, 55%, 0.02)`);
    mainGlow.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, mainRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = mainGlow;
    this.ctx.fill();

    // Inner bright core
    const coreRadius = this.isMobile ? 20 : 30;
    const coreGlow = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
    coreGlow.addColorStop(0, `hsla(${(260 + hue) % 360}, 100%, 80%, ${this.isMobile ? 0.15 : 0.12})`);
    coreGlow.addColorStop(0.5, `hsla(${(190 + hue) % 360}, 90%, 70%, 0.05)`);
    coreGlow.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = coreGlow;
    this.ctx.fill();

    // Tiny sparkles around cursor (reduced on mobile)
    const sparkleCount = this.isMobile ? 2 : 3;
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (this.time * 0.02 + i * Math.PI * 2 / sparkleCount) % (Math.PI * 2);
      const dist = (this.isMobile ? 18 : 25) + Math.sin(this.time * 0.03 + i) * (this.isMobile ? 6 : 10);
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist;
      const sparkleSize = 1.5 + Math.sin(this.time * 0.05 + i * 2) * 0.8;

      this.ctx.beginPath();
      this.ctx.arc(sx, sy, sparkleSize, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${(260 + hue + i * 40) % 360}, 100%, 80%, ${0.4 + Math.sin(this.time * 0.04 + i) * 0.3})`;
      this.ctx.fill();
    }
  }

  animate() {
    this.time++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawNebula();
    this.drawStars();
    this.spawnShootingStar();
    this.drawShootingStars();
    this.drawCursorAurora();

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GalaxyCanvas('particles-canvas');
});
