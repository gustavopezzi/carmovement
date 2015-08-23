$(document).ready(function() {
    function render(update) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        intervalId = setInterval(move, 25);

        var CANVAS_WIDTH = canvas.width - 10;
        var CANVAS_HEIGHT = canvas.height - 10;
          
        var car = {
            x: CANVAS_WIDTH / 4,
            y: CANVAS_HEIGHT / 2 - 20,
            angle: Math.PI / 2,
            speed: 0,
            maxSpeed: 8.0,
            acc: 0.2,
            dec: 0.3,
            omega: 0,
            turnThrottle: 40,
            speedRatio: 1
        };

        var KEY_F = false;
        var KEY_B = false;
        var KEY_L = false;
        var KEY_R = false;
        
        var carImg = new Image();
        carImg.src = "img/car.png";
        
        carImg.onload = function() {
            ctx.save();
            ctx.translate(car.x, car.y);
            ctx.rotate(car.angle);
            ctx.drawImage(carImg, -15, -27);
            ctx.restore();
        }

        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);

        function onKeyDown(evt) {
            if (evt.keyCode == 39)
                KEY_R = true;
            else if (evt.keyCode == 37)
                KEY_L = true;
            else if (evt.keyCode == 38)
                KEY_F = true;
            else if (evt.keyCode == 40)
                KEY_B = true;
            if (KEY_F || KEY_B)
                evt.preventDefault();
        }

        function onKeyUp(evt) {
            if (evt.keyCode == 39)
                KEY_R = false;
            else if (evt.keyCode == 37)
                KEY_L = false;
            else if (evt.keyCode == 38)
                KEY_F = false;
            else if (evt.keyCode == 40)
                KEY_B = false;
        }

        function clear() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        function move() {
            if (KEY_F && car.speed < car.maxSpeed) {
                if (car.speed < 0)
                    car.speed += car.dec;
                else
                    car.speed += car.acc;
            }
            else if (KEY_B && car.speed > (-1 * car.maxSpeed)) {
                if (car.speed > 0)
                    car.speed -= car.dec;
                else
                    car.speed -= car.acc;
            }
            else {
                if (car.speed - car.dec > 0)
                    car.speed -= car.dec;
                else if (car.speed + car.dec < 0)
                    car.speed += car.dec;
                else
                    car.speed = 0;
            }

            if (car.speed != 0) {
                car.speedRatio = car.speed / car.maxSpeed;
                car.omega = (Math.PI / car.turnThrottle) * car.speedRatio;
            }

            car.x += Math.sin(car.angle) * car.speed;
            car.y -= Math.cos(car.angle) * car.speed;   

            if (car.x > CANVAS_WIDTH - 30)
                car.x = CANVAS_WIDTH - 30;
            if (car.x < 30)
                car.x = 30;
            if (car.y > CANVAS_HEIGHT - 30)
                car.y = CANVAS_HEIGHT - 30;
            if (car.y < 30)
                car.y = 30;

            if (KEY_R && car.speed != 0)
                car.angle += car.omega;
            else if (KEY_L && car.speed != 0)
                car.angle -= car.omega;

            clear();

            ctx.save();
            ctx.translate(car.x, car.y);
            ctx.rotate(car.angle);
            ctx.drawImage(carImg, -15, -27);
            ctx.restore();
        }
    }

    window.onload = function() {
        render(false);
    }
});