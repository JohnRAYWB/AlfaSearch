import React, {useEffect, useState} from 'react';
import {getEntitiesFromDB} from "./api";

const OwnEntities = ({entities, setEntities, value, hideOwnEntities}) => {

    const [page, setPage] = useState(0)

    useEffect(() => {
        getEntitiesFromDB(value, page).then(entities => setEntities(entities))
    }, [value, page])

    const pageCount = Math.ceil(entities.count / 20)
    const pages = []

    for (let i = 0; i < pageCount; ++i) {
        pages.push(i)
    }

    const nextPage = () => setPage(prev => prev === pages[pages.length - 1] ? prev : prev + 1)
    const prevPage = () => setPage(prev => prev !== 0 ? prev - 1 : 0)

    return (
        <div hidden={hideOwnEntities}>
            {entities.count && entities.count > 0 ?
                <div>
                    <button onClick={prevPage}>Prev</button>
                    <div>
                        {pages && pages.map(page =>
                            <button key={page} onClick={() => setPage(page)}>{page + 1}</button>
                        )}
                    </div>
                    <button onClick={nextPage}>Next</button>
                </div>
                :
                null
            }
            {entities.candidates && entities.candidates.map((entity, index) =>
                <div key={entity.id}>
                    <p>{index + 1}</p>
                    <p>{entity.name}</p>
                    <p>{entity.inn}</p>
                    <p>{entity.dateStart}</p>
                </div>
            )}
            {entities.count && entities.count > 0 ?
                <div>
                    <button onClick={prevPage}>Prev</button>
                    <div>
                        {pages && pages.map(page =>
                            <button key={page} onClick={() => setPage(page)}>{page + 1}</button>
                        )}
                    </div>
                    <button onClick={nextPage}>Next</button>
                </div>
                :
                null
            }
        </div>
    );
};

export default OwnEntities;