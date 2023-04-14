import { OrderType, QueryResponse, RowData, RowDataKey } from "./type";

export const transResToData = (res: QueryResponse) => {
    let counter = 0
    const data = res.launches.map(item => {
        counter += 1
        return {
            id: counter,
            mission_name: item.mission_name,
            rocket_name: item.rocket.rocket_name,
            rocket_type: item.rocket.rocket_type,
            launch_date_local: Date.parse(item.launch_date_local)
        }
    }) as RowData[]
    return data
}

export const sortByDate = (data: RowData[], orderType: OrderType) => {
    const copy = [...data]
    if (orderType === 'asc') {
        copy.sort((prev, next) => {
            return prev.launch_date_local - next.launch_date_local
        })
    } else if (orderType === 'desc') {
        copy.sort((prev, next) => {
            return next.launch_date_local - prev.launch_date_local
        })
    }
    return copy
}
export const sortByColumn = (data: RowData[], column: RowDataKey, orderType: OrderType) => {
    const copy = [...data]
    copy.sort((prev, next) => {
        const prevVal = prev[column] as string
        const nextVal = next[column] as string
        if (orderType === 'asc') {
            return prevVal.localeCompare(nextVal)
        } else {
            return nextVal.localeCompare(prevVal)
        }
    })
    return copy
}