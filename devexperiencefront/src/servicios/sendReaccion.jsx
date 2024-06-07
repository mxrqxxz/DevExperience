export async function sendReaccion (formData,token) {
    try {
        console.log('formData:', formData);
        const response = await fetch('http://devexperience.test/api/v1/createComentarioReaccion', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comentario_id: formData.comentario_id,
                reaccion: formData.reaccion
            })
        });
        const data = await response.json();
        if (response.ok) {
            return { message: 'Reacción enviada con éxito' };
        } else {
            throw new Error(data.message || 'Error al enviar la reacción');
        }
    } catch (error) {
        console.error('Error al enviar la reacción:', error);
        throw error;
    }
}
