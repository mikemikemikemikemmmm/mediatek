import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { SortSign } from "../../components/SortSign";
describe('test sortsign', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test asc', () => {
        const { queryByTestId } = render(< SortSign value="asc" />)
        const el = queryByTestId('sortSign')
        expect(el?.textContent).toBe('V')
        expect(el?.classList.contains('isAsc')).toBeTruthy()
        expect(el?.classList.contains('isNone')).toBeFalsy()
    })
    it('test desc', () => {
        const { queryByTestId } = render(< SortSign value="desc" />)
        const el = queryByTestId('sortSign')
        expect(el?.textContent).toBe('V')
        expect(el?.classList.contains('isAsc')).toBeFalsy()
        expect(el?.classList.contains('isNone')).toBeFalsy()

    })
    it('test none', () => {
        const { queryByTestId } = render(< SortSign value="none" />)
        const el = queryByTestId('sortSign')
        expect(el?.textContent).toBe('')
        expect(el?.classList.contains('isAsc')).toBeFalsy()
        expect(el?.classList.contains('isNone')).toBeTruthy()

    })
})