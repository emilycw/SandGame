(function () {
  if (typeof SandGame === "undefined") {
    window.SandGame = {};
  }


  var SeedParticle = SandGame.SeedParticle = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.accel = [0,1];
    this.color = "#00CC00";
    this.game = options.game;
    this.inPile = false;
    this.density = 1;
  };

  SandGame.Util.inherits(SeedParticle, SandGame.MovingParticle);

  SeedParticle.prototype.maybeBloom = function(){
    var touching = [[0,1],[0,-1],[1,1],[1,0],[1,-1],[-1,1],[-1,0],[-1,-1]];
    var touchingWater = false;
    var touchingDirt = false;
    for (var i = touching.length - 1; i >= 0; i--) {
      var touchingThing = this.game.positions["" + (this.pos[0]+touching[i][0]) + "," + (this.pos[1]+touching[i][1])];
      if (touchingThing instanceof SandGame.WaterParticle){
        touchingWater = true
      } else if (touchingThing instanceof SandGame.DirtParticle){
        touchingDirt = true
      } ;
    };
    if (touchingDirt && touchingWater){
      this.game.add(new SandGame.Flower({
          pos: this.pos,
          game: this.game
        }));
      return true;
    }
    return false;
  };

  SeedParticle.prototype.move = function () {
    if (!this.maybeBloom()){
      if (this.inPile){
        this.pileMove();
        return;
      }
      this.fall();
    } 
  };


})();