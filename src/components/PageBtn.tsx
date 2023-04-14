export const PageBtn = (props: { handleClickPageNum: (num: number) => void, pageNum: number, currentPageNum: number }) => {
    return <button
        data-testid='pagination-btn'
        className={`pagination-btn ${props.currentPageNum === props.pageNum ? 'pagination-btn_actived' : ''}`}
        onClick={() => props.handleClickPageNum(props.pageNum)}>
        {props.pageNum}
    </button>
}