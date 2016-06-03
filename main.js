// Declarations
var wWidth,
    wHeight,
    updateLoop,
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
    ctx = c.getContext(),
    COUNT = 1024,
    dots = new Array(COUNT),
    points = new Float32Array(COUNT * 2);

// Set canvas render width and height
c.width = wWidth = window.width;
c.height = wHeight = window.height;

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

window.addEventListener('resize', function () {
    wWidth = window.width;
    wHeight = window.height;
});

/**
 * Velocity
 * 
 * @param {number} speed
 * @param {number} direction
 */
Velocity = function(speed, direction) {
    this.speed = speed;
    this.direction = direction;
}

Velocity.prototype.getYDelta = function () {
    return Math.asin(this.direction) * this.speed;
}

Velocity.prototype.getXDelta = function () {
    return Math.acos(this.direction) * this.speed;
}

/**
 * Dot
 * 
 * @param {number} x
 * @param {number} y
 * @param {number} direction
 * @param {number} size
 */
Dot = function (x, y, direction, size) {
    this.x = x;
    this.y = y;
    this.velocity = new Velocity(this.speed, direction);
    this.size = size;
};

Dot.prototype.gravity = 0.5;
Dot.prototype.friction = 0.001;
Dot.prototype.speed = 4;
Dot.prototype.bounce = 0.7;

/**
 * 
 */
Dot.prototype.detectCollision = function () {
    
};

/**
 * 
 */
Dot.prototype.applyBounce = function () {
    
};

/**
 * 
 */
Dot.prototype.applyFriction = function () {
    
};

/**
 * 
 */
Dot.prototype.applyGravity = function () {
    
};

randomX = function() {
    return Math.random() * wWidth;
};

randomY = function () {
    return Math.random() * wHeight;
};

randomDir = function () {
    return Math.random() * (Math.Pi * 2);
};

initialize = function () {
    for (var i = 0; i < COUNT; i++) {
        // Create dots with pseudorandom coordinates and directions
        dots[i] = new Dot(randomX(), randomY(), randomDir(), 5);
        
        // Set initial positions
        points[i * 2] = dots[i].x;
        points[i * 2 + 1] = dots[i].y;
    }
};

update = function () {
    
};

render = function () {
    for (var i = 0; i < COUNT * 2; i += 2) {
        ctx.fillRect(points[i], points[i + 1], 1, 1);
    }
};

beginUpdateLoop = function () {
    // 16ms for 60 updates per second
    // TODO Add an interrupt thing to prevent stacking updates
    const interval = 16;
    var isBusy = false;
    updateLoop = window.setInterval(function () {
        if (!isBusy) {
            isBusy = true;
            // Update stuff
            isBusy = false;
        }
    }, interval);
};

beginRenderLoop = function () {
    render();
    window.requestAnimationFrame(render);
};