//Cell Object

function Cell(x, y, scl) {
    this.x = x;
    this.y = y;
    this.scl = scl;

    this.visited = false;
    this.walls = {
        up: true,
        right: true,
        down: true,
        left: true
    };

}

Cell.prototype.show = function () {
    let x = this.x * this.scl;
    let y = this.y * this.scl;
    let scl = this.scl;
    stroke(0);
    strokeWeight(2);
    fill(0,100,255);
    if (this.walls.up) line(x, y, x + scl, y);
    if (this.walls.right) line(x + scl, y, x + scl, y + scl);
    if (this.walls.down) line(x + scl, y + scl, x, y + scl);
    if (this.walls.left) line(x, y + scl, x, y);
    if (!this.visited) rect(x,y,scl,scl);

}

Cell.prototype.removeWall = function (wall) {
    this.walls[wall] = false;
}

Cell.prototype.visit = function () {
    this.visited = true;
}