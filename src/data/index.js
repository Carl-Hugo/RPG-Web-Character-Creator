import merge from 'deepmerge';
import * as archetypesCRB from './archetypes/CRB.json';
import * as archetypesROT from './archetypes/ROT.json';
import * as archetypeTalentsCRB from './archetypeTalents/CRB.json';
import * as archetypeTalentsROT from './archetypeTalents/ROT.json';
import * as armorCRB from './armor/CRB.json';
import * as armorROT from './armor/ROT.json';
import * as careersCRB from './careers/CRB.json';
import * as careersROT from './careers/ROT.json';
import * as craftsmanshipCRB from './craftsmanship/CRB.json';
import * as craftsmanshipROT from './craftsmanship/ROT.json';
import * as gearCRB from './gear/CRB.json';
import * as gearROT from './gear/ROT.json';
import * as talentsCRB from './talents/CRB.json';
import * as talentsROT from './talents/ROT.json';
import * as weaponsCRB from './weapons/CRB.json';
import * as weaponsROT from './weapons/ROT.json';
import * as skillsCRB from './skills.json';
import * as skillsSW from './skills-StarWars.json';
import * as defaultSettings from './settings.json';

export const archetypes = merge.all([archetypesCRB, archetypesROT]);
export const archetypeTalents = merge.all([archetypeTalentsCRB, archetypeTalentsROT]);
export const armor = merge.all([armorCRB, armorROT]);
export const careers = merge.all([careersCRB, careersROT]);
export const craftsmanship = merge.all([craftsmanshipCRB, craftsmanshipROT]);
export const gear = merge.all([gearCRB, gearROT]);
export const talents = merge.all([talentsCRB, talentsROT]);
export const weapons = merge.all([weaponsCRB, weaponsROT]);


export {default as motivations} from './motivations.json';
export {default as qualities} from './qualities.json';
// export {default as skills} from './skills.json';
// export {default as settings} from './settings.json';
export {dataTypes, customDataTypes, chars, diceNames, modifiableAttributes} from './lists';

//
// Patch the Star Wars setting
//
const StarWarsName = "Star Wars";
defaultSettings.starWars = StarWarsName;
export const settings = defaultSettings;

// Patch skills to support the Star Wars setting
export const skills = merge.all([skillsCRB, skillsSW]);
delete skills.Knowledge; // Delete Knowledge
addToStarWars(["Astrocartography", "Computers", "Driving", "Gunnery", "Melee", "Piloting", "RangedHeavy", "RangedLight"], skills);

// Patch Archetypes
addToStarWars(["Bioroid", "Clone", "Robot", "Vanguard", "AnimalisticAlien"], archetypes);

// Patch Careers
addToStarWars(["Hacker", "FighterPilot", "StarshipCaptain"], careers);

// Patcher
function addToStarWars(items, obj){
    for (let index = 0; index < items.length; index++) {
        const key = items[index];
        obj[key].setting.push(StarWarsName);
    }
}