import { cleanup, fireEvent, prettyDOM, queryAllByTestId, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { Table } from "../../components/Table";
import { RowData } from "../../type";
describe('test table', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test no data', () => {
        const { queryByTestId, queryAllByTestId } = render(<Table rowDatas={[]} currentPageNum={1} />)
        expect(queryByTestId('noData')?.textContent).toBe('No data')
        expect(queryAllByTestId('row').length).toBe(0)
    })
    it('test only 1 data', () => {
        const fakeData = [
            { mission_name: 'a', rocket_name: 'b', rocket_type: 'c', launch_date_local: 111 }
        ] as RowData[]
        const { queryByTestId, queryAllByTestId, container } = render(<Table rowDatas={fakeData} currentPageNum={1} />)
        expect(queryByTestId('noData')).toBeNull()
        expect(queryAllByTestId('row').length).toBe(1)
    })
}) 