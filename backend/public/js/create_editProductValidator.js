window.addEventListener("load", function () {
    console.log('Archivo vinculado - create / edit product')

    let name = document.getElementById('name')
    let precio = document.getElementById('precio')
    let descuento = document.getElementById('descuento')
    let alcohol = document.getElementById('alcohol')
    let description = document.getElementById('description')
    let imagen = document.getElementById('imagen')
    let button = document.getElementById('submit')


    const validateEmptyField = (e) => {

        const field = e.target

        const valueName = e.target.value

        if (valueName.length < 1) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio"
        } else {
            field.nextElementSibling.classList.remove('error');
            field.nextElementSibling.innerText = '';
        }
    }

    name.addEventListener('blur', function(e){
        const field = e.target

        const valueName = e.target.value

        if (valueName.length < 5) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio y como mínimo deberá tener 5 caracteres"
        } else {
            field.nextElementSibling.classList.remove('error')
            field.nextElementSibling.innerText = '';
        }
    })

    precio.addEventListener('blur', validateEmptyField)

    descuento.addEventListener('blur', validateEmptyField)

    alcohol.addEventListener('blur', validateEmptyField)

    description.addEventListener('blur', function(e){
        const field = e.target

        const valueName = e.target.value

        if (valueName.length < 20) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio y como mínimo deberá tener 20 caracteres"
        } else {
            field.nextElementSibling.classList.remove('error');
            
        }
    })


    imagen.addEventListener('change', function (e) {
        //console.log(e)
        //console.log(e.target.files[0])
        const field = e.target

        const fileExt = e.target.files[0].name.split('.').pop().toLowerCase();
        const extAccept = ['jpg', 'jpeg', 'png', 'gif']

        if (!extAccept.includes(fileExt)) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = `Este campo acepta formatos ${extAccept.join(', ')}`
        } else {
            field.nextElementSibling.classList.remove('error')
            field.nextElementSibling.innerText = '';
        }

        if (imagen.value < 1) {
            alert('subi un avatar')
        }
    })

    button.addEventListener('click', function (e) {
        if (name.value < 5) {
            e.preventDefault(); 
        }

        if (description.value < 20) {
            e.preventDefault(); 
        }
        if (precio.value < 1) {
            e.preventDefault(); 
        }
        if (descuento.value < 1) {
            e.preventDefault(); 
        }
        if (alcohol.value < 1) {
            e.preventDefault(); 
        }

        if (imagen.value < 1) {
            e.preventDefault(); 
            sweetAlert('Debes subir un avatar');
        }
    })

})