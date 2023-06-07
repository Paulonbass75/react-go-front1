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
        image.classList.add("h-full", "w-full", "object-cover", "aspect-[1920]", "duration-[1s]", "transition-all", "absolute", "z-1")
        image.id = `slider-img-${i}`;
        i++;
        image.setAttribute("src", item.src);
        // div.append(image);
        element.append(image);
    })
        // let x = 0;
        // setInterval(()=>{
        //     x = x+1;
        //     while(x < 3){
        //         setTimeout(()=>{
        //             document.getElementById(`slider-img-${x}`).classList.toggle("-translate-x-full")
        //         }, 4000)
        //     }
        // }, options?.interval || 3000)
}