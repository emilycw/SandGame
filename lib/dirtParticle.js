(function () {
  if (typeof SandGame === "undefined") {
    window.SandGame = {};
  }


  var DirtParticle = SandGame.DirtParticle = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.accel = [0,1];
    this.color = "#7D5833";
    this.game = options.game;
    this.inPile = false;
    this.density = 2;
  };

  SandGame.Util.inherits(DirtParticle, SandGame.MovingParticle);

  DirtParticle.prototype.pileMove = function(){
    if (this.pos[1] === 600 || this.pos[0] === 0 || this.pos[0] === 1000){
      return;
    }


    var beneath = this.game.positions["" + this.pos[0] + "," + (this.pos[1] + 1)]
    if ( beneath === undefined){
      this.inPile = false;
      this.accel = [0,1];
      this.fall();

      return;
    }

    if (beneath.density < this.density){
      holder = beneath.pos;
      beneath.pos = this.pos;
      this.pos = holder;
      this.game.positions["" + this.pos[0] + "," + (this.pos[1])] = this;
      this.game.positions["" + beneath.pos[0] + "," + (beneath.pos[1])] = beneath;

    }

    downRightPos = [this.pos[0] + 1, this.pos[1] + 1]
    downLeftPos = [this.pos[0] - 1, this.pos[1] + 1]
    downRightRightPos = [this.pos[0] + 2, this.pos[1] + 1]
    downLeftLeftPos = [this.pos[0] - 2, this.pos[1] + 1]

    downRight = "" + downRightPos[0] + "," + downRightPos[1];
    downLeft = "" + downLeftPos[0] + "," + downLeftPos[1];
    downRightRight = "" + downRightRightPos[0] + "," + downRightRightPos[1];
    downLeftLeft = "" + downLeftLeftPos[0] + "," + downLeftLeftPos[1];

    if (this.game.positions[downRight] === undefined){
      delete this.game.positions["" + this.pos[0] + "," + this.pos[1]]
      this.pos = downRightPos;
      this.game.positions[downRight] = this;
    } else if (this.game.positions[downLeft] === undefined){
      delete this.game.positions["" + this.pos[0] + "," + this.pos[1]]
      this.pos = downLeftPos;
      this.game.positions[downLeft] = this;
    } else if (this.game.positions[downRightRight] === undefined){
      delete this.game.positions["" + this.pos[0] + "," + this.pos[1]]
      this.pos = downRightRightPos;
      this.game.positions[downRightRight] = this;
    } else if (this.game.positions[downLeftLeft] === undefined){
      delete this.game.positions["" + this.pos[0] + "," + this.pos[1]]
      this.pos = downLeftLeftPos;
      this.game.positions[downLeftLeft] = this;
    }
  };

})();
