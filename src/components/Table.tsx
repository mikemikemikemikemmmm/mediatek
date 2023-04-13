import { ROW_NUM_PAGE } from "../const"
import { RowData } from "../type"

export const Table = (props: { rowDatas: RowData[], currentPageNum: number }) => {
    const { rowDatas = [], currentPageNum = 1 } = props
    if (rowDatas.length === 0) {
        return <div className="noData">
            No data
        </div>
    }
    const startIndex = (currentPageNum - 1) * ROW_NUM_PAGE
    const endIndex = (currentPageNum * ROW_NUM_PAGE) < rowDatas.length ? (currentPageNum * ROW_NUM_PAGE) : rowDatas.length - 1
    const showData = rowDatas.slice(startIndex, endIndex)
    const timeToDate = (time: number) => {
        return new Date(time).toDateString()
    }
    return <>{
        showData.map(row => (
            <div className="row data-row" key={row.mission_name}>
                <span className="row-col">
                    {row.mission_name}
                </span>
                <span className="row-col">
                    {row.rocket_name}
                </span>
                <span className="row-col">
                    {row.rocket_type}
                </span>
                <span className="row-col" >
                    {timeToDate(row.launch_date_local)}
                </span>
            </div>
        ))
    }</>
}