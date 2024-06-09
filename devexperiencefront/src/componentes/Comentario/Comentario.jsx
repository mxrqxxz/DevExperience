import React, { useState, useEffect, useContext } from "react";
import "./Comentario.css";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import likeBlanco from "../../assets/imgs/empresas/likeBlanco.png";
import likeNegro from "../../assets/imgs/empresas/likeNegro.png";
import dislikeBlanco from "../../assets/imgs/empresas/dislikeBlanco.png";
import dislikeNegro from "../../assets/imgs/empresas/dislikeNegro.png";
import likeSeleccionado from "../../assets/imgs/empresas/likeSeleccionadoBlanco.png"
import dislikeSeleccionado from "../../assets/imgs/empresas/dislikeSeleccionadoBlanco.png"
import avatar from '../../assets/imgs/Avatar.svg';
import { sendReaccion } from "../../servicios/sendReaccion.jsx";

function Comentario(props) {
    // User
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.modoColor);

    useEffect(() => {
        setModoColor(props.modoColor);
    }, [props.modoColor]);

    // LÓGICA DE LA FOTO DEL USUARIO QUE HA COMENTADO
    const [urlFoto, setUrlFoto] = useState(avatar);

    useEffect(() => {
        if (props.comentario.avatar && props.comentario.avatar !== "url_example") {
            if (props.comentario.avatar.startsWith("imagenesPerfil/")) {
                setUrlFoto("http://devexperience.test/storage/" + props.comentario.avatar);
            } else {
                setUrlFoto(props.comentario.avatar);
            }
        } else {
            setUrlFoto(avatar);
        }
    }, [props.comentario.avatar]);

    // Lógica de los likes y dislikes
    const [reaccion, setReaccion] = useState(props.comentario.reaccion);
    const [likes, setLikes] = useState(props.comentario.likes);
    const [dislikes, setDislikes] = useState(props.comentario.dislikes);

    useEffect(() => {
        setReaccion(props.comentario.reaccion);
    }, [props.comentario.reaccion]);

    function asignarReaccion(reaccionNueva) {
        if (token) {
            let nuevaReaccion = null;
            if (reaccion === reaccionNueva) {
                nuevaReaccion = null; // Remover reacción si es la misma
            } else {
                nuevaReaccion = reaccionNueva;
            }

            setReaccion(nuevaReaccion);

            // Actualizar contadores de likes y dislikes en el UI
            if (reaccion === "like" && nuevaReaccion !== "like") {
                setLikes(likes - 1);
            } else if (reaccion !== "like" && nuevaReaccion === "like") {
                setLikes(likes + 1);
            }

            if (reaccion === "dislike" && nuevaReaccion !== "dislike") {
                setDislikes(dislikes - 1);
            } else if (reaccion !== "dislike" && nuevaReaccion === "dislike") {
                setDislikes(dislikes + 1);
            }

            const reaccionPayload = {
                comentario_id: props.comentario.id,
                reaccion: nuevaReaccion
            };

            sendReaccion(reaccionPayload, token)
                .then(response => {
                    console.log("Reacción enviada con éxito:", response);
                })
                .catch(error => {
                    console.error("Error al enviar la reacción:", error);
                });

        } else {
            console.error("Token no disponible");
        }
    }

    return (
        <div className="col-12">
            <div className="comentario">
                <div>
                    <img src={urlFoto} className="fotoComentario" alt="Foto de perfil del usuario" />
                </div>
                <div>
                    <p className="azulClaro">{props.comentario.usuario}</p>
                    <p style={{ color: colores[modoColor].Texto.principal }}>{props.comentario.contenido}</p>
                    <div className="containerLikes">
                        <button className="sinFondo" onClick={() => asignarReaccion("like")}>
                            <img src={modoColor === "Dark" ? (reaccion === "like" ? likeBlanco : likeNegro) : (reaccion === "like" ? likeSeleccionado : likeNegro)} alt="Foto me gusta" />
                        </button>
                        <p style={{ color: colores[modoColor].Texto.principal }}>{likes}</p>
                        <button className="sinFondo" onClick={() => asignarReaccion("dislike")}>
                            <img src={modoColor === "Dark" ? (reaccion === "dislike" ? dislikeBlanco : dislikeNegro) : (reaccion === "dislike" ? dislikeSeleccionado : dislikeNegro)} alt="Foto no me gusta" />
                        </button>
                        <p style={{ color: colores[modoColor].Texto.principal }}>{dislikes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentario;
