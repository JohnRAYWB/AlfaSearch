import {useState} from "react";
import OwnEntities from "./components/ownEntities";
import OuterEntities from "./components/outerEntities";

import styles from "./components/styles/appPage.module.css"

function App() {
    const [entities, setEntities] = useState([])
    const [value, setValue] = useState('')
    const [hideOwnEntities, setHideOwnEntities] = useState(false)
    const [showOuterEntities, setShowOuterEntities] = useState(false)

    const acceptSearchEgrul = () => {
        setShowOuterEntities(prevState => !prevState)
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainElem}>
                <div className={styles.hideSearchContainer}>
                    <p>Введите запрос</p>
                    <input className={styles.input} onChange={e => setValue(e.target.value)}
                           placeholder={'Укажите ИНН или наименование ФИО ИП'}/>
                </div>
                {value.length === 0 ?
                    null
                    :
                    <>
                        {entities.count > 0 ?
                            <div className={styles.hideSearchContainer}>
                                <p>По вашему запросу найдето {entities.count} записей</p>
                                {hideOwnEntities ?
                                    <button className={styles.hideButtonAccept}
                                            onClick={() => setHideOwnEntities(false)}>Открыть результ
                                        поиска с базы данных</button>
                                    :
                                    <button className={styles.hideButtonCancel}
                                            onClick={() => setHideOwnEntities(true)}>Скрыть результ
                                        поиска</button>
                                }
                            </div>
                            :
                            null
                        }
                    </>
                }
            </div>
            <div className={entities.candidates && !hideOwnEntities ? styles.mainElem : null}>
                <OwnEntities
                    entities={entities}
                    setEntities={setEntities}
                    value={value}
                    hideOwnEntities={hideOwnEntities}
                />
            </div>
            {value.length !== 0 ?
                <div className={styles.mainElem}>
                    {!showOuterEntities ?
                        <button className={styles.hideButtonAccept} onClick={acceptSearchEgrul}>Не нашли то что искали?
                            Начать поиск в ЕГРЮЛ/ЕГРИП?</button>
                        :
                        <div>
                            <button className={styles.hideButtonCancel} onClick={acceptSearchEgrul}>Закончить поиск в
                                ЕГРЮЛ/ЕГРИП?
                            </button>
                            {showOuterEntities && value.length !== 0 ?
                                <OuterEntities value={value} showOuterEntities={showOuterEntities}/>
                                :
                                null
                            }
                        </div>
                    }
                </div>
                :
                null
            }

        </div>
    );
}

export default App;
