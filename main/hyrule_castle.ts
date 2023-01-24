import CharactersInterface from '../functions/interface';
import combat from '../functions/better_combat_options';
import start from '../functions/basic_customization';
import addons from '../functions/functions';
import sleep from '../functions/sleep';

const fs = require('fs');

const allPlayersString: string = fs.readFileSync('../json/players.json', 'utf-8');
const allBossesString: string = fs.readFileSync('../json/bosses.json', 'utf-8');
const allEnemiesString: string = fs.readFileSync('../json/enemies.json', 'utf-8');

let allPlayers: CharactersInterface[] = JSON.parse(allPlayersString);
let allBosses: CharactersInterface[] = JSON.parse(allBossesString);
let allEnemies: CharactersInterface[] = JSON.parse(allEnemiesString);

const rarityPercentages: number[] = [50, 30, 15, 4, 1];

const rarityIndexPlayers = addons.rarityIndex(rarityPercentages);
const rarityIndexBosses = addons.rarityIndex(rarityPercentages);
const rarityIndexEnemies = addons.rarityIndex(rarityPercentages);

const rarityPlayers: CharactersInterface[] = addons.rarityCharacters(allPlayers, rarityIndexPlayers);
const player: CharactersInterface = addons.rarityPick(rarityPlayers);

const go = start.startScreen();

player.coins = 12

const readyAndLevelAndFloors = start.choicesScreen(go, player);

const ready: number = readyAndLevelAndFloors[0];
const level: number = readyAndLevelAndFloors[1];
const maxFloors: number = readyAndLevelAndFloors[2];

addons.difficultyStats(level, allEnemies, allBosses);

let rarityBosses: CharactersInterface[] = addons.rarityCharacters(allBosses, rarityIndexBosses);
let boss: CharactersInterface = addons.rarityPick(rarityBosses);

let rarityEnemies: CharactersInterface[] = addons.rarityCharacters(allEnemies, rarityIndexEnemies);
let enemy: CharactersInterface = addons.rarityPick(rarityEnemies);

player.maxHp = player.hp;
player.levelup = 0;

boss.maxHp = boss.hp;

const actions: string[] = ['1- Attack🗡', '2- Heal💚', '3- Escape🏃', '4- Protect🛡'];

function main(go: number, enemy) {
  let floor: number = 1;
  let progression: number = 1;
  let escape: number = 0;
  if (go === 1) {
    while (floor !== maxFloors) {
      if (progression === 10) {
        enemy = addons.rarityPick(addons.rarityCharacters(JSON.parse(allBossesString), addons.rarityIndex(rarityPercentages)));
      } else {
      enemy.maxHp = enemy.hp;
      escape = combat(floor, maxFloors, player, enemy, actions, escape);
      escape === 0 ? floor += 1 : escape = 0;
      enemy.hp = enemy.maxHp;
      enemy = addons.rarityPick(addons.rarityCharacters(JSON.parse(allEnemiesString), addons.rarityIndex(rarityPercentages)));
      }
    }
  } else {
    addons.endAdventure();
  }
    combat(floor, maxFloors, player, boss, actions, escape);
    process.exit();
}

main(ready, enemy);




