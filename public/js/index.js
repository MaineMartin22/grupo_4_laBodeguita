//FORMULARIO LOGIN
            // Agarramos el formulario por su id, y lo guardamos dentro de la variable formulario
            const formularioLogin = document.getElementById('formularioLogin');
            // Agregamos un escucha de eventos al formulario, que ejecute una función cuando el evento sea ejecutado
            formularioLogin.addEventListener('submit', function(e){
                e.preventDefault();

                console.log(formularioLogin.nombre.value)

                if(formularioLogin.nombre.value.length < 2){
                    alert('No se ingresó un nombre válido!')
                }
                if(formularioLogin.contraseña.value.length < 2){
                    alert('No se ingresó una contraseña válida!')
                }
            });