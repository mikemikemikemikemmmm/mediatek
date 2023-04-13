import { useState } from "react";
import { SearchInputs, SearchKey } from "../type";
export const SearchForm = (props: { handleSubmitSearch: (data: SearchInputs) => void, handleClearSearch: () => void }) => {
    const { handleClearSearch, handleSubmitSearch } = props
    const [searchInputs, setSearchInputs] = useState<SearchInputs>({
        column: 'mission_name',
        value: '',
        start: '',
        end: '',
        isSearchByDate: false
    })
    const handleClickClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        handleClearSearch()
    }
    const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const copy = { ...searchInputs }
        handleSubmitSearch(copy)
    }

    const handleChangeSearchSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setSearchInputs({ ...searchInputs, column: value as SearchKey })
    }
    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchInputs({ ...searchInputs, value })
    }
    const handleChangeSearchDate
        = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
            const { value } = e.target
            setSearchInputs({ ...searchInputs, [type]: value })
        }
    const handleChangeIsSearchByDate = () => {
        setSearchInputs({ ...searchInputs, isSearchByDate: !searchInputs.isSearchByDate })
    }
    return (

        <form className='searchForm'>
            <h1 className="searchForm-banner">Search</h1>
            <div className="searchForm-column">
                <select className="searchForm-column-selectInput" value={searchInputs.column} onChange={e => handleChangeSearchSelection(e)}>
                    <option value="mission_name">
                        mission name
                    </option>
                    <option value="rocket_name">
                        rocket name
                    </option>
                    <option value="rocket_type">
                        rocket type
                    </option>
                </select>
                <input placeholder="search by column" className="searchForm-column-textInput" type="text" value={searchInputs.value} onChange={e => handleChangeSearchText(e)} />
            </div>
            <div className="searchForm-date">
                <label htmlFor="searchForm-date-checkBoxInput" className="searchForm-date-checkBoxContainer">
                    <input className="searchForm-date-checkBoxInput" id="searchForm-date-checkBoxInput" type="checkbox" checked={searchInputs.isSearchByDate} onChange={() => handleChangeIsSearchByDate()} />
                    <span>search by date?</span>
                </label>
                <div className="searchForm-date-dataInputContainer">
                    <span>start date</span>
                    <input className="searchForm-date-input" type="date" disabled={!searchInputs.isSearchByDate} value={searchInputs.start} onChange={e => handleChangeSearchDate(e, 'start')} />
                </div>
                <div className="searchForm-date-dataInputContainer">
                    <span>end date</span>
                    <input className="searchForm-date-input" type="date" disabled={!searchInputs.isSearchByDate} value={searchInputs.end} onChange={e => handleChangeSearchDate(e, 'end')} />
                </div>
            </div>
            <div className="searchForm-btns" >
                <button className="searchForm-btns-submit" onClick={(e) => handleClickSubmit(e)}>
                    Submit
                </button>
                <button className="searchForm-btns-clear" onClick={(e) => handleClickClear(e)}>
                    Clear Search
                </button>
            </div>
        </form >
    )
}