import sleep from './sleep';
import addons from './functions';
import level from './level_and_experience';

const readline = require('readline-sync');

function combats(floor, maxFloors, player, enemy, actions, escape) {
  const protectstr: number = Math.round(enemy.str / 2);
  let protectOnOff: number = 0;
  escape = 0;
  if (floor === maxFloors) {
    console.clear();
    console.log(`\x1b[1;30;47m############### FINAL BOSS ###############\x1b[0m\n`);
  } else {
    console.clear();
    console.log(`\x1b[1;30;47m############### FLOOR ${floor} ###############\x1b[0m\n`);
  }
  console.log(`You meet \x1b[31m${enemy.name}\x1b[0m.`);
  sleep(2000);
  while (enemy.hp > 0) {
    console.log(`\n\x1b[31m${enemy.name}\x1b[0m:`);
    console.log(`HP`, addons.lifeBarEnemy(enemy.hp, enemy.maxHp));
    console.log(`\n\x1b[32m${player.name}\x1b[0m:`);
    console.log(`HP`, addons.lifeBar(player.hp, player.maxHp));
    console.log(`\nYour turn:\n`);
    for (const element of actions) {
      console.log(element)
    }
    let action: string = readline.question('What do you do ?\n');
    if (action === "1" || action.toLowerCase() === 'attack') {
      console.clear();
      enemy.hp = Math.max(0, enemy.hp - player.str);
      console.log(`Well done ! Your enemy loses ${player.str} HP.`);
    } else if (action === "2" || action.toLowerCase() === 'heal') {
      player.hp += (player.maxHp / 2);
      if (player.hp > player.maxHp) {
        player.hp = player.maxHp;
      } else {
        player.hp = player.hp;
      }
      console.clear();
      console.log(`Ahhhh ! A good potion warms your heart. You gain ${player.maxHp / 2} HP.`);
    } else if (action === "3" || action.toLowerCase() === "escape") {
      console.clear();
      console.log("\nYou have decided to escape...");
      console.log("You look for another room.");
      sleep(2000);
      escape = 1;
      return (escape);
    } else if (action === "4" || action.toLowerCase() === "protect") {
      protectOnOff = 1;
      console.clear();
      console.log('You protect yourself from the next attack : the damage will be reduced by 50%!');
      sleep(1000);
    } else {
      console.clear();
      console.log(`\Focus \x1b[32m${player.name}\x1b[0m. Do something!`);
    }
    if (enemy.hp > 0) {
      console.log(`\x1b[31m${enemy.name}\x1b[0m attacks...\n`);
      sleep(2000);
      if (protectOnOff === 1) {
        player.hp -= protectstr;
      } else {
        player.hp -= enemy.str;
      }
      if (player.hp > 0) {
        protectOnOff === 1 ? console.log(`Ouch ! You lose ${protectstr} HP.`) : console.log(`Ouch ! You lose ${enemy.str} HP.`);
        protectOnOff = 0;
      } else {
        sleep(2000);
        console.log(`\x1b[31m${enemy.name}\x1b[0m:`);
        console.log(`HP`, addons.lifeBarEnemy(enemy.hp, enemy.maxHp));
        console.log(`\n\x1b[32m${player.name}\x1b[0m:`);
        console.log(`HP`, addons.lifeBar(player.hp, player.maxHp));
        sleep(2000);
        console.log(`\nYou are DEAD :,(`);
        console.log('\n############### GAMEOVER ###############\n');
        process.exit();
      }
    } else {
      if (floor !== maxFloors) {
        sleep(2000);
        console.log(`\n\x1b[31m${enemy.name}\x1b[0m:`);
        console.log(`HP`, addons.lifeBarEnemy(enemy.hp, enemy.maxHp));
        console.log(`\n\x1b[32m${player.name}\x1b[0m:`);
        console.log(`HP`, addons.lifeBar(player.hp, player.maxHp));
        sleep(1000);
        console.log(`\nYou defeated \x1b[31m${enemy.name}\x1b[0m, yay !`);
        player.coins += 1;
        sleep(1000);
        console.log(`\nYou now possess \x1b[1;33m${player.coins}\x1b[0m coins`);
        level(player);
        if (floor + 1 !== maxFloors) {
          sleep(2000);
          console.log(`\n>>> You move on to floor ${(floor + 1)}.`);
          sleep(2000);
          return (0);
        } else {
          sleep(2000);
          console.log('\n>>> OMG! You move on to the FINAL BOSS.');
          sleep(2000);
          return (0);
        }
      } else {
        console.clear();
        console.log('###################################################################');
        console.log(`\x1b[37;131m################## You defeated \x1b[31m${enemy.name}\x1b[0m ! Princess Zelda is free ! ##################`);
        console.log(`(##You also leave with \x1b[1;33m${player.coins}\x1b[0m coins, you can buy her a chicken or something).##`)
        console.log('####################################################################################');
        process.exit();
      }
    }
  }
}


export default combats;