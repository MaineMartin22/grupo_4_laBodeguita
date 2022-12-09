document.querySelectorAll('.modal-container img').forEach(el=>{
    el.addEventListener('click', function(ev){
        ev.stopPropagation();
        this.parentNode.classList.add('activeImg')
    })
})

document.querySelectorAll('.modal-container').forEach(el=>{
    el.addEventListener('click', function(ev){
        this.classList.remove('activeImg')
    })
})