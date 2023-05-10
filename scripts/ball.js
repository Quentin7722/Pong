class Ball {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.directionX = 1;
    this.directionY = 1;
    this.size = 10;
    this.speed = 3;
    this.playerScore = 0;
    this.computerScore = 0;
  }
  draw() {
    this.context.fillStyle = "white";
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }
  move(player, computer) {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
    if (this.y + this.size > this.canvas.height) {
      this.directionY = -1;
      this.y = this.canvas.height - this.size;
    } else if (this.y < 0) {
      this.directionY = 1;
      this.y = 0;
    }
    if (this.x + this.size > player.x + 10) {
      this.reset();
      this.playerScore++;
    } else if (this.x + 10 < computer.x + computer.width) {
      this.reset();
      this.computerScore++;
    }
    if (
      this.x + this.size >= player.x &&
      this.y + this.size >= player.y &&
      this.y <= player.y + player.height
    ) {
      // Collision avec le joueur
      let playerCenter = player.y + player.height / 2;
      let ballCenter = this.y + this.size / 2;
      let deltaY = ballCenter - playerCenter;
      this.directionX *= -1;
      this.directionY = deltaY / (this.canvas.height / 20 / 2);
    } else if (
      this.x <= computer.x + computer.width &&
      this.y + this.size >= computer.y &&
      this.y <= computer.y + computer.height
    ) {
      // Collision avec l'ordinateur
      let computerCenter = computer.y + computer.height / 2;
      let ballCenter = this.y + this.size / 2;
      let deltaY = ballCenter - computerCenter;

      this.directionX *= -1;
      this.directionY = deltaY / (computer.height / 2);
    }
  }
  reset() {
    this.x = this.canvas.width / 2;
    let verticalZonePercentage = 0.2;
    let verticalZoneHeight = this.canvas.height * verticalZonePercentage;
    let minY = (this.canvas.height - verticalZoneHeight) / 2;
    let maxY = minY + verticalZoneHeight;
    this.y = Math.random() * (maxY - minY) + minY;
    this.directionX *= 1;
    this.directionY = Math.random() * 2 - 1;
  }
}

export default Ball;
