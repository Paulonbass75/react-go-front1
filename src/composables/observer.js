let root = document.getElementById("root");


let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            document.getElementById("MyNav").classList.add('show')
        }else{
            document.getElementById("MyNav").classList.remove('show')
        }
})
}, 
{
    rootMargin: "10px 0px",
    threshold: 0.1
}
);


export { observer }