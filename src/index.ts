//Array usuario
type usuario = {
    nombre: string;
    apellido: string;
    correo: string;
    contra: string;
};
let usuarios: usuario[] = [
    { nombre: "Eilyn", apellido: "Florez", correo: "e@gmail.com", contra: "123"}
];

//Array producto
type producto = {
    nombre: string | null;
    precio: number;
}
let productos: producto[] = [
    {nombre: "Hamburguesa clásica", precio: 15000},
    {nombre: "Picada para dos", precio: 45000}
];

//Array venta
type venta = {
    usuario: string;
    productos: string;
    total: number;
};
let ventas: venta[] = [];

//Función de campo vacio en el prompt
function campoVacio() {
    return "Por favor, ingrese un valor. El campo no puede quedar vacío";
}

//Entrada de datos para el inicio de sesión
let entEmail: string = "";
do {
    entEmail = prompt("Inicio de sesión \nIngrese su correo.") || "";
    if(entEmail === "") {
        alert(campoVacio())
    }
} while(entEmail === "");

let entContra: string = "";
do {
    entContra = prompt("Inicio de sesión \nIngrese su contraseña") || "";
    if(entContra === "") {
        alert(campoVacio())
    }
}while(entContra === "");

//Variable para identificar inicio de sesión
let inicioSesion: boolean = false;
let nombreU: string = "";

for(let u of usuarios) {
    if(entEmail === u.correo && entContra === u.contra) {
        inicioSesion = true;
        nombreU = `${u.nombre} ${u.apellido}`;
        break;
    }
}

//Si no se encuentra el usuario
if(!inicioSesion) {
    alert("El usuario que ingreso no existe.");
}

//Si hay inicio de sesión
if(inicioSesion) {
    let opcion: number = 0;
    alert(`Bienvenid@ ${nombreU}`);
    do { //Se repite mientras opción sea diferente de 12
        //Lista de productos
        function generarListProduct() {
            let listProduct: string = "";
            if (productos.length > 0) {
                for(let i: number = 0; i < productos.length; i++) {
                    listProduct += `${i + 1}. ${productos[i].nombre} $${productos[i].precio} \n`;
                }
            } else {
                listProduct = "No hay productos registrados";
            }
            return listProduct;
        }

        //Lista de ventas
        function generarListVentas() {
            let histVen: string = "";
            if(ventas.length > 0) {
                for(let i: number = 0; i < ventas.length; i++) {
                    histVen += `Número de la venta: ${i + 1} \nUsuario: ${ventas[i].usuario} \nProductos: ${ventas[i].productos} \nTotal: ${ventas[i].total} \n`;
                }
            } else {
                histVen = "No hay ventas en el historial";
            }
            return histVen;
        }

        //Lista de usuarios
        function generarListUsuarios() {
            let listUsuarios: string = "";
            if(usuarios.length > 0) {
                for(let i: number = 0; i < usuarios.length; i++) {
                    listUsuarios += `${i + 1}. ${usuarios[i].nombre} ${usuarios[i].apellido} \nCorreo: ${usuarios[i].correo} \n`;
                }
            } else {
                listUsuarios = "No hay usuarios registrados";
            }
            return listUsuarios;
        }

        function valorInvalido() {
            return "El valor que ingreso no existe en la base de datos. Por favor, ingrese valores válidos. 😊🫡";
        }

        function registroAlert(a: string) {
            return `Registro ${a} correctamente`;
        }
        //Menú
        if(opcion === 0) {
            let op = prompt("Sistema de ventas. \nMenú: \n1. Realizar Venta. \n2. Historial Venta \n3. Eliminar Ventas. \n4. Crear Productos. \n5. Consultar Productos \n6. Editar Productos \n7. Eliminar Productos \n8. Crear Usuarios. \n9. Consultar Usuarios \n10. Editar usuarios \n11. Eliminar Usuarios \n12. Cerrar sesión \nIngrese el número de la opción.");
            opcion = Number(op);

            if(opcion < 1 || opcion > 12) {
                alert("El número de la opción es inválido.");
            }
        }

        //Realizar venta
        if(opcion === 1) {
            let numPro;
            let venta: string = "";
            let suma: number = 0;
            let cont: boolean = false;

            do {
                numPro = prompt("Realizar venta \nProductos (Ingrese el número del producto): \n'X' para salir \n" + generarListProduct());
                let n = Number(numPro);
                let nP = n - 1;
                if(nP >= 0 && nP < productos.length && numPro?.toLocaleLowerCase() !== "x") {
                    venta += `${productos[nP].nombre} $${productos[nP].precio} \n`;
                    suma += productos[nP].precio;
                    cont = true;
                } else if(n < 1 || n > productos.length) {
                    alert(valorInvalido());
                }
            } while (numPro?.toLocaleLowerCase() !== "x");

            if(cont) {
                ventas.push(
                    {usuario: nombreU, productos: venta, total: suma}
                );

                alert(`Venta realizada con éxito. \nUsuario: ${nombreU} \nProductos:\n ${venta} \nTotal: ${suma}`);
            } else {
                alert("No se realizo ninguna venta.");
            }

            opcion = 0;
        }

        //Historial venta
        if(opcion === 2) {
            alert("Historial de ventas: \n" + generarListVentas());
            opcion = 0;
        }

        //Eliminar venta
        if(opcion === 3) {
            let numVenta;
            do {
                numVenta = prompt("Eliminar Venta \nIngrese el número de la venta. 'X' para salir. \n" + generarListVentas());
                let n = Number(numVenta);
                let nV = n - 1;

                if(nV >= 0 && nV < ventas.length && numVenta?.toLocaleLowerCase() !== "x") {
                    ventas.splice(nV, 1);
                    alert( registroAlert("eliminado"));
                } else if(n < 1 || n > ventas.length) {
                    alert(valorInvalido());
                }
            } while(numVenta?.toLocaleLowerCase() !== "x");

            opcion = 0;
        }

        //Crear Producto
        if(opcion === 4) {
            let cantPro = Number(prompt("Crear Productos \n¿Cuántos productos desea agregar?") || "0");
            if(cantPro > 0) {
                for(let i: number = 1; i <= cantPro; i++) {
                    let nom: string = "";
                    do {
                        nom = prompt(`Ingrese el nombre del producto. ${i}/${cantPro}`) || "";
                        if (nom === "") {
                            alert(campoVacio());
                        }
                    } while (nom === "");
                    
                    let prec: number = 0;
                    do {
                        prec = Number(prompt(`Ingrese el precio del producto. ${i}/${cantPro}`));
                        if(prec < 0) {
                            alert("Por favor, ingrese números positivos.");
                        } else if (prec === 0) {
                            alert(campoVacio());
                        }
                    } while(prec <= 0);
                    
                    productos.push(
                        { nombre: nom, precio: prec}
                    );
                }
                alert("Se agregaron los productos correctamente.");
            } else {
                alert("No ingreso ningún producto.");
            }
            opcion = 0;
        }

        //Consultar producto
        if(opcion === 5) {
            alert("Productos registrados: \n" + generarListProduct());
            opcion = 0;
        }

        //Editar producto
        if(opcion === 6) {
            let numPro;
            do {
                numPro = prompt("Editar producto. 'X' para salir. \nIngrese el número del producto.\n" + generarListProduct());
                let n = Number(numPro);
                let nuP = n - 1;

                if (nuP >= 0 && nuP < productos.length && numPro?.toLocaleLowerCase() !== "x") {
                    let opcP = Number(prompt("Ingrese el número según la opción que desea. \n1. Editar solo el nombre. \n2. Editar solo el precio. \n3. Editar ambos, nombre y precio."));
                    let nomP: string = "";
                    let precP: number = 0;

                    switch (opcP) {
                        case 1:
                            do {
                                nomP = prompt("Ingrese el nuevo nombre del producto.") || "";
                                if(nomP === "") {
                                    alert(campoVacio());
                                }
                            } while(nomP === "");
                            productos[nuP].nombre = nomP;
                            alert( registroAlert("editado"));
                            break;
                        case 2:
                            do {
                                precP = Number(prompt("Ingrese el nuevo precio del producto."));
                                if (precP <= 0) {
                                    alert("Por favor, ingrese números mayores a 0.");
                                } else if(precP === 0){
                                    alert(campoVacio());
                                }
                            } while (precP <= 0);
                            productos[nuP].precio = precP;
                            alert( registroAlert("editado"));
                            break;
                        case 3:
                            do {
                                nomP = prompt("Ingrese el nuevo nombre del producto.") || "";
                                if(nomP === "") {
                                    alert(campoVacio());
                                }
                            } while(nomP === "");
                            do {
                                precP = Number(prompt("Ingrese el nuevo precio del producto."));
                                if (precP < 0) {
                                    alert("Por favor, ingrese números positivos.");
                                } else if(precP === 0){
                                   alert(campoVacio());
                                }
                            } while (precP === 0 && precP < 0);

                            productos[nuP].precio = precP;
                            productos[nuP].nombre = nomP;

                            alert(registroAlert("editado"));
                            break;
                        default:
                            alert("La opción ingresada no existe.");
                            break;
                    }
                } else if(nuP < 1 || nuP > productos.length) {
                    alert(valorInvalido());
                }
            } while (numPro?.toLocaleLowerCase() !== "x");
            opcion = 0;
        }

        //Eliminar productos
        if(opcion === 7) {
            let numP;
            do {
                numP = prompt("Eliminar Producto \nIngrese el número del producto. 'X' para salir. \n" + generarListProduct());
                let n = Number(numP);
                let nPr = n - 1;

                if(nPr >= 0 && nPr < productos.length && numP?.toLocaleLowerCase() !== "x") {
                    productos.splice(nPr, 1);
                    alert( registroAlert("eliminado"));
                } else if(n < 1 || n > productos.length) {
                    alert(valorInvalido());
                }
            } while(numP?.toLocaleLowerCase() !== "x");

            opcion = 0;
        }

        //Crear usuarios
        if(opcion === 8) {
            let cantUsua = Number(prompt("Crear Usuarios. \n¿Cuántos usuarios desea crear? ") || "0");
            if(cantUsua > 0) {
                for(let i: number = 1; i <= cantUsua; i++) {
                    let nomU: string = "";
                    do {
                        nomU = prompt(`Ingrese el nombre del Usuario. ${i}/${cantUsua}`) || "";
                        if (nomU === "") {
                            alert(campoVacio());
                        }
                    } while(nomU === "");

                    let apeU: string = "";
                    do {
                        apeU = prompt(`Ingrese el apellido del Usuario. ${i}/${cantUsua}`) || "";
                        if (apeU === "") {
                            alert(campoVacio());
                        }
                    } while(apeU === "");

                    let correoU: string = "";
                    do {
                        correoU = prompt(`Ingrese el correo del Usuario. ${i}/${cantUsua}`) || "";
                        if (correoU === "") {
                            alert(campoVacio());
                        }
                    } while(correoU === "");

                    let contrU: string = "";
                    do {
                        contrU = prompt(`Ingrese la contraseña del Usuario. ${i}/${cantUsua}`) || "";
                        if (contrU === "") {
                            alert(campoVacio());
                        }
                    } while(contrU === "");
                    
                    usuarios.push(
                        {nombre: nomU, apellido: apeU, correo: correoU, contra: contrU}
                    );
                }
                alert("Se agregaron los usuarios correctamente.");
            } else {
                alert("No ingreso ningún usuario.");
            }
            opcion = 0;
        }

        //Consultar usuarios
        if (opcion === 9) {
            alert("Usuarios Registrados. \n" + generarListUsuarios());
            opcion = 0;
        }

        //Editar usuario
        if (opcion === 10) {
            let numUsua;
            do {
                numUsua = prompt("Editar Usuarios. 'X' para terminar.\nIngrese el número del usuario que desea editar.\n" + generarListUsuarios());
                let n = Number(numUsua);
                let nUsua = n - 1;

                if (nUsua >= 0 && nUsua < usuarios.length && numUsua?.toLowerCase() !== "x") {
                    let opUsua = Number(prompt("Ingrese el número según la opción que desea. \n1. Editar solo el nombre. \n2. Editar solo el apellido. \n3. Editar solo el correo. \n4. Editar solo la contraseña. \n5. Editar todos, nombre, apellido, correo y contraseña."));

                    let noU: string = "";
                    let apeU: string = "";
                    let coU: string = "";
                    let contU: string = "";

                    switch (opUsua) {
                        case 1:
                            do {
                                noU = prompt("Ingrese el nuevo nombre.") || "";
                                if(noU === "") {
                                    alert(campoVacio());
                                }
                            } while(noU === "");
                            usuarios[nUsua].nombre = noU;
                            alert(registroAlert("editado"));
                            break;
                        case 2:
                            do {
                                apeU = prompt("Ingrese el nuevo apellido.") || "";
                                if(apeU === "") {
                                    alert(campoVacio());
                                }
                            } while(apeU === "");
                            usuarios[nUsua].apellido = apeU;
                            alert(registroAlert("editado"));
                            break;
                        case 3:
                            do {
                                coU = prompt("Ingrese el nuevo correo.") || "";
                                if(coU === "") {
                                    alert(campoVacio());
                                }
                            } while(coU === "");
                            usuarios[nUsua].correo = coU;
                            alert(registroAlert("editado"));
                            break;
                        case 4:
                            do {
                                contU = prompt("Ingrese la nueva contraseña.") || "";
                                if(contU === "") {
                                    alert(campoVacio());
                                }
                            } while(contU === "");
                            usuarios[nUsua].contra = contU;
                            alert(registroAlert("editado"));
                            break;
                        case 5:
                            do {
                                noU = prompt("Ingrese el nuevo nombre.") || "";
                                if(noU === "") {
                                    alert(campoVacio());
                                }
                            } while(noU === "");

                            do {
                                apeU = prompt("Ingrese el nuevo apellido.") || "";
                                if(apeU === "") {
                                    alert(campoVacio());
                                }
                            } while(apeU === "");

                            do {
                                coU = prompt("Ingrese el nuevo correo.") || "";
                                if(coU === "") {
                                    alert(campoVacio());
                                }
                            } while(coU === "");

                            do {
                                contU = prompt("Ingrese la nueva contraseña.") || "";
                                if(contU === "") {
                                    alert(campoVacio());
                                }
                            } while(contU === "");

                            usuarios[nUsua].nombre = noU;
                            usuarios[nUsua].apellido = apeU;
                            usuarios[nUsua].correo = coU;
                            usuarios[nUsua].contra = contU;
                            alert(registroAlert("editado"));
                            break;
                        default:
                            alert("Opción inválida.");
                            break;
                    }
                } else if(nUsua < 1 || nUsua > usuarios.length) {
                    alert(valorInvalido());
                }
            } while(numUsua?.toLowerCase() !== "x");
            opcion = 0;
        }

        //Eliminar Usuario
        if(opcion === 11) {
            let numU;
            do {
                numU = prompt("Eliminar usuarios \nIngrese el número del usuario. 'X' para salir. \n" + generarListUsuarios());
                let n = Number(numU);
                let nU = n - 1;

                if(nU >= 0 && nU < usuarios.length && numU?.toLocaleLowerCase() !== "x") {
                    usuarios.splice(nU, 1);
                    alert(registroAlert("eliminado"));
                } else if(n < 1 || n > usuarios.length) {
                    alert(valorInvalido());
                }
            } while(numU?.toLocaleLowerCase() !== "x");

            opcion = 0;
        }
        //Cerrar Sesión
        if (opcion === 12) {
            alert("Chao con Adiós. 🫡");
        }
    } while(opcion !== 12);
}
