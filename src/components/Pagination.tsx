import { MAX_PAGE_BTN_NUM_SHOW, PAGE_BTN_NUM_BETWEEN_SHOW } from "../const"
import { PageBtn } from "./PageBtn"

export const Pagination = (props: {
    currentPageNum: number,
    handleClickPageNum: (num: number) => void
    maxPageNum: number
}) => {
    const { currentPageNum, handleClickPageNum, maxPageNum } = props
    const renderBtns = () => {
        const btnDomList = []
        if (maxPageNum <= MAX_PAGE_BTN_NUM_SHOW) {
            for (let i = 0; i < maxPageNum; i++) {
                btnDomList.push(<PageBtn key={i + 1} handleClickPageNum={handleClickPageNum} pageNum={i + 1} currentPageNum={currentPageNum} />)
            }
        } else if (currentPageNum - PAGE_BTN_NUM_BETWEEN_SHOW <= 0) { //first 
            for (let i = 0; i < MAX_PAGE_BTN_NUM_SHOW; i++) {
                btnDomList.push(<PageBtn key={i + 1} handleClickPageNum={handleClickPageNum} pageNum={i + 1} currentPageNum={currentPageNum} />)
            }
        } else if (maxPageNum - currentPageNum <= PAGE_BTN_NUM_BETWEEN_SHOW) { //last
            for (let i = (maxPageNum - MAX_PAGE_BTN_NUM_SHOW); i < maxPageNum; i++) {
                btnDomList.push(<PageBtn key={i + 1} handleClickPageNum={handleClickPageNum} pageNum={i + 1} currentPageNum={currentPageNum} />)
            }
        } else {
            for (let i = (currentPageNum - PAGE_BTN_NUM_BETWEEN_SHOW - 1); i < (currentPageNum + PAGE_BTN_NUM_BETWEEN_SHOW); i++) {
                btnDomList.push(<PageBtn key={i + 1} handleClickPageNum={handleClickPageNum} pageNum={i + 1} currentPageNum={currentPageNum} />)
            }
        }
        return (
            <>
                {btnDomList}
            </>
        )
    }
    return <section className="pagination">
        <button className="pagination-btn" onClick={() => handleClickPageNum(1)}>
            &lt;&lt;
        </button>
        <button className="pagination-btn" onClick={() => handleClickPageNum(currentPageNum === 1 ? 1 : currentPageNum - 1)}>
            &lt;
        </button>
        {renderBtns()}
        <button className="pagination-btn" onClick={() => handleClickPageNum(currentPageNum === maxPageNum ? maxPageNum : currentPageNum + 1)}>
            &gt;
        </button>
        <button className="pagination-btn" onClick={() => handleClickPageNum(maxPageNum)}>
            &gt;&gt;
        </button>
    </section>
}