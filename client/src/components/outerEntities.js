import React, {useEffect, useState} from 'react';
import {getOuterEntities} from "./api";

import styles from "./styles/entity.module.css"

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
        <div className={styles.outerEntityContainer}>
            {outerEntities && outerEntities.map(entity =>
                <div className={styles.entityBox} key={entity.i}>
                    <p className={styles.entityTitle}>{entity.n}</p>
                    <div>
                        <p>{entity.rn ? entity.rn : null} ОГРН: {entity.o} Дата присвоения
                            ОГРН: {entity.r} ИНН: {entity.i} {entity.g ? entity.g : null} {entity.e ?
                                <p>Дата прекращения деятельности: {entity.e}</p> : null}</p>
                    </div>
                </div>
            )}
            <button className={styles.moreButton} onClick={() => setPage(page + 1)}>Еще</button>
        </div>
    );
};

export default OuterEntities;