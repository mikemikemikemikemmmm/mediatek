import { ROW_NUM_PAGE } from "../const"
import { RowData } from "../type"

export const Table = (props: { rowDatas: RowData[], currentPageNum: number }) => {
    const { rowDatas = [], currentPageNum = 1 } = props
    if (rowDatas.length === 0) {
        return <div data-testid='noData' className="noData">
            No data
        </div>
    }
    const startIndex = (currentPageNum - 1) * ROW_NUM_PAGE
    const endIndex = (currentPageNum * ROW_NUM_PAGE) < rowDatas.length ? (currentPageNum * ROW_NUM_PAGE) : rowDatas.length
    const showData = rowDatas.slice(startIndex, endIndex)
    const timeToDate = (time: number) => {
        return new Date(time).toDateString()
    }
    return <>{
        showData.map(row => (
            <div data-testid='row' className="row data-row" key={row.id}>
                <span data-testid='mission_name' className="row-col">
                    {row.mission_name || 'null'}
                </span>
                <span data-testid='rocket_name' className="row-col">
                    {row.rocket_name || 'null'}
                </span>
                <span data-testid='rocket_type' className="row-col">
                    {row.rocket_type || 'null'}
                </span>
                <span data-testid='launch_date_local' className="row-col" >
                    {timeToDate(row.launch_date_local) || 'null'}
                </span>
            </div>
        ))
    }</>
}