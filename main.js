 
const dragWM = document.querySelectorAll(".dragWM");

    dragWM.forEach((dragWM) => {
        
         const mousePos = (e) => {
            dragWM.style.top = e.pageY + "px";
            dragWM.style.left = e.pageX + "px";
            };

            dragWM.addEventListener("mousedown", () => {
                window.addEventListener("mousemove", mousePos);
            });

            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", mousePos);
            });
    });
                