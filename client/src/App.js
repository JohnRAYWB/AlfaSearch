import {useState} from "react";
import OwnEntities from "./components/ownEntities";
import OuterEntities from "./components/outerEntities";

function App() {
    const [entities, setEntities] = useState([])
    const [value, setValue] = useState('')
    const [hideOwnEntities, setHideOwnEntities] = useState(false)
    const [showOuterEntities, setShowOuterEntities] = useState(false)

    const acceptSearchEgrul = () => {
        setShowOuterEntities(prevState => !prevState)
    }

    return (
        <div>
            {value.length === 0 ?
                <p>Введите запрос</p>
                :
                <>
                    {entities.count > 0 ?
                        <div>
                            <div>
                                <p>По вашему запросу найдето {entities.count} записей</p>
                                {hideOwnEntities ?
                                    <button onClick={() => setHideOwnEntities(false)}>Открыть результ поиска</button>
                                    :
                                    <button onClick={() => setHideOwnEntities(true)}>Скрыть результ поиска</button>
                                }
                            </div>
                        </div>
                        :
                        null
                    }
                </>
            }
            <input onChange={e => setValue(e.target.value)}/>
            <OwnEntities
                entities={entities}
                setEntities={setEntities}
                value={value}
                hideOwnEntities={hideOwnEntities}
            />
            {value.length !== 0 ?
                <>
                    {!showOuterEntities ?
                        <button onClick={acceptSearchEgrul}>Не нашли то что искали? Начать поиск в ЕГРЮЛ/ЕГРИП?</button>
                        :
                        <button onClick={acceptSearchEgrul}>Закончить поиск в ЕГРЮЛ/ЕГРИП?</button>
                    }
                </>
                :
                null
            }
            {showOuterEntities && value.length !== 0 ?
                <OuterEntities value={value} showOuterEntities={showOuterEntities}/>
                :
                null
            }
        </div>
    );
}

export default App;
