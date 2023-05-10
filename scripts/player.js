class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 10;
    this.height = canvas.height / 20;
    this.x = canvas.width - canvas.width / 4;
    this.y = (canvas.height - this.height) / 2;
  }
  draw(context) {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  reset() {
    this.y = (this.canvas.height - this.height) / 2;
  }
}

export default Player;
