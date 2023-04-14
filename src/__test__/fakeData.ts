import { QueryResponse, RowData } from "../type";
const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * alphabetArray.length);
    return alphabetArray[randomIndex];
}
function generateRandomDateString() {
    let result = ''
    while (isNaN(Date.parse(result))) {
        const year = Math.floor(Math.random() * 100) + 1970;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);
        result = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.000Z`
    }
    return result
}
export const createFakeResponse = (rowLength: number) => {
    const data = {
        launches: []
    } as QueryResponse
    for (let i = 0; i < rowLength; i++) {
        const row = {
            mission_name: getRandomLetter(),
            rocket: {
                rocket_name: getRandomLetter(),
                rocket_type: getRandomLetter(),
            },
            launch_date_local: generateRandomDateString()
        }
        data.launches.push(row)
    }
    return data
}