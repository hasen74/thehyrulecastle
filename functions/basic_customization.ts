import CharactersInterface from './interface';
import addons from './functions';
import sleep from './sleep';

const readline = require('readline-sync');

function startScreen() {
  console.log('############### THE LEGEND OF ZELDA ###############');
  console.log('                   HYRULE CASTLE               ')
  console.log('\n            \x1b[1;37;41mEnter z to start a New Game\x1b[0m');
  console.log('                  Type q to Quit\n');
  const go: string = readline.question('###################################################\n');
  return go;
}

function recursiveTryFloors(player: CharactersInterface) {
  console.log('How many floors are you willing to climb ?');
  const floorsNumber = readline.question('\x1b[34m10, 20, 50\x1b[0m or\x1b[0m \x1b[34m100\x1b[0m ?\n');
  if (floorsNumber === '10') {
    return (parseInt(floorsNumber));
  } else if (floorsNumber === '20') {
    return (parseInt(floorsNumber));
  } else if (floorsNumber === '50') {
    return (parseInt(floorsNumber));
  } else if (floorsNumber === '100') {
    return (parseInt(floorsNumber));
  } else {
    console.clear();
    console.log(`You can\'t build your own castle \x1b[1;32m${player.name}\x1b[0m !\n`);
    sleep(1000);
    recursiveTryFloors(player);
  }
}

function choicesScreen(go, player) {
  if (go === 'z') {
    console.clear();
    console.log(`                    Welcome \x1b[1;32m${player.name}\x1b[0m !\n`);
    sleep(2000);
    console.log('You are about to go on an adventure to free princess Zelda.');
    console.log(`You will have to climb the castles\' floors all the way up to the tower where \x1b[1;31ma boss\x1b[0m lies.`);
    console.log('On each floor, you will find an enemy that you will have to defeat in order to move on to the next floor.\n');
    sleep(4000);
    console.log(`So \x1b[1;32m${player.name}\x1b[0m, here are your options:`);
    const difficultyLevels: string[] = ['1- Normal', '2- Difficult', '3- Insane'];
    console.log(`\n\x1b[34m${difficultyLevels.join(' ')}\x1b[0m\n`);
    const difficultyAnswer = readline.question('How brave are you feeling today ?..\n').toLowerCase();
    let level: number = 0;
    if (difficultyAnswer === 'normal' || '1') {
      level = 1;
    } else if (difficultyAnswer === 'difficult' || '2') {
      level = 2;
    } else if (difficultyAnswer === 'insane' || '3') {
      level = 3;
    } else {
      addons.endAdventure();
    }
    console.clear()
    console.log('Good !\n');
    const floorsNumber: number = recursiveTryFloors(player);
    console.log('\nExcellent !');
    const areYouReady: boolean = readline.keyInYN('Are you ready ?\n');
    if (areYouReady === true) {
      console.clear();
      console.log('Oh !');
      console.log('I forgot...');
      sleep(2000);
      console.log(`\nHere are \x1b[1;33m${player.coins}\x1b[0m coins for you. You will earn one more for each victory.`);
      sleep(3000);
      console.clear();
      console.log('Good luck !');
      sleep(2000);
      const areYouReadyNum = areYouReady ? 1 : 0;
      const readyAndLevelAndFloors: (number)[] = [areYouReadyNum, level, floorsNumber];
      return readyAndLevelAndFloors;
    } else {
      addons.endAdventure();
    }
  } else if (go === 'q') {
    process.exit();
  } else {
    addons.endAdventure();
  }
}

export default { startScreen, choicesScreen, recursiveTryFloors };