export interface RowData {
    id: number
    mission_name: string,
    rocket_name: string,
    rocket_type: string
    launch_date_local: number
}
export type QueryResponse = {
    launches: {
        mission_name: string,
        rocket: {
            rocket_name: string,
            rocket_type: string
        }
        launch_date_local: string
    }[]
}
export type RowDataKey = Exclude<keyof RowData, 'id'>
export type SearchKey = Exclude<RowDataKey, 'launch_date_local'>
export type OrderType = 'asc' | 'desc' | 'none'
export type SortStatus = Record<RowDataKey, OrderType>
export type SearchInputs = {
    column: SearchKey,
    value: string,
    start: string,
    end: string,
    isSearchByDate: boolean
}
export type SearchStatus = SearchInputs