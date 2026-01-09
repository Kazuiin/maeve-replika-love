 
const dragWM = document.querySelectorAll(".dragWM");

    dragWM.forEach((dragWM) => {
        let startX = 0;
        let startY = 0;
        const mousePos = (e) => {
            startY = startY + e.movementY
            startX = startX + e.movementX
            dragWM.parentElement.style.top = startY + "px";
            dragWM.parentElement.style.left = startX + "px";

            };

            dragWM.addEventListener("mousedown", () => {
                startX = dragWM.parentElement.getBoundingClientRect().left;
                startY = dragWM.parentElement.getBoundingClientRect().top;
                if (isNaN(startX)) startX = 0;
                if (isNaN(startY)) startY = 0;
                window.addEventListener("mousemove", mousePos);
            });

            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", mousePos);
            });
    });
                