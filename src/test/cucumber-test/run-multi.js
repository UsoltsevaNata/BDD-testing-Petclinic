const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RUNS = 25;
const LOG_DIR = path.join(__dirname, 'test-results', 'logs');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

console.log(`Запуск ${RUNS} прогонов тестов для Spring PetClinic...\n`);

const FEATURE_PATH = 'features/**/*.feature';

let testCommand;
const localCucumber = path.join(__dirname, 'node_modules', '.bin', 'cucumber-js');
if (fs.existsSync(localCucumber)) {
    testCommand = `${localCucumber} ${FEATURE_PATH}`;
} else if (fs.existsSync(path.join(__dirname, 'package.json'))) {
    const pkg = require('./package.json');
    if (pkg.scripts && pkg.scripts.test) {
        testCommand = 'npm run test';
    } else {
        testCommand = `npx cucumber-js ${FEATURE_PATH}`;
    }
} else {
    console.error('Не удалось определить способ запуска тестов.');
    process.exit(1);
}

console.log(`Команда: ${testCommand}\n`);

for (let i = 0; i < RUNS; i++) {
    const runIndex = i + 1;
    console.log(` Прогон ${runIndex} из ${RUNS}...`);
    try {
        execSync(testCommand, {
            stdio: 'inherit',
            env: { ...process.env, RUN_INDEX: String(runIndex) }
        });
        console.log(` Прогон ${runIndex} завершён успешно.`);
    } catch (error) {
        console.error(` Прогон ${runIndex} завершился с ошибкой (код ${error.status}).`);
    }
}

console.log(`\n Все ${RUNS} прогонов выполнены.`);

console.log('\n Запуск агрегации статистики...');
try {
    execSync('node aggregate-stats.js', { stdio: 'inherit' });
    console.log(' Агрегация завершена.');
} catch (error) {
    console.error('Ошибка при агрегации статистики:', error.message);
}
