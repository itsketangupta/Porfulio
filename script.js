function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const numericHours = hours;
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let dayOfWeek = now.getDay();


    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    let greeting;
    if (numericHours < 12) {
        greeting = "Good Morning";
    } else if (numericHours < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const shiftEl = document.querySelector(".shift");
    if (shiftEl) shiftEl.textContent = greeting;


    if (dayOfWeek == 0) { dayOfWeek = "Sun" };
    if (dayOfWeek == 1) { dayOfWeek = "Mon" };
    if (dayOfWeek == 2) { dayOfWeek = "Tue" };
    if (dayOfWeek == 3) { dayOfWeek = "Wed" };
    if (dayOfWeek == 4) { dayOfWeek = "Thur" };
    if (dayOfWeek == 5) { dayOfWeek = "Fri" };
    if (dayOfWeek == 6) { dayOfWeek = "Sat" };


    const timeEl = document.getElementById("time");
    const dayEl = document.getElementById("day");
    const dateEl = document.getElementById("date");

    if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
    if (dayEl) dayEl.textContent = `${dayOfWeek}`;
    if (dateEl) dateEl.textContent = `${date}/${month}/${year}`;
}

updateTime();

setInterval(updateTime, 1000);

let selected = null;
let offsetX = 0;
let offsetY = 0;
let zIndex = 1;

let hasMoved = false;

document.querySelectorAll(".img").forEach(img => {

    img.addEventListener("mousedown", (e) => {
        e.preventDefault(); // link issue fix

        selected = img;
        hasMoved = false;

        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;

        zIndex++;
        img.style.zIndex = zIndex;

        // ⭐ important: only track when mouse is DOWN
        document.addEventListener("mousemove", moveImage);
        document.addEventListener("mouseup", stopDrag);
    });

});

function moveImage(e) {
    if (!selected) return;

    hasMoved = true;

    selected.style.left = (e.clientX - offsetX) + "px";
    selected.style.top = (e.clientY - offsetY) + "px";
}

function stopDrag() {
    document.removeEventListener("mousemove", moveImage);
    document.removeEventListener("mouseup", stopDrag);

    selected = null;
}

// ⭐ click vs drag fix
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        if (hasMoved) {
            e.preventDefault();
        }
    });
});