export const PageBtn = (props: { handleClickPageNum: (num: number) => void, pageNum: number, currentPageNum: number }) => {
    return <button className="pagination-btn" style={{ backgroundColor: props.currentPageNum === props.pageNum ? 'var(--primary-color)' : 'white' }} onClick={() => props.handleClickPageNum(props.pageNum)}>{props.pageNum}</button>
}