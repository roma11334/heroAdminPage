
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect, useState} from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { filtersFetching, filtersFetched, filterShow } from "../../actions";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const {request} = useHttp()
    const {filters, activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(data => console.log(data))
    },[])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтров пока нет</h5>
        }

        return arr.map(({name, label, className}) => {
            const btnClass = classNames('btn', className, {'active': activeFilter === name})
            return(
                <button 
                    key={name}
                    onClick={() => dispatch(filterShow(name))} 
                    className={btnClass}>{label}</button>
            )
        })
    }

    const elements = renderFiltersList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;