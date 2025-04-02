const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .version('1.0.0')
  .description('Програма для читання курсу валют')
  .requiredOption('-i, --input <path>', 'Шлях до файлу для читання')
  .option('-o, --output <path>', 'Шлях до файлу для запису')
  .option('-d, --display', 'Вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));
  if (!Array.isArray(data)) {
    throw new Error("Invalid JSON format: expected an array");
  }
  
  const maxRate = Math.max(...data.map(entry => entry.rate || 0));
  const result = `Максимальний курс: ${maxRate.toFixed(4)}`;
  
  if (options.output) {
    fs.writeFileSync(options.output, result, 'utf-8');
  }
  
  if (options.display) {
    console.log(result);
  }
} catch (error) {
  console.error("Error reading or processing the JSON file:", error.message);
  process.exit(1);
}

