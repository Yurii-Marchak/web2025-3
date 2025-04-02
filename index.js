console.log("Hello, web2025-3!");
const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .description('Програма для читання аргументів')
  .option('-n, --name <type>', 'Ваше ім\'я');

program.parse(process.argv);

if (program.name) {
  console.log(`Привіт, ${program.name}!`);
} else {
  console.log("Привіт, web2025-3!");
}
