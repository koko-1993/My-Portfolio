/**
 * Typewriter Effect Module
 * Cycles through an array of strings with typing & deleting animation
 */
class Typewriter {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.pauseDuration = options.pauseDuration || 2000;
    this.currentWordIndex = 0;
    this.currentText = '';
    this.isDeleting = false;
    this.loop();
  }

  loop() {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      this.currentText = currentWord.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = currentWord.substring(0, this.currentText.length + 1);
    }

    this.element.textContent = this.currentText;

    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentText === currentWord) {
      speed = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      speed = 400;
    }

    setTimeout(() => this.loop(), speed);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const typewriterEl = document.querySelector('.typewriter-text');
  if (typewriterEl) {
    const words = [
      'IT Support Officer',
      'Web Developer',
      'Tech Enthusiast',
      'Problem Solver'
    ];
    new Typewriter(typewriterEl, words);
  }
});
