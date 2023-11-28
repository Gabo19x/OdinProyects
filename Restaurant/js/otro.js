import * as Airtable from "../node_modules/airtable";
var base = new Airtable({apiKey: 'patq4sXAbO4ot9vvf'}).base('app2Env04v5yXb0rt');

const tabla = base('Food');

async function GetRecords() {
    const records = await tabla.select().firstPage();
    console.log(records);
}

GetRecords();

