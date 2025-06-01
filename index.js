const { createCanvas } = require('canvas');
const Crystal = require('./crystal.js');

class CelestineForge {
  constructor() {
    this.canvas = createCanvas(480, 720);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 12;
    this.rows = 18;
    this.crystals = [];
    this.score = 0;
    this.phase = 1;
    this.maxCrystals = 5;
    this.spawnCrystal();
  }

  spawnCrystal() {
    if (this.crystals.length >= this.maxCrystals) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const state = Math.floor(Math.random() * 3); // 0: low, 1: mid, 2: high
    this.crystals.push(new Crystal(col * this.gridSize, row * this.gridSize, state));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#555555';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1a1a35';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.crystals.length - 1; i >= 0; i--) {
      this.crystals[i].draw(this.ctx);
      if (this.crystals[i].update()) {
        this.crystals.splice(i, 1);
        this.spawnCrystal();
      }
    }

    this.checkResonance();
    this.drawUI();
  }

  checkResonance() {
    const toRemove = [];
    for (let i = 0; i < this.crystals.length; i++) {
      for (let j = i + 1; j < this.crystals.length; j++) {
        const c1 = this.crystals[i];
        const c2 = this.crystals[j];
        if (
          c1.state === c2.state &&
          (
            (Math.abs(c1.x - c2.x) <= this.gridSize && c1.y === c2.y) || // Horizontal
            (Math.abs(c1.y - c2.y) <= this.gridSize && c1.x === c2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = c1.state === 0 ? '#ff6666' : c1.state === 1 ? '#6666ff' : '#66ff99';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(c1.x + this.gridSize / 2, c1.y + this.gridSize / 2);
          this.ctx.lineTo(c2.x + this.gridSize / 2, c2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 65 * this.phase;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.crystals.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnCrystal();
      if (this.score >= this.phase * 650) this.advancePhase();
    }
  }

  advancePhase() {
    this.phase++;
    this.maxCrystals = Math.min(this.maxCrystals + 1, 12);
    this.crystals.forEach(c => (c.resonance = Math.min(c.resonance + 10, 100)));
    this.spawnCrystal();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Phase: ${this.phase}`, 10, 45);
  }

  handleClick(x, y) {
    for (const crystal of this.crystals) {
      const d = Math.sqrt(
        Math.pow(x - (crystal.x + this.gridSize / 2), 2) +
        Math.pow(y - (crystal.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        crystal.state = (crystal.state + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.crystals = [];
    this.score = 0;
    this.phase = 1;
    this.maxCrystals = 5;
    this.spawnCrystal();
  }
}

// Example usage (for testing in Node.js)
const game = new CelestineForge();
game.update();
console.log('Celestine Forge game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
