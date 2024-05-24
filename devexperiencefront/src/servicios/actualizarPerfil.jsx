export async function actualizarPerfil(token, editableDatosPerfil) {
    const formData = new FormData();
    
    formData.append('nombre', editableDatosPerfil.nombre);
    formData.append('apellidos', editableDatosPerfil.apellidos);
    formData.append('sobre_mi', editableDatosPerfil.sobre_mi);
    formData.append('email', editableDatosPerfil.email);

    if (editableDatosPerfil.avatar) {
        formData.append('avatar', editableDatosPerfil.avatar);
        console.log('Avatar file:', editableDatosPerfil.avatar);
    }

    try {
        const response = await fetch('http://devexperience.test/api/v1/editarPerfil?_method=PUT', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
            body: formData
        });


            return "jsonResponse";

    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return false;
    }
}
