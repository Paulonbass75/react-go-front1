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
        image.classList.add("h-full", "w-full", "object-cover", "aspect-[1920]", "absolute", "z-1", "slider-img")
        image.id = `slider-img-${i}`;
        i++;
        image.setAttribute("src", item.src);
        image.setAttribute("alt", "Slideshow image");
        // div.append(image);
        element.append(image);
    })
        document.getElementById(`slider-img-1`).classList.add("showing")
        let nextNum = 1;
        setInterval(() => {
            document.getElementById(`slider-img-${nextNum}`).classList.remove("showing")
            document.getElementById(`slider-img-${nextNum}`).classList.add("transitioning-out")
            nextNum+=1
            let prevNum = nextNum - 1
            setTimeout(() => {
                document.getElementById(`slider-img-${prevNum != 1 ? prevNum : 1}`).classList.remove("transitioning-out")
            }, 1000)
            console.log( nextNum > elements.length);
            if(nextNum > elements.length) nextNum = 1;
            document.getElementById(`slider-img-${nextNum}`).classList.add("transitioning-in")
            setTimeout(() => {
                document.getElementById(`slider-img-${nextNum}`).classList.remove("transitioning-in")
            }, 1000)
            document.getElementById(`slider-img-${nextNum}`).classList.add("showing")
        }, 3000 || options.seconds)
}