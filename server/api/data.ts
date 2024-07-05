import { Item } from "~/types/useTypes";

export default defineEventHandler(async (event) => {

    if (event.method === 'GET') {
        return itemData;
    } else if (event.method === 'POST') {
        itemData = await readBody(event);        
    }
});

let itemData: Item[] = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Sally Doe', email: 'sally@calpoly.edu' },
    { name: 'Steve Smith', email: 'steve@calpoly.edu' },
    { name: 'Kathy Doe', email: 'kathy@calpoly.edu' },
    { name: 'Maria Anders', email: 'maria.anders@example.com' },
];
