/*
 * I pretty much rewrote everything here
 * - Anthony Cieri
 */

let maxOffset = 50;
class Obstacle
{
  constructor(x, acc, playerXVel, gameFrame, obstacleSpaceWidth)
  {
    //these are all calculated in calcInterpolation
    this.x = 0.0;
    this.y = 0.0;
    this.finalY = 0.0;
    this.frameInterval = 0;
    this.frame = 0;
    this.collisionFrame = 0;

    this.calcInterpolation(x, acc, playerXVel, gameFrame, obstacleSpaceWidth);
  }

  //Calculates the parameters required for interpolation (animating the obstacles). Essentially, this resets the obstacle
  calcInterpolation(x, acc, playerXVel, gameFrame, obstacleSpaceWidth)
  {
    this.randomOffset = normalDist() * maxOffset;

    this.frame = 0;
    this.finalY = newHeight(lastHeight);
    this.x = x + this.randomOffset;
    this.y = this.finalY;

    // Obstacles only start moving after the player moves fast enough
    if(xVel < -3)
    {
        this.y = newHeight(lastHeight);
    }
    lastHeight = this.finalY;

    //solve for time (in frames) using SUVAT eqs.
    let root = Math.sqrt((playerXVel * playerXVel) + (2 * (-acc) * (obstacleSpaceWidth + this.randomOffset)));
    this.collisionFrame = (gameFrame + ((-playerXVel - root) / acc));
    
    this.frameInterval = this.collisionFrame - gameFrame;
  }
}

// returns a random number x where 0 <= x <= 1, distributed normally around 0
// copied an equation in my desmos account that I think I got from wikipedia
function normalDist()
{
  let u = (2 * Math.random()) - 1;
  let v = (2 * Math.random()) - 1;

  let k = (u * u) + (v * v);

  let s = Math.sqrt(-(2 * Math.log(k) / k));

  if (s <= 0)
  {
    return 0;
  }
  else if(s >= 1)
  {
    return 1
  }

  return s;
}

class Player
{
  constructor(key, color, y)
  {
    this.finalScore = 0;
    this.flapKey = key;
    this.yVel = initJump;
    this.x = 10 + (10 * (Math.random() - 0.5));
    this.y = y
    this.rotation = 0.0;
    this.color = color
    this.ImageDown = new Image();
    this.ImageDown.src = "images/player" + color + ".png";
    this.alive = true;
  }
}