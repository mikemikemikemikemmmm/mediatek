import { OrderType } from "../type";

export const SortSign = (props: { value: OrderType }) => {
    const { value } = props
    return <span className={`sortSign ${value === 'none' ? "isNone" : ""} ${value === 'asc' ? "isAsc" : ""}`}>
        {value === 'none' ? null : "V"}
    </span>
}