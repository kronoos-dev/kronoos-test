import { CSVRead } from "./utils.js"
import { transformData } from "./transform.js"
 
const run = async () => {
    try {

        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const formatedResults = transformData(results);
                console.log(formatedResults);

            }
        )
    } catch (e) {
        console.error(e)
    }
}

run()