import './assets/reset.css'
import './assets/index.scss'
import './assets/loading.css'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { createQuery } from './api/methods';
import { OrderType, RowData, RowDataKey, SearchInputs, SearchStatus, SortStatus, QueryResponse } from './type';
import { SortSign } from './components/SortSign';
import { Table } from './components/Table';
import { Pagination } from './components/Pagination';
import { ROW_NUM_PAGE } from './const';
import { SearchForm } from './components/SearchForm';
import { Loading } from './components/Loading';
function App() {
  const { loading, error, data } = useQuery<QueryResponse>(createQuery());
  const [originData, setOriginData] = useState<RowData[]>([])
  const [filteredData, setFilteredData] = useState<RowData[]>([])
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [sortStatus, setSortStatus] = useState<SortStatus>({
    mission_name: 'none',
    rocket_name: 'none',
    rocket_type: 'none',
    launch_date_local: 'none',
  })
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    {
      column: 'mission_name',
      value: '',
      start: '',
      end: '',
      isSearchByDate: false
    }
  )
  const maxPageNum = Math.ceil((filteredData.length === 0 ? 1 : filteredData.length) / ROW_NUM_PAGE)
  const handleClickPageNum = (num: number) => {
    if (currentPageNum === num) {
      return
    }
    setCurrentPageNum(num)
  }
  const handleClearSearch = () => {
    setSearchStatus(
      {
        column: 'mission_name',
        value: '',
        start: '',
        end: '',
        isSearchByDate: false
      })
  }
  const handleSubmitSearch = (input: SearchInputs) => {
    setSearchStatus({ ...input })
  }
  const handleClickSort = (columnName: RowDataKey) => {
    let nextOrderType: OrderType
    switch (sortStatus[columnName]) {
      case 'none':
        nextOrderType = 'asc'
        break;
      case 'asc':
        nextOrderType = 'desc'
        break;
      case 'desc':
        nextOrderType = 'none'
        break;
    }
    const copy = {
      mission_name: 'none',
      rocket_name: 'none',
      rocket_type: 'none',
      launch_date_local: 'none'
    } as SortStatus
    copy[columnName] = nextOrderType
    setSortStatus({
      ...copy
    })
  }
  const setFilteredDataBySearch = () => {
    let copyedData: RowData[] = [...originData]
    const hasSearchByText = searchStatus.value !== ''

    const startTime = Date.parse(searchStatus.start)
    const endTime = Date.parse(searchStatus.end)
    const hasSearchByDate = searchStatus.isSearchByDate &&
      (searchStatus.start !== '' || searchStatus.end !== '') &&
      (!isNaN(startTime) || !isNaN(endTime))
    if (!hasSearchByDate && !hasSearchByText) {  //no filter
      setFilteredDataBySort(copyedData)
      return
    }
    copyedData = copyedData.filter(row => {
      let textSearchResult = true
      if (hasSearchByText) {
        textSearchResult = row[searchStatus.column].includes(searchStatus.value)
      }

      let dateSearchResult = true
      if (hasSearchByDate) {
        if (!isNaN(startTime) && !isNaN(endTime)) {
          dateSearchResult = startTime <= row.launch_date_local && row.launch_date_local <= endTime
        } else if (!isNaN(startTime)) {
          dateSearchResult = startTime <= row.launch_date_local
        } else if (!isNaN(endTime)) {
          dateSearchResult = row.launch_date_local <= endTime
        }
      }
      return dateSearchResult && textSearchResult
    })

    setFilteredDataBySort(copyedData)
  }
  const setFilteredDataBySort = (copyedData: RowData[]) => {
    const copy = copyedData
    const isAllNoSort = Object.values(sortStatus).every(item => item === 'none')
    if (isAllNoSort) {
      copy.sort((prev, next) => prev.id - next.id)
      setFilteredData(copy)
      return
    }
    const isSortByDate = sortStatus.launch_date_local !== 'none'
    if (isSortByDate) {
      if (sortStatus.launch_date_local === 'asc') {
        copy.sort((prev, next) => {
          return prev.launch_date_local - next.launch_date_local
        })
      } else {
        copy.sort((prev, next) => {
          return next.launch_date_local - prev.launch_date_local
        })
      }
      setFilteredData(copy)
      return
    }
    const target = Object.entries(sortStatus).find(item => item[1] !== 'none')
    if (!target) {
      //TODO
      return
    }
    const column = target[0] as RowDataKey
    const orderType = target[1]
    copy.sort((prev, next) => {
      const prevVal = prev[column] as string
      const nextVal = next[column] as string
      if (orderType === 'asc') {
        return prevVal.localeCompare(nextVal)
      } else {
        return nextVal.localeCompare(prevVal)
      }
    })
    setFilteredData(copy)
  }
  useEffect(() => {
    if (!error && data && Array.isArray(data?.launches)) {
      let counter = 0
      const _data = data.launches.map(item => {
        counter += 1
        return {
          id: counter,
          mission_name: item.mission_name,
          rocket_name: item.rocket.rocket_name,
          rocket_type: item.rocket.rocket_type,
          launch_date_local: Date.parse(item.launch_date_local)
        }
      }) as RowData[]
      setFilteredData(_data)
      setOriginData(_data)
    }
  }, [data])
  useEffect(() => {
    setFilteredDataBySearch()
    setCurrentPageNum(1)
  }, [searchStatus])
  useEffect(() => {
    setFilteredDataBySort([...filteredData])
  }, [sortStatus])
  return (
    <div className="App">
      <Loading isLoading={loading} />
      <SearchForm handleClearSearch={handleClearSearch} handleSubmitSearch={handleSubmitSearch} />
      <div className='dividingLine' />
      <section className='tableContainer'>
        <div className="row">
          <span className='row-sortBtnContainer row-col'>
            <button className='row-sortBtn' onClick={() => handleClickSort('mission_name')}>
              <span>Mission Name</span>
              <SortSign value={sortStatus['mission_name']} />
            </button>
          </span>
          <span className='row-sortBtnContainer row-col'>
            <button className='row-sortBtn' onClick={() => handleClickSort('rocket_name')}>
              <span> Rocket Name</span>
              <SortSign value={sortStatus['rocket_name']} />
            </button>
          </span>
          <span className='row-sortBtnContainer row-col'>
            <button className='row-sortBtn' onClick={() => handleClickSort('rocket_type')}>
              <span>Rocket Type</span>
              <SortSign value={sortStatus['rocket_type']} />
            </button>
          </span>
          <span className='row-sortBtnContainer row-col'>
            <button className='row-sortBtn' onClick={() => handleClickSort('launch_date_local')}>
              Launch Date
              <SortSign value={sortStatus['launch_date_local']} />
            </button>
          </span>
        </div>
        <Table rowDatas={filteredData} currentPageNum={currentPageNum} />
        <Pagination maxPageNum={maxPageNum} currentPageNum={currentPageNum} handleClickPageNum={handleClickPageNum} />
      </section>
    </div>
  )
}

export default App
