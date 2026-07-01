import s from "./infoModal.module.css"

export const InfoModal = ({ data, close, onNext, onPrev, hasNext, hasPrev }) => {
    return (
        <div className={s.wrapInfo}>
            
            {/* Botão de fechar */}
            <button className={s.closeBtn} onClick={close}>❌</button>

            {/* Botões de navegação */}
            <div className={s.navButtons}>
                <button 
                    onClick={onPrev} 
                    disabled={!hasPrev}
                    className={s.navBtn}
                >
                    ◀ Prev
                </button>

                <button 
                    onClick={onNext} 
                    disabled={!hasNext}
                    className={s.navBtn}
                >
                    Next ▶
                </button>
            </div>

            <div className={s.wrapIndoData}>
                <img src={data.image} alt={data.name} />
                <h4><strong>Name: </strong>{data.name}</h4>
                <p><strong>Status: </strong>{data.status}</p>
                <p><strong>Origin: </strong>{data.origin.name}</p>
                <p><strong>Species: </strong>{data.species}</p>
                <p><strong>Gender: </strong>{data.gender}</p>
                <p><strong>Location: </strong>{data.location.name}</p>
                <p>
                    <strong>Created: </strong>
                    {new Date(data.created).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </p>
            </div>
        </div>
    )
}

