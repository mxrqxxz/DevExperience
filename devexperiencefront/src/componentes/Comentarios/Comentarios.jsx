import React, {useState, useEffect, useContext} from "react";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import Comentario from "../Comentario/Comentario";

function Comentarios(props) {

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.modoColor);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.modoColor;
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.modoColor]);

    const numeroComentarios = props.comentarios.length;
    function mostrarComentario(comentario) {
        return <Comentario key={comentario.id} comentario={comentario} modoColor={modoColor} />;
    }

    return (
        <>
            <h2 style={{ color: colores[modoColor].Texto.principal }}>{numeroComentarios} Comentarios</h2>
            <div>
                {props.comentarios.map(mostrarComentario)}
            </div>
        </>
    );
}

export default Comentarios;