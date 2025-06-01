class Crystal {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state; // 0: low, 1: mid, 2: high
    this.resonance = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.state === 0 ? '#ff6666' : this.state === 1 ? '#6666ff' : '#66ff99';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.resonance / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.resonance -= 0.55;
    return this.resonance <= 0;
  }
}

module.exports = Crystal;
