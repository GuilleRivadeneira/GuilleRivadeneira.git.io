const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg= item.querySelector('.card-img').src;
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}
function addItemCarrito(newItem){

    const inputElemento = tbody.getElementsByClassName('input_elemento')
    for(let i =0; i< carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue= inputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }
   
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML= ''
    carrito.map(item => {
        const tr= document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
        <td class="table_productos">
            <img src=${item.img} alt="">
            <h6 class=${item.title}></h6>
        </td>
        <td class="table_precio"><p>${item.precio}</p></td>
        <td class="table_cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input_elemento">
            <button class="delete btn btn-danget">x</button>
        </td>
        `

        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener("click", removeItemCarrito)
        tr.querySelector(".input_elemento").addEventListener('change', sumaCantidad)
    })
   
}

function CarritoTotal(){
    let total =0;
    const itemcardTotal = document.querySelector('.itemCardTotal')
    carrito.forEach((item)=>{
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })

    itemcardTotal.innerHTML =`Total $${total}`
    
}

function removeItemCarrito (e){
    const buttonDelete= e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title= tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.lenght ; i++){
        if(carrito[i].title.trim()=== title.trim()){
            carrito.splice(i,1)
        }
    }
    tr.remove()
    CarritoTotal()
}

function sumaCantidad (e){
    const sumaInput= e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim()=== title){
            sumaInput.value < 1? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
  
}

