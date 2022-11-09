
// INTENTO DE CARRITO DE COMPRAS, FALLO 1 :(


// const clickButton = document.querySelectorAll('.addCar')
// const tbody = document.querySelector('.tbody')
// let carrito = []

// clickButton.forEach(btn => {
//     btn.addEventListener('click', addToCart);
// })

// function addToCart(e) {
//     const button = e.target
//     const item = button.closest('.vin-prod')
//     const itemTitle = item.querySelector('.vin-title').textContent;
//     const itemPrice = item.querySelector('.price').textContent;
//     const itemImg = item.querySelector('.vin-img-jpg').src;
    

//     const newCart = {
//         title: itemTitle,
//         price: itemPrice,
//         image: itemImg,
//         cant: 1
//     }

//     addItemCarrito(newCart)
// }

// function addItemCarrito(newCart) {

//     carrito.push(newCart)
//     renderCarrito()
// }
// function renderCarrito(){
//     tbody.innerHTML = ''
//     carrito.map(item => {
//       const tr = document.createElement('tr')
//       tr.classList.add('ItemCarrito')
//       const Content = `
      
//       <th scope="row">1</th>
//               <td class="table__productos">
//                 <img src=${item.img}  alt="">
//                 <h6 class="title">${item.title}</h6>
//               </td>
//               <td class="table__price"><p>${item.price}</p></td>
//               <td class="table__cantidad">
//                 <input type="number" min="1" value=${item.cant} class="input__elemento">
//                 <button class="delete btn btn-danger">x</button>
//               </td>
      
//       `
//       tr.innerHTML = Content;
//       tbody.append(tr)
  
//       tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
//       tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
//     })
//     CarritoTotal()
//   }


