import { Battle } from "../templates"

const LaunchBattle = ( ) => {

// Lance la bataille en api 
const rapper = {
    name: 'Booba',
    image: 'https://i.scdn.co/image/ab6761610000e5eb96b3ab10e89bad078d125c3a',
    attack: 90,
    defense: 85,
    rarity: 'Légendaire',
  };
  const rapper2 = {
    name: 'GIMS',
    image: 'https://i.scdn.co/image/ab6761610000e5eb77144f838397a467e807df65',
    attack: 80,
    defense: 75,
    rarity: 'Commun',
  };

// const player1= {
//     name:"Alex"
// }
return <Battle
rapper={rapper}
rapper2={rapper2}
// profilPlayer1={player1}
></Battle>


}
export default LaunchBattle;