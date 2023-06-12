export const slideshow = (id, options) => {
    const element = document.getElementById(id);
    const elements = Array.from(document.getElementById(id).children);
    console.log(elements);
    element.innerHTML = ""
    element.classList.add("flex", "overflow-x-hidden", "relative")
    let i = 1;
    elements.forEach(item => {
        let div = document.createElement("div");
        let image = document.createElement("img");
        // div.classList.add("w-full");
        image.classList.add("h-full", "w-full", "object-cover", "aspect-[1920]", "duration-[1s]", "transition-all", "absolute", "z-1", "slider-img")
        image.id = `slider-img-${i}`;
        i++;
        image.setAttribute("src", item.src);
        // div.append(image);
        element.append(image);
    })
        document.getElementById(`slider-img-1`).classList.add("showing")
        let x = 0;
        // setInterval(()=>{
        //     if(x >= elements.length) x = 0
        //     x = x + 1;
        //         document.getElementById(`slider-img-${x - 1}`).classList.remove("showing")
        //         document.getElementById(`slider-img-${x - 1}`).classList.add("transitioning-out")
        //         document.getElementById(`slider-img-${x}`).classList.add("transitioning-in")
        //         setTimeout(()=>{
        //             document.getElementById(`slider-img-${x}`).classList.remove("transitioning-in")
        //             document.getElementById(`slider-img-${x}`).classList.add("showing")
        //             document.getElementById(`slider-img-${x-1}`).classList.remove("transitioning-out")
        //         }, 300)
        // }, options?.interval || 3000)
}