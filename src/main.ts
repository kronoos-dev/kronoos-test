import { ErrorHandler } from "./modules/errorHandler";
import { CSVService } from "./services/csvService";
import { DataService } from "./services/dataService.js";

async function processCSV() {
  try {
    const filePath = './data/data.csv';
    const data = await CSVService.readCSV(filePath);

    if (data.length === 0) {
      console.log('No valid data to process.');
      return;
    }

    const processedData = DataService.processData(data);

    console.log('Processed Data:');
    console.log(processedData);
  } catch (error) {
    ErrorHandler.handle(error, 'Error in CSV processing');
  }
}

processCSV();
