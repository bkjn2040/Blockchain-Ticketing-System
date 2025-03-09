import fs from "fs";

const readDb = (dbName = 'db.json') => {
    // read JSON object from file
    const data = fs.readFileSync("./data/" + dbName, 'utf8')
    return JSON.parse(data)
}

const writeDb = (obj: Object, dbName: string = 'db.json') => {
    if (!obj) return console.log('Please provide data to save')
    try {
        fs.writeFileSync("./data/" + dbName, JSON.stringify(obj))
        return console.log('SAVE SUCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}

export { readDb, writeDb };