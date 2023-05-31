import {v4 as uuid} from 'uuid'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { heroesAdd, heroesFetching, heroesFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    const [heroName, setHeroName] = useState('')
    const [heroDesc, setHeroDesc] = useState('')
    const [heroElem, setHeroElem] = useState('')

    const addHero = (e) => {
        e.preventDefault()

        const newHero = {
            id: uuid(),
            name: heroName,
            description: heroDesc,
            element: heroElem
        }

        dispatch(heroesFetching());
        
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(dispatch(heroesAdd(newHero)))
            .catch(() => dispatch(heroesFetchingError()))

        setHeroDesc('')
        setHeroElem('')
        setHeroName('')
    }

    return (
        <form onSubmit={(e) => addHero(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={heroName}
                    onChange={e => setHeroName(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={heroDesc}
                    onChange={e => setHeroDesc(e.target.value)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElem}
                    onChange={e => setHeroElem(e.target.value)}>
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;