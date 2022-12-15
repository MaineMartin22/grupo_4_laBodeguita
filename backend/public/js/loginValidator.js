window.addEventListener("load", function () {
    console.log('Archivo vinculado - login')

    let email = document.getElementById('email')
    let password = document.getElementById('password')

    const validatePassword = (e) => {
        const field = e.target
        const valueName = e.target.value

        if (valueName.length < 1) {
            field.nextElementSibling.classList.add('error');
            field.nextElementSibling.innerText = "Este campo es obligatorio"
        } else {
            field.nextElementSibling.classList.remove('error');
        }
    }

    password.addEventListener('blur', validatePassword)

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

})