let root = document.getElementById("root");


let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            document.getElementById("MyNav").classList.toggle('show')
        }else{
            document.getElementById("MyNav").classList.toggle('show')
        }
})
}, 
{
    rootMargin: "10px 0px",
    threshold: 0.1
}
);


export { observer }