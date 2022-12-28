window.addEventListener("load", function () {
    console.log('Archivo vinculado - register')

    // VALIDACIONES REGISTER

    let button = document.getElementById('boton')
    let name = document.getElementById('nombre')
    let surname = document.getElementById('apellido')
    let direccion = document.getElementById('direccion')
    let email = document.getElementById('email')
    let password = document.getElementById('pass')
    let repassword = document.getElementById('pass2')
    let avatar = document.getElementById('avatar')
    let checkbox = document.getElementById('mayor-edad')


    //console.log(name, surname, direccion, email, password, repassword)

    //Esta función valida si el campo esta vacío o es menor a 2 caracteres
    const validateEmptyField = (e) => {

        const field = e.target

        const valueName = e.target.value

        //si el valor del input está vacío, se le agrega una clase de error y el texto debajo del error
        if (valueName.length < 2) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio y como mínimo deberá tener 2 caracteres"
        } else {
            field.nextElementSibling.classList.remove('error');
        }
    }


    const validatePassword = (e) => {
        const field = e.target
        const valueName = e.target.value

        if (valueName.length < 8) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio y como mínimo deberá tener 8 caracteres"
        } else {
            field.nextElementSibling.classList.remove('error');
        }
    }

    name.addEventListener('blur', validateEmptyField)

    surname.addEventListener('blur', validateEmptyField)

    direccion.addEventListener('blur', validateEmptyField)

    password.addEventListener('blur', validatePassword)

    repassword.addEventListener('blur', validatePassword)


    email.addEventListener('blur', function (e) {

        const field = e.target
        const valueName = e.target.value

        if (valueName.length < 1) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio"
        } else {
            field.nextElementSibling.classList.remove('error');
        }

        let expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        let isValid = expReg.test(email.value)

        if (isValid == false) {
            sweetAlert('Ingrese un email válido')
        }
    })

    avatar.addEventListener('change', function (e) {
        //console.log(e)
        //console.log(e.target.files[0])
        const field = e.target

        const fileExt = e.target.files[0].name.split('.').pop().toLowerCase();
        const extAccept = ['jpg', 'jpeg', 'png', 'gif']

        if (!extAccept.includes(fileExt)) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = `Este campo acepta formatos ${extAccept.join(', ')}`
        } else {
            field.nextElementSibling.classList.remove('error');
        }

        
    })

    button.addEventListener('click', function (e) {
        if (!checkbox.checked) {
            e.preventDefault();
            sweetAlert('Debes ser mayor de edad');
        }

        if (avatar.value < 1) {
            e.preventDefault(); 
            sweetAlert('Debes subir un avatar');
        }
    })

})