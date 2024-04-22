import React, {useEffect, useState} from 'react';
import {getOuterEntities} from "./api";

const OuterEntities = ({value, showOuterEntities}) => {
    const [outerEntities, setOuterEntities] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (showOuterEntities) {
            getOuterEntities(value, page).then(response => setOuterEntities([...outerEntities, ...response]))
        } else {
            setOuterEntities([])
        }
    }, [value, page, showOuterEntities])

    return (
        <div>
            {outerEntities && outerEntities.map(entity =>
                <div key={entity.i}>
                    <p>{entity.i}</p>
                    <p>{entity.n}</p>
                </div>
            )}
            <button onClick={() => setPage(page + 1)}>Еще</button>
        </div>
    );
};

export default OuterEntities;