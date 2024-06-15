const images = document.querySelectorAll('.image');
const blackSection = document.querySelector('.black-section');
const height = blackSection.offsetHeight;
const width = blackSection.offsetWidth;

// Define the number of rows and columns in the grid
const rows = 4;
const cols = 4;

// Calculate the width and height of each slot in the grid
const slotWidth = width / cols;
const slotHeight = height / rows;

// Create an array to keep track of occupied slots
const occupiedSlots = Array(rows).fill().map(() => Array(cols).fill(false));

function placeImageInRandomSlot(image) {
    let row, col;
    let tries = 0; // Limit the number of tries to avoid infinite loops
    const maxTries = 100;
    
    do {
        if (tries++ > maxTries) {
            console.error("Could not find an empty slot");
            return; // Exit if we can't find a slot after several tries
        }
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
    } while (occupiedSlots[row][col]);

    occupiedSlots[row][col] = true;

    const x = col * slotWidth + (slotWidth - image.width) / 2;
    const y = row * slotHeight + (slotHeight - image.height) / 2;

    image.style.position = 'absolute'; // Make sure images are positioned absolutely
    image.style.top = `${y}px`;
    image.style.left = `${x}px`;

    fadeIn(image, row, col);
}

function fadeIn(element, row, col) {
    element.style.opacity = 0;
    let opacity = 0;
    const intervalId = setInterval(() => {
        opacity += 0.05;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(intervalId);
            setTimeout(() => {
                fadeOut(element, row, col);
            }, 5000);
        }
    }, 20);
}

function fadeOut(element, row, col) {
    let opacity = 1;
    const intervalId = setInterval(() => {
        opacity -= 0.05;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(intervalId);
            occupiedSlots[row][col] = false; // Free up the slot

            placeImageInRandomSlot(element); // Place the image in a new slot
        }
    }, 20);
}

// Initialize the placement of all images
images.forEach(image => {
    placeImageInRandomSlot(image);
});









let index = 0,
    interval = 1000;

const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
}


const trailer = document.getElementById("trailer");

window.onmousemove = e => {
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px)`
    }

    trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards"
    })
}







const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval_a = null;

document.addEventListener("DOMContentLoaded", event => {
    let iteration = 0;
    const h1 = document.querySelector("h1");

    clearInterval(interval_a);

    interval_a = setInterval(() => {
        h1.querySelector(".magic").innerText = h1.querySelector(".magic").innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return h1.querySelector(".magic").dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if (iteration >= h1.querySelector(".magic").dataset.value.length) {
            clearInterval(interval_a);
        }

        iteration += 1 / 3;
    }, 30);
});
