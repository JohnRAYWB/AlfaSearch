import {useState} from "react";
import OwnEntities from "./components/ownEntities";

function App() {
    const [entities, setEntities] = useState([])
    const [value, setValue] = useState('')
    const [hideOwnEntities, setHideOwnEntities] = useState(false)

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
        </div>
    );
}

export default App;
