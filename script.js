let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let dont_click_btn = document.getElementById("dont_click_btn");
let bars_container = document.getElementById("bars_container");
let speed_range = document.getElementById("speed_range");

let minRange = 1;
let maxRange = 100;
let numOfBars = 100;
let heightFactor = 6.5;
let speedFactor = 100 - speed_range.value;

let unsorted_array = new Array(numOfBars);
let isSorting = false;
let isClicked = false;

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    for (let i = 0; i < numOfBars; i++) {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    bars_container.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        if (isClicked) {
            bar.style.backgroundColor = "red";
            bar.style.animation = "blink 1s infinite";
        }
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function () {
    if (isSorting) return;
    createRandomArray();
    renderBars(unsorted_array);
});

speed_range.addEventListener("input", function () {
    speedFactor = 100 - speed_range.value;
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    isSorting = true;
    randomize_array.disabled = true;
    sort_btn.disabled = true;
    dont_click_btn.disabled = true;

    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "#3498db";
                    }
                }

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "#e74c3c";

                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "#e74c3c";

                await sleep(speedFactor);
            }
        }
        await sleep(speedFactor);
    }

    // Reset all bars to original color after sorting
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#3498db";
    }

    isSorting = false;
    randomize_array.disabled = false;
    sort_btn.disabled = false;
    dont_click_btn.disabled = false;

    return array;
}

sort_btn.addEventListener("click", function () {
    if (isSorting) return;
    bubbleSort(unsorted_array);
});

dont_click_btn.addEventListener("click", async function () {
    alert("You did it anyways, dammit!");
    document.body.style.backgroundColor = "black";
    isClicked = true;

    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "red";
        bars[i].style.animation = "blink 1s infinite";
    }

    createRandomArray();
    renderBars(unsorted_array);
});
