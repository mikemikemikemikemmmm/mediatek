import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { Pagination } from "../../components/Pagination";
import { MAX_PAGE_BTN_NUM_SHOW } from "../../const";
describe('test pagination', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test middle', async () => {
        const mockClick = vi.fn()
        const currentPageNum = 4
        const maxPageNum = 7
        render(<Pagination
            currentPageNum={currentPageNum}
            maxPageNum={maxPageNum}
            handleClickPageNum={mockClick} />)
        const btns = screen.queryAllByTestId('pagination-btn')
        expect(btns.length).toBe(MAX_PAGE_BTN_NUM_SHOW + 2 + 2)
        expect(btns[0].textContent).toBe('<<')
        expect(btns[1].textContent).toBe('<')
        expect(btns[2].textContent).toBe('2')
        expect(btns[3].textContent).toBe('3')
        expect(btns[4].textContent).toBe('4')
        expect(btns[5].textContent).toBe('5')
        expect(btns[6].textContent).toBe('6')
        expect(btns[7].textContent).toBe('>')
        expect(btns[8].textContent).toBe('>>')
        fireEvent.click(btns[0])
        await waitFor(() => { })
        expect(mockClick).toBeCalledWith(1)
        fireEvent.click(btns[1])
        await waitFor(() => { })
        expect(mockClick).toBeCalledWith(3)
        fireEvent.click(btns[7])
        await waitFor(() => { })
        expect(mockClick).toBeCalledWith(5)
        fireEvent.click(btns[8])
        await waitFor(() => { })
        expect(mockClick).toBeCalledWith(7)
        expect(mockClick).toBeCalledTimes(4)
    })
    it('test first', async () => {
        const mockClick = vi.fn()
        const currentPageNum = 2
        const maxPageNum = 7
        render(<Pagination
            currentPageNum={currentPageNum}
            maxPageNum={maxPageNum}
            handleClickPageNum={mockClick} />)
        const btns = screen.queryAllByTestId('pagination-btn')
        expect(btns.length).toBe(MAX_PAGE_BTN_NUM_SHOW + 2 + 2)
        expect(btns[0].textContent).toBe('<<')
        expect(btns[1].textContent).toBe('<')
        expect(btns[2].textContent).toBe('1')
        expect(btns[3].textContent).toBe('2')
        expect(btns[4].textContent).toBe('3')
        expect(btns[5].textContent).toBe('4')
        expect(btns[6].textContent).toBe('5')
        expect(btns[7].textContent).toBe('>')
        expect(btns[8].textContent).toBe('>>')
    })
    it('test last', async () => {
        const mockClick = vi.fn()
        const currentPageNum = 43
        const maxPageNum = 44
        render(<Pagination
            currentPageNum={currentPageNum}
            maxPageNum={maxPageNum}
            handleClickPageNum={mockClick} />)
        const btns = screen.queryAllByTestId('pagination-btn')
        expect(btns.length).toBe(MAX_PAGE_BTN_NUM_SHOW + 2 + 2)
        expect(btns[0].textContent).toBe('<<')
        expect(btns[1].textContent).toBe('<')
        expect(btns[2].textContent).toBe('40')
        expect(btns[3].textContent).toBe('41')
        expect(btns[4].textContent).toBe('42')
        expect(btns[5].textContent).toBe('43')
        expect(btns[6].textContent).toBe('44')
        expect(btns[7].textContent).toBe('>')
        expect(btns[8].textContent).toBe('>>')
    })
    it('test max<MAX_PAGE_BTN_NUM_SHOW', async () => {
        const mockClick = vi.fn()
        const currentPageNum = 2
        const maxPageNum = 3
        render(<Pagination
            currentPageNum={currentPageNum}
            maxPageNum={maxPageNum}
            handleClickPageNum={mockClick} />)
        const btns = screen.queryAllByTestId('pagination-btn')
        expect(btns.length).toBe(3 + 2 + 2)
        expect(btns[0].textContent).toBe('<<')
        expect(btns[1].textContent).toBe('<')
        expect(btns[2].textContent).toBe('1')
        expect(btns[3].textContent).toBe('2')
        expect(btns[4].textContent).toBe('3')
        expect(btns[5].textContent).toBe('>')
        expect(btns[6].textContent).toBe('>>')
    })
})