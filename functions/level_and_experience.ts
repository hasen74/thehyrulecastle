import sleep from './sleep';

const readline = require('readline-sync');

function level(player) {
  const minXP: number = 15;
  const maxXP: number = 50;
  let randomXP: number = Math.floor(Math.random() * (maxXP - minXP)) + minXP;
  console.log(`\nYou just won ${randomXP}XP`);
  player.levelup += randomXP;
  if (player.levelup >= 50) {
    sleep(1000);
    console.log(`You just passed a level!`);
    console.log("What do you want to increase?\n",);
    const levelUpActions: string[] = ['1- Attack🗡', '2- Heal💚'];
    for (const element of levelUpActions) {
      console.log(element)
    }
    let levelUpAnswer: string = readline.question('')
    if (levelUpAnswer === "1" || levelUpAnswer.toLowerCase() === 'attack') {
      player.str += 5;
      console.clear();
      console.log(`\nFélicitations🥖! You now have ${(player.str)}🗡`);
    }
    else if (levelUpAnswer === "2" || levelUpAnswer.toLowerCase() === 'heal') {
      player.maxHp += 10;
      console.clear();
      console.log(`\nCongratulations! Your HP max got upped by 10HP.`);
    }
    player.levelup = 0;
    return;
  }
}

export default level;