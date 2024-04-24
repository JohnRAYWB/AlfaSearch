import React, {useEffect, useState} from 'react';
import {getEntitiesFromDB, putUpdateEntity} from "./api";

import styles from "./styles/entity.module.css"
import {usePagination} from "./usePagination";

const OwnEntities = ({entities, setEntities, value, hideOwnEntities}) => {

    const [activePage, setActivePage] = useState(0)
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        getEntitiesFromDB(value, activePage, filter).then(entities => setEntities(entities))
    }, [value, activePage, filter])

    useEffect(() => {
        setActivePage(0)
    }, [filter])

    useEffect(() => {
        if (value.length === 0) {
            setActivePage(0)
        }
    }, [value])

    const pageCount = Math.ceil(entities.count / 20)
    const pages = []

    usePagination(pages, pageCount, activePage)

    const nextPage = () => setActivePage(prev => prev === pageCount - 1 ? prev : prev + 1)
    const prevPage = () => setActivePage(prev => prev !== 0 ? prev - 1 : 0)

    return (
        <div className={styles.main} style={hideOwnEntities ? {display: 'none'} : null}>
            <div className={styles.filterContainer} style={value.length === 0 ? {display: 'none'} : null}>
                <p>Фильтровать: </p>
                <div className={styles.checkboxContainer}>
                    <p className={styles.checkboxTitle}>Дата прекращения деятельности</p>
                    <div className={filter ? styles.checkboxAccepted : styles.checkbox}>
                        <input type={'checkbox'} onClick={() => setFilter(prev => !prev)}/>
                    </div>
                </div>
            </div>
            {entities.count && entities.count > 0 ?
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={prevPage}>Назад</button>
                    <div className={styles.numButtonContainer}>
                        {pages && pages.map(page =>
                            <button className={activePage === page ? styles.activeButton : styles.button} key={page}
                                    onClick={() => setActivePage(page)}>{page + 1}</button>
                        )}
                    </div>
                    <button className={styles.button} onClick={nextPage}>Вперед</button>
                </div>
                :
                null
            }
            {entities.candidates && entities.candidates.map((entity, index) =>
                <div className={styles.entityContainer} key={entity._id}>
                    <p className={styles.entityIndex}>{index + 1 + (activePage * 20)}</p>
                    <div className={styles.entityBox}>
                        <p className={styles.entityTitle}>{entity.name}</p>
                        <div>
                            <p>{entity.region ? entity.region : null} ОГРН: {entity.OGRN} Дата присвоения
                                ОГРН: {new Date(entity.dateStart).toLocaleDateString()} ИНН: {entity.inn} {entity.gPerson ? entity.gPerson : null} {entity.dateEnd ?
                                    <p>Дата прекращения
                                        деятельности: {new Date(entity.dateEnd).toLocaleDateString()}</p> : null}</p>
                        </div>
                    </div>
                    <button className={styles.button} onClick={() => putUpdateEntity(entity._id)}>Update</button>
                </div>
            )}
            {entities.count && entities.count > 0 ?
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={prevPage}>Назад</button>
                    <div className={styles.numButtonContainer}>
                        {pages && pages.map(page =>
                            <button className={activePage === page ? styles.activeButton : styles.button} key={page}
                                    onClick={() => setActivePage(page)}>{page + 1}</button>
                        )}
                    </div>
                    <button className={styles.button} onClick={nextPage}>Вперед</button>
                </div>
                :
                null
            }
        </div>
    );
};

export default OwnEntities;