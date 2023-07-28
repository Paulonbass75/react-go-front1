const options = {
    intervalSpeed: Number,
    imgPerSlide: Number,
    pauseOnHover: Boolean
}

export const slideshow = (id, options) => {
    const element = document.getElementById(id);
    const elements = Array.from(document.getElementById(id).children);
    element.innerHTML = ""
    element.classList.add("flex", "overflow-x-hidden", "relative")
    let i = 1;
    elements.forEach(item => {
        let div = document.createElement("div");
        let image = document.createElement("img");
        // div.classList.add("w-full");
        image.classList.add("h-full", "w-full", "object-cover", "aspect-[1920]", "absolute", "z-1", "slider-img")
        image.id = `slider-img-${i}`;
        i++;
        image.setAttribute("src", item.src);
        image.setAttribute("alt", "Slideshow image");
        // div.append(image);
        element.append(image);
    })
        document.getElementById(`slider-img-1`).classList.add("showing")
        
    }
    