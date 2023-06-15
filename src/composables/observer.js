let root = document.getElementById("root");


let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry);
        if(entry.isIntersecting){
            document.getElementById("MyNav").classList.add('show')
        }else{
            document.getElementById("MyNav").classList.remove('show')
        }
})
}, 
{
    rootMargin: "0px 0px",
    threshold: .0,
    root: document.getElementById("MyNav")
}
);


export { observer }