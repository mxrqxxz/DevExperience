export async function getDatosTotales () {
    fetch('http://devexperience.test/api/v1/datosHome').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Fallo en la respuesta del servidor");
        }
    }).then((data) => {
      console.log(data);  
    });
}