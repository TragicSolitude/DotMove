// Declarations
var wWidth,
    wHeight,
    updateLoop,
    swap,
    Velocity,
    Dot,
    randomX,
    randomY,
    randomDir,
    initialize,
    update,
    render,
    beginUpdateLoop,
    beginRenderLoop;

// Assignments
var c = document.querySelector('canvas'),
    ctx = c.getContext('2d'),
    COUNT = 1024,
    dots = new Array(COUNT),
    points = new Float32Array(COUNT * 2),
    isBusy = false;

// Set canvas render width and height
c.width = wWidth = window.screen.availWidth;
c.height = wHeight = window.screen.availHeight;

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

window.addEventListener('resize', function () {
    c.width = wWidth = window.screen.availWidth;
    c.height = wHeight = window.screen.availHeight;
});

/**
 * Basic identity function for swapping variables
 * 
 * param {any} x
 */
swap = x => x;

/**
 * Velocity
 * 
 * A class that represents an arbitrary vector
 * 
 * @param {number} speed The length of the vector
 * @param {number} direction The direction of the vector in radians
 */
Velocity = function(speed, direction) {
    this.speed = speed;
    this.xDelta = Math.cos(direction);
    this.yDelta = Math.sin(direction);
}

/**
 * Dot
 * 
 * The class that represents the logic behind the dots on the canvas
 * 
 * @param {number} x The x coordinate of the dot
 * @param {number} y The y coordinate of the dot
 * @param {number} direction The initial direction of the Dot in radians
 * @param {number} size The size of the dot in pixels
 */
Dot = function (x, y, direction, size) {
    this.x = x;
    this.y = y;
    this.velocity = new Velocity(this.speed, direction);
    this.size = size;
};

Dot.prototype.gravity = 0.5;
Dot.prototype.friction = 0.001;
Dot.prototype.speed = 2;
Dot.prototype.bounce = 0.7;

/**
 * Returns the distance between the current dot and other
 * 
 * @param {Dot} other
 * @return {number} The distance between this and other
 */
Dot.prototype.distanceTo = function (other) {
    return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
}

/**
 * Moves the dot according to its velocity
 */
Dot.prototype.move = function () {
    this.x += this.velocity.xDelta * this.velocity.speed;
    this.y += this.velocity.yDelta * this.velocity.speed;
};

/**
 * Checks for, and applies a collision with another dot
 * 
 * @param {Dot} other
 */
Dot.prototype.applyCollision = function (other) {
    if (this.distanceTo(other) < this.size + other.size) {
        other.velocity = swap(other.velocity, this.velocity = other.velocity);
    }
};

/**
 * Applies friction to the velocity of the dot
 */
Dot.prototype.applyFriction = function () {
    if (this.velocity.xDelta < 0)
        this.velocity.xDelta += this.friction;
    else
        this.velocity.xDelta -= this.friction;
    
    if (this.velocity.yDelta < 0)
        this.velocity.yDelta += this.friction;
    else
        this.velocity.yDelta -= this.friction;
};

/**
 * Applies simulated gravity to the velocity of the dot
 */
Dot.prototype.applyGravity = function () {
    this.velocity.yDelta += this.gravity;
};

/**
 * Generates a pseudorandom x coordinate that fits within the canvas
 * 
 * @return {number} A pseudorandom x coordinate
 */
randomX = function() {
    return Math.random() * wWidth;
};

/**
 * Generates a pseudorandom y coordinate that fits within the canvas
 * 
 * @return {number} A pseudorandom y coordinate
 */
randomY = function () {
    return Math.random() * wHeight;
};

/**
 * Generates a pseudorandom direction in radians
 * 
 * @return {number} A pseudorandom radian value between 0 and 2 * Pi
 */
randomDir = function () {
    return Math.random() * (Math.PI * 2);
};

/**
 * Initializes the dots and points arrays
 */
initialize = function () {
    for (var i = 0; i < COUNT; ++i) {
        // Create dots with pseudorandom coordinates and directions
        dots[i] = new Dot(randomX(), randomY(), randomDir(), 5);
        
        // Set initial positions
        points[i * 2] = dots[i].x;
        points[i * 2 + 1] = dots[i].y;
    }
};

/**
 * Runs all of the calculations on each dot
 */
update = function () {
    for (var i = 0; i < COUNT; ++i) {
        if (dots[i].x < 0 || dots[i].x > wWidth) {
            dots[i].velocity.xDelta *= -this.bounce;
        }
        if (dots[i].y < 0 || dots[i].y > wHeight) {
            dots[i].velocity.yDelta *= -this.bounce;
        }
        
        for (var j = 0; j < COUNT; ++j) {
            dots[i].applyCollision(dots[j]);
        }
        
        dots[i].applyFriction();
        dots[i].applyGravity();
        dots[i].move();
        
        points[i * 2] = dots[i].x;
        points[i * 2 + 1] = dots[i].y;
    }
};

/**
 * Draws each dot onto the canvas
 */
render = function () {
    ctx.clearRect(0, 0, wWidth, wHeight);
    for (var i = 0; i < COUNT * 2; i += 2) {
        ctx.fillRect(points[i], points[i + 1], 4, 4);
    }
};

/**
 * Starts an interval to update all of the dots
 */
beginUpdateLoop = function () {
    // 16ms for 60 updates per second
    const interval = 16;
    var isBusy = false;
    updateLoop = window.setInterval(function () {
        if (!isBusy) {
            isBusy = true;
            // TODO Experiment with interpolating positions or something
            // Update double -> interpolate -> render x2 -> update double -> etc...
            update();
            isBusy = false;
        }
    }, interval);
};

/**
 * Starts a loop for drawing all of the dots
 */
beginRenderLoop = function () {
    render();
    window.requestAnimationFrame(beginRenderLoop);
};

initialize();
beginUpdateLoop();
beginRenderLoop();