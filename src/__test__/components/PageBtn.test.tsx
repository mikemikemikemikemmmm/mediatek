import { cleanup, render, screen, fireEvent, waitFor, prettyDOM } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { PageBtn } from "../../components/PageBtn";
describe('pageBtn', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test el', async () => {
        const mockFn = vi.fn()
        const { queryByTestId } = render(<PageBtn handleClickPageNum={mockFn} pageNum={4} currentPageNum={2} />)
        const el = queryByTestId('pagination-btn')
        expect(el).toBeTruthy()
        expect(el?.textContent).toBe("4")
        expect(el?.classList.contains('pagination-btn_actived')).toBeFalsy()
        expect(mockFn).toBeCalledTimes(0)
        fireEvent.click(el as Element)
        await waitFor(() => {
            expect(mockFn).toBeCalledTimes(1)
            expect(mockFn).toBeCalledWith(4)
        })
    })
    it('test el with same currentPageNum', async () => {
        const mockFn = vi.fn()
        const { queryByTestId } = render(<PageBtn handleClickPageNum={mockFn} pageNum={2} currentPageNum={2} />)
        const el = queryByTestId('pagination-btn')
        expect(el).toBeTruthy()
        expect(el?.classList.contains('pagination-btn_actived')).toBeTruthy()
    })
})