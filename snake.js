//let CHUNK (base resource) do the executions and draws. 😎
var advanceGame = function() {
    var newSnake = moveSnake(snake);
  
    if (ate(newSnake, snake)) {
      CHUNK.endGame();
      CHUNK.flashMessage("YOU CHOMPED YOUR TAIL. OUCHIES!");
    }
  
    if (ate(newSnake, [apple])) {
      newSnake = growSnake(newSnake);
      apple = CHUNK.randomLocation();
    }
  
    if (ate(newSnake, CHUNK.gameBoundaries())) {
      CHUNK.endGame();
      CHUNK.flashMessage("YOU BUMPED YOUR HEAD. D'OH!");
    }
  
    snake = newSnake;
    draw(snake, apple);
  }

//to allow key input to change direction:
var changeDirection = function(direction) {
    snake[0].direction = direction;
}

//autovore now allowed (yikes).
var ate = function(snake, otherThing) {
    var head = snake[0];
    return CHUNK.detectCollisionBetween([head], otherThing);
}

//nourishment is necessary to grow. 
var draw = function(snakeToDraw, apple) {
    var drawableSnake = { color: "#8877cc", pixels: snakeToDraw };
    var drawableApple = { color: "#fa6e60", pixels: [apple] };
    var drawableObjects = [drawableSnake, drawableApple];
    CHUNK.draw(drawableObjects);
}

//allows ya boi to grow upon consumption of the apples. 
var growSnake = function(snake) {
    var indexOfLastSegment = snake.length - 1;
    var lastSegment = snake[indexOfLastSegment];
    snake.push({ top: lastSegment.top, left: lastSegment.left });
    return snake;
  }

//define thine snake.
/* initial version:
var drawSnake = function(snakeToDraw) {
    var drawableSnake = { color: "#8877cc", pixels: snake };
    var drawableObjects = [drawableSnake];
    CHUNK.draw(drawableObjects);
}
*/

//give ya boi life. tell them how to move.
/* old ver:
var moveSnake = function(snake) {
    var newSnake = [];
//forEach = looping. refer to lesson 9. 
    snake.forEach(function(oldSegment) {
      var newSegment = moveSegment(oldSegment);
      newSegment.direction = oldSegment.direction;
      //btw that confusing `newSegment.direction = oldSegment.direction;` is cuz of how CHUNK is written, r.i.p.
      newSnake.push(newSegment);
    });
  
    return newSnake;
}
*/

//cleaner version: 
var moveSnake = function(snake) {
    return snake.map(function(oldSegment, segmentIndex){
        var newSegment = moveSegment(oldSegment);
        newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
        return newSegment;
    })
}

var segmentFurtherForwardThan = function(index, snake) {
    if (snake[index - 1] === undefined) {
      return snake[index];
    } else {
      return snake[index - 1];
    }
  }

//looks at the oldSeg and mmMMM I missed that
//anyways, say hi to the if/else version (now commented out so the switch version works)
/*
var moveSegment = function(segment) {
    if (segment.direction === "down") {
      return { top: segment.top + 1, left: segment.left }
    } else if (segment.direction === "up") {
      return { top: segment.top - 1, left: segment.left }
    } else if (segment.direction === "right") {
      return { top: segment.top, left: segment.left + 1 }
    } else if (segment.direction === "left") {
      return { top: segment.top, left: segment.left - 1 }
    }
    return segment;
}
*/

//say hi to your new best friend, switch statements :^) 
var moveSegment = function(segment) {
    switch(segment.direction) {
      case "down":
        return { top: segment.top + 1, left: segment.left };
      case "up":
        return { top: segment.top - 1, left: segment.left };
      case "right":
        return { top: segment.top, left: segment.left + 1 }
      case "left":
        return { top: segment.top, left: segment.left - 1 }
      default:
        return segment;
    }
}

/* okay, so switch is a cleaner, more efficient if/else, bASICALLY.
they're interchangable, more or less,
though there are certain instances when only if/else can be used */

//we all begin somewhere, but we must move on. the snake has a direction in life now.
/*the snake has nourishment now. 
this apple is defined as an array above, so it's not defined as such here*/
var apple = {top: 8, left:10 };
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];
//give ya boi caffeine to get 'em going faster. +1 advanceGame value = +1 coffee. 
CHUNK.executeNTimesPerSecond(advanceGame, 6);
//the snake can also now accept arrow key input. what an amicable creature. 
CHUNK.onArrowKey(changeDirection);

/* ＣＯＮＳＵＭＥ
that is your purpose, small pixel creature */