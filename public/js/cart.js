// function setCarritoVacio() {
//     cart.innerHTML =
// }

function vaciarCarrito() {
    localStorage.removeItem('carrito');
}

function calcularTotal(products) {
    return products.reduce(
        (acum, product) => (acum += product.price * product.quantity),
        0
    );
}
let cartRows = document.querySelector('.cartRows');

let products = [];

if (localStorage.carrito) {
    let carrito = JSON.parse(localStorage.carrito);
    console.log(carrito);
    carrito.forEach((item, index)=>{
        fetch(`/api/product/${item.id}`)
        .then((res) => res.json())
        .then((product) => {
            if (product) {
                
                cartRows.innerHTML += `
                <tr id"row${index}">
                        <th scope="row">${index + 1}</th>
                        <td><a href="/product/${product.id}">${product.name}</a></td>
                        <td>${product.price}</td>
                        <td>${item.quantity}</td>
                        <td>${parseFloat(product.price * item.quantity, 2).toFixed(2)}</td>
                        <td><a href="#" class="deleteCart" onclick="vaciarCarrito(${index})">Eliminar</a></td>
                        </tr>
                        `;
                products.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity
                })
                console.log(products);
            } else {
                carrito.splice(index,1)
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
        }).then(() => {
            document.querySelector('.totalAmount').innerText = `$ ${calcularTotal(products)}`
        });
    });
}