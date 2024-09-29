// Prevent zooming with Ctrl + / Ctrl - or pinch zoom
window.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault(); // Disable zooming
    }
}, { passive: false });




document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
    }
});

// Prevent pinch zoom on touch devices
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});







const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;
let rotateDegree = 0;

// Update the position of parallax elements based on cursor movement
function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
    });
}

// Initial call
update(0);

// Mouse movement listener for parallax effect
window.addEventListener("mousemove", (e) => {
    if (timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    update(e.clientX);
});

// gsap animation
let timeline = gsap.timeline();



// Animate all other parallax elements one after another
parallax_el.forEach((el, index) => {
    timeline.from(el, {
        top: `${window.innerHeight + 300}px`, // Adjust the distance as needed (200px for other elements)
        duration: 1,
        ease: "powe3.out",
        delay: index * 0.1, // Stagger the animation, each layer starts 0.2s after the previous one
    }, "0.6");
});
timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200, // Start from outside the bottom of the screen
    duration: 2, // Duration of the animation
}, "2.3")
.from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "2.8"
  )
  .from(".hide", {
    opacity: 0,
    duration: 1.5,
  }, "3");
  
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault(); // Prevent zooming on gesture
});
// Wait for the window to load
window.addEventListener('load', function() {
    // Get the loader element by its ID
    const loader = document.getElementById('loader');
    
    // Set a timeout to hide the loader after 5 seconds
    setTimeout(function() {
        loader.style.display = 'none'; 
    }, 1000); // 5000 milliseconds = 5 seconds
});
window.onload = function() {
    setTimeout(autoRefresh, 2000); // Refresh after 2 seconds
};
