export async function sendInvitaciones (NRES,token) {
    try {
        const response = await fetch('http://devexperience.test/api/v1/enviarCorreos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({destinatarios: NRES})
        });
        const data = await response.json();
        if (response.ok) {
            return { message: 'Invitaciones enviadas con éxito' };
        } else {
            throw new Error(data.message || 'Error al enviar las invitaciones');
        }
    } catch (error) {
        console.error('Error al enviar al enviar invitaciones:', error);
        throw error;
    }
}
