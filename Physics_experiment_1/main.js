window.onload = function () {
	var canvas1 = document.getElementById('canvas-1');
	var canvas2 = document.getElementById('canvas-2');
	var canvas3 = document.getElementById('canvas-3');
	var canvas4 = document.getElementById('canvas-4');
	var canvas5 = document.getElementById('canvas-5');
	var canvas6 = document.getElementById('canvas-6');

	startAnimation(canvas1, 90, '#6ADB6F');
	startAnimation(canvas2, 80, '#F8AE67');
	startAnimation(canvas3, 50, '#E73535');
	startAnimation(canvas4, 45, '#008B8B');
	startAnimation(canvas5, 20, 'white');
	startAnimation(canvas6, 10, 'blue');

};

var startAnimation = function (canvas, framerate, color) {
	var ctx = canvas.getContext('2d');

	var BOUNCE_DAMPENING = 0.9;
	var RADIUS = 15;
	var MIN_PHYSICS_TICK = 1000 / 60;

	var position = { x: RADIUS + 35, y: 0 };
	var velocity = { x: 0, y: 0 };
	var acceleration = { x: 0, y: 1E-3 };

	var lastTick = Date.now();

	/** Update position and velocity */
	var doPhysics = function (delta) {
		// CALC NEW VELOCITIES
		velocity.y = velocity.y + acceleration.y * delta;
		velocity.x = velocity.x + acceleration.x * delta;

		// CALC NEW POSITIONS
		position.y = position.y += velocity.y * delta;
		position.x = position.x += velocity.x * delta;
	};

	/** Check for collisions with floor */
	var checkCollisions = function () {
		if (position.y + RADIUS > canvas.height) {
			position.y = canvas.height - RADIUS;
			velocity.y = -1 * BOUNCE_DAMPENING * velocity.y;
		}
	};

	/** Draw the object */
	var draw = function () {
		// CLEAR CANVAS
		canvas.width = canvas.width;

		// DRAW BALL
		ctx.beginPath();
		ctx.arc(position.x, position.y, RADIUS, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	};


	/**********************************
     * This executes every frame.
     */
	setInterval(function () {
		// CALCULATE TIME DELTA
		var now = Date.now();
		var delta = now - lastTick;

		// HOW MANY PHYSICS CALCULATIONS SHOULD WE DO?
		var numTicks = Math.ceil(delta / MIN_PHYSICS_TICK);

		// DO PHYSICS CHECKS
		for (var i = 0; i < numTicks; i++) {
			doPhysics(delta / numTicks);
			checkCollisions();
		}

		//  DRAW CANVAS FRAME
		draw();

		lastTick = now;
	}, 1000 / framerate);
};


