// FUNCION PARA VER LOS PRODUCTOS EN EL CARRITO

function prodInCart() {
    if (localStorage.carrito) {
        return JSON.parse(localStorage.carrito).length
    } else{
        return "0"
    }
}

let botonComprar = document.querySelectorAll('.addCart')
let cartNumber = document.querySelector('.cartNumber')
cartNumber.innerText = prodInCart();

botonComprar.forEach((boton)=>{
    // ESCUCHAR EL CLICK EN EL BOTON
    boton.addEventListener('click', (e) =>{
        //TODO LO QUE PONGAMOS EN DATA- ALGO EN EL FRONT, SE PODRA LLAMAR A TRAVES DEL DATASET
        // HAY UN CARRITO EN EL LOCAL STORAGE
        if (localStorage.carrito) {
            // veremos q hacemos si hay carrito
            let carrito = JSON.parse(localStorage.carrito)
            let index = carrito.findIndex((prod) => prod.id == e.target.dataset.id)
            if (index != -1) {
                carrito[index].quantity ++
            } else{
                carrito.push({id:e.target.dataset.id,quantity: 1})
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
            // si mi producto esta en el carrito, le sumo 1
            // si no, lo agrego con push
        } else{
            localStorage.setItem('carrito',JSON.stringify([{id:e.target.dataset.id,quantity: 1}]))
        }
        cartNumber.innerText = prodInCart();
    })
})

console.log(botonComprar );