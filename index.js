const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Шлях до файлу JSON з даними')
  .option('-o, --output <path>', 'Шлях до вихідного файлу')
  .option('-d, --display', 'Вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

// Перевірка наявності вхідного файлу
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  // Знаходимо всі курси золота (код металу XAU або валюта XAU)
  const goldRates = data.filter(entry => entry.cc === 'XAU' || entry.metalCode === 1);

  if (goldRates.length === 0) {
    console.error('No gold rates found in the data.');
    process.exit(1);
  }

  const maxRate = Math.max(...goldRates.map(entry => parseFloat(entry.rate || entry.price)));
  const result = `Максимальний курс: ${maxRate}`;

  if (options.display) {
    console.log(result);
  }

  if (options.output) {
    fs.writeFileSync(options.output, result);
  }
} catch (err) {
  console.error('Error reading or processing the file:', err.message);
  process.exit(1);
}

