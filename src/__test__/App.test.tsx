import { act, cleanup, findByTestId, fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { App } from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { createQuery } from "../api/methods";
import { createFakeResponse } from "./fakeData";
import { QueryResponse } from "../type";
import { MAX_PAGE_BTN_NUM_SHOW, ROW_NUM_PAGE } from "../const";
import { sortByColumn, sortByDate, transResToData } from "../utils";
const createMock = (dataLength: number) => {
    const responseMock = {
        request: {
            query: createQuery(),
        },
        result: {
            data: createFakeResponse(dataLength) as QueryResponse
        }
    }
    return {
        container: <MockedProvider mocks={[responseMock]} addTypename={false}>
            <App />
        </MockedProvider>
        ,
        res: responseMock.result.data
    }
}
describe('test pagination btn', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test page less than max show', async () => {
        const dataNum = ROW_NUM_PAGE + Math.floor(ROW_NUM_PAGE / 2)
        render(createMock(dataNum).container)
        await waitFor(() => {
            const btns = screen.queryAllByTestId('pagination-btn')
            expect(btns.length).toBe(2 + 2 + 2)
            expect(btns[2].textContent).toBe('1')
            expect(btns[2].classList.contains('pagination-btn_actived')).toBeTruthy()
            fireEvent.click(btns[3])
            expect(btns[2].classList.contains('pagination-btn_actived')).toBeFalsy()
            expect(btns[3].classList.contains('pagination-btn_actived')).toBeTruthy()

        })
    })
    it('test page higher than max show', async () => {
        const dataNum = ROW_NUM_PAGE * 8 + 1
        render(createMock(dataNum).container)
        await waitFor(() => {
            const btns = screen.queryAllByTestId('pagination-btn')
            expect(btns.length).toBe(2 + MAX_PAGE_BTN_NUM_SHOW + 2)
            expect(btns[2].textContent).toBe('1')
            expect(btns[2].classList.contains('pagination-btn_actived')).toBeTruthy()

            fireEvent.click(btns[8]) //to last
            const btns2 = screen.queryAllByTestId('pagination-btn')
            expect(btns2[6].classList.contains('pagination-btn_actived')).toBeTruthy()
            expect(btns2[6].textContent).toBe('9')
        })
    })
})
describe('test sort', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test mission name', async () => {
        const dataNum = 19
        const mock = createMock(dataNum)
        const data = transResToData(mock.res)
        render(mock.container)
        await waitFor(async () => {
            const sortBtns = screen.queryAllByTestId('row-sortBtn')
            expect(sortBtns.length).toBe(4)
            fireEvent.click(sortBtns[0])
            const ascNodes = await screen.findAllByTestId('mission_name')
            const ascData = sortByColumn([...data], 'mission_name', 'asc')
            const compareAsc = ascData.every((item, index) => {
                return item.mission_name === ascNodes[index].textContent
            })
            expect(compareAsc).toBeTruthy()

            fireEvent.click(sortBtns[0])
            const descNodes = await screen.findAllByTestId('mission_name')
            const descData = sortByColumn([...data], 'mission_name', 'desc')
            const compareDesc = descData.every((item, index) => {
                return item.mission_name === descNodes[index].textContent
            })
            expect(compareDesc).toBeTruthy()

            fireEvent.click(sortBtns[0])
            const nodes = await screen.findAllByTestId('mission_name')
            const compareNoOrder = data.every((item, index) => {
                return item.mission_name === nodes[index].textContent
            })
            expect(compareNoOrder).toBeTruthy()
        })
    })

})
describe('test search', () => {
    beforeEach(() => {
        cleanup()
    })
    it('filter column and clear', async () => {
        const dataNum = 19
        const mock = createMock(dataNum)
        const data = transResToData(mock.res)
        const filterVal = 'b'
        render(mock.container)
        await waitFor(async () => {
            const selectEl = await screen.findByTestId('searchForm-column-selectInput')
            expect((selectEl as HTMLInputElement).value).toBe('mission_name')
            const inputEl = await screen.findByTestId("searchForm-column-textInput")
            fireEvent.change(inputEl, { target: { value: filterVal } })
            const submitEl = await screen.findByTestId('searchForm-btns-submit')
            fireEvent.click(submitEl)
            const filteredData = data.filter(item => item.mission_name.includes(filterVal))
            const filteredList = screen.queryAllByTestId('mission_name')  //may be zero length
            const compareFiltered = filteredData.every((item, index) => {
                return item.mission_name === filteredList[index].textContent
            })
            expect(compareFiltered).toBeTruthy()

            const clearEl = await screen.findByTestId('searchForm-btns-clear')
            fireEvent.click(clearEl)
            const noFliteredList = await screen.findAllByTestId('mission_name')
            const compareNoFiltered = data.every((item, index) => {
                return item.mission_name === noFliteredList[index].textContent
            })
            expect(compareNoFiltered).toBeTruthy()
        }, {
            timeout: 3000
        })
    })
    it('filter date and clear', async () => {
        const dataNum = 19
        const mock = createMock(dataNum)
        const data = transResToData(mock.res)
        render(mock.container)
        await waitFor(async () => {
            const checkEl = await screen.findByTestId('searchForm-date-checkBoxInput')
            fireEvent.click(checkEl)
            const startEl = await screen.findByTestId('searchForm-date-start')
            const startDate = '2015-05-24'
            const startDateTime = Date.parse(startDate)
            fireEvent.change(startEl, { target: { value: startDate } })
            const submitEl = await screen.findByTestId('searchForm-btns-submit')
            fireEvent.click(submitEl)
            const compareFilterStart = screen.queryAllByTestId('launch_date_local').every((item, index) => {
                const parseTime = Date.parse(item.textContent as string)
                return parseTime >= startDateTime
            })

            expect(compareFilterStart).toBeTruthy()

            // start and end
            const endEl = await screen.findByTestId('searchForm-date-end')
            const endDate = '2017-05-24'
            const endDateTime = Date.parse(endDate)
            fireEvent.change(endEl, { target: { value: endDate } })
            fireEvent.click(submitEl)
            const compareFilterStartAndEnd = screen.queryAllByTestId('launch_date_local').every((item) => {
                const parseTime = Date.parse(item.textContent as string)
                return endDateTime >= parseTime && parseTime >= startDateTime
            })
            expect(compareFilterStartAndEnd).toBeTruthy()

            //click clear
            const clearEl = await screen.findByTestId('searchForm-btns-clear')
            fireEvent.click(clearEl)
            const compareAfterClear = screen.queryAllByTestId('mission_name').every((item, index) => {
                return item.textContent === data[index].mission_name
            })
            expect(compareAfterClear).toBeTruthy()

        }, {
            timeout: 3000
        })
    })
})