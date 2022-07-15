const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    prepAnimation();
});

document.addEventListener("mouseleave", () => {
    mousePosition.x = undefined;
    mousePosition.y = undefined;
});

canvas.addEventListener("touchend", () => {
    setTimeout(() => {
        mousePosition.x = undefined;
        mousePosition.y = undefined;
    }, 500);
});

// Circle Growing Effect
class Circle {
    constructor(x, y, radius, velocity, color) {
        (this.x = x),
            (this.y = y),
            (this.radius = radius),
            (this.minRadius = this.radius),
            (this.maxRadius = 50),
            (this.velocity = velocity),
            (this.color = color),
            (this.growRadius = 50);
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if (this.x <= 0 + this.radius || this.x >= canvas.width - this.radius) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y <= 0 + this.radius || this.y >= canvas.width - this.radius) {
            this.velocity.y = -this.velocity.y;
        }

        if (
            mousePosition.x - this.growRadius <= this.x &&
            this.x < mousePosition.x + this.growRadius &&
            mousePosition.y - this.growRadius <= this.y &&
            this.y < mousePosition.y + this.growRadius &&
            this.radius <= this.maxRadius
        ) {
            this.radius += 1;
        } else if (this.radius !== this.minRadius) {
            this.radius -= 1;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw();
    }
}

const mousePosition = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener("mousemove", (e) => {
    mousePosition.x = e.x;
    mousePosition.y = e.y;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    mousePosition.x = e.touches[0].clientX;
    mousePosition.y = e.touches[0].clientY;
});

let circleArray = [];
const colorArray = ["#e63946", "#e9c46a", "#a8dadc", "#457b9d", "#1d3557"];
function prepAnimation() {
    circleArray = [];

    for (var i = 0; i < (canvas.width * canvas.width) / 1000; i++) {
        const radius = Math.floor(Math.random() * (5 - 2) + 2);
        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y = Math.random() * (innerWidth - radius * 2) + radius;
        const velocity = {
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4,
        };
        const color =
            colorArray[Math.floor(Math.random() * colorArray.length - 1)];

        circleArray.push(new Circle(x, y, radius, velocity, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    circleArray.forEach((circle) => {
        circle.update();
    });
}

prepAnimation();
animate();
