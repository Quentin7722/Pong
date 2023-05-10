class Computer {
  constructor(canvas) {
    this.width = 10;
    this.height = canvas.height / 20;
    this.x = canvas.width / 4;
    this.y = (canvas.height - this.height) / 2;
    this.speed = 2.7;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }
  draw() {
    this.context.fillStyle = "white";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  move(ball) {
    var paddleCenter = this.y + this.height / 2;
    var ballCenter = ball.y + ball.size / 2;
    // Vérifier si la balle est plus haut ou plus bas que le centre de la raquette
    if (ballCenter < paddleCenter - this.height / 4) {
      this.y -= this.speed;
    } else if (ballCenter > paddleCenter + this.height / 4) {
      this.y += this.speed;
    }
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }
  reset() {
    this.y = (this.canvas.height - this.height) / 2;
  }
}

export default Computer;
