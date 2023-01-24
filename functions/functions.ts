import { read } from 'fs';
import CharactersInterface from './interface';
import sleep from './sleep';

function rarityIndex(percentages: number[]) {
  const percentageReference: number = Math.round(Math.random() * (100 - 1)) + 1;
  const percentagesReversed = percentages.reverse();
  let index: number = 0;
  for (let j: number = 0; j < percentages.length - 1; j += 1) {
    if (percentageReference <= percentagesReversed[j]) {
      index = percentages.length - j;
      percentages = percentagesReversed.reverse();
      return (index);
    }
  }
  index = 1;
  percentages = percentagesReversed.reverse();
  return (index);
}

function rarityCharacters(characters: CharactersInterface[], index: number) {
  for (let j: number = 0; j < characters.length; j += 1) {
    if (characters[j].rarity !== index) {
      characters.splice(j, 1);
      j -= 1;
    }
  }
  return (characters);
}

function rarityPick(rarityCharacters: CharactersInterface[]) {
  return (rarityCharacters[Math.floor(Math.random() * (rarityCharacters.length))]);
}

function lifeBar(number: number, numberMax: number) {
  let array: string[] = ['I'];
  for (let j: number = 0; j < number - 1; j += 1) {
    array.push('I');
  }
  for (let k: number = 0; k < numberMax - number; k += 1) {
    array.push('_');
  }
  if (number === 0) {
    array.splice(0, 1);
    array.push('_');
  }
  const numberString: string = array.join('');
  return (numberString);
}

function lifeBarEnemy(number: number, numberMax: number) {
  let array: string[] = ['I'];
  for (let j: number = 0; j < number - 1; j += 1) {
    array.push('I');
  }
  for (let k: number = 0; k < numberMax - number; k += 1) {
    array.push('_');
  }
  if (number === 0) {
    array.splice(0, 1);
    array.push('_');
  }
  const numberString: string = array.join('');
  return (numberString);
}

function endAdventure() {
  console.clear();
  console.error('\nYou seem hesitant.');
  console.error('Go train and come back when you are more prepared...\n');
  process.exit();
}

function difficultyStats(level, allEnemies, allBosses) {
  if (level === 2) {
    for (let i: number = 0; i < allEnemies.length; i += 1) {
      allEnemies[i].str = Math.round(allEnemies[i].str * 1.5);
      allEnemies[i].hp = Math.round(allEnemies[i].hp * 1.5);
    }
    for (let j: number = 0; j < allBosses.length; j += 1) {
      allBosses[j].str = Math.round(allBosses[j].str * 1.5);
      allBosses[j].hp = Math.round(allBosses[j].hp * 1.5);
    }
  } else if (level === 3) {
    for (let l: number = 0; l < allEnemies.length; l += 1) {
      allEnemies[l].str *= 2;
      allEnemies[l].hp *= 2;
    }
    for (let m: number = 0; m < allBosses.length; m += 1) {
      allBosses[m].str *= 2;
      allBosses[m].hp *= 2;
    }
  } else {
    return;
  }
}

export default { lifeBar, lifeBarEnemy, rarityIndex, rarityCharacters, rarityPick, endAdventure, difficultyStats };