import clone from 'clone';
import merge from 'deepmerge';
import {omit, upperFirst} from 'lodash-es';
import * as data from '../data';
import * as initialState from './initialState';

//loading objects
const loadingReducer = (state, action, type) => {
	if (action.type === `${type}_Changed`) return action.payload;
	return state;
};

export const user = (state = null, action) => loadingReducer(state, action, 'User');
export const character = (state = null, action) => loadingReducer(state, action, 'character');
export const vehicle = (state = '', action) => loadingReducer(state, action, 'vehicle');
export const loadingData = (state = true, action) => loadingReducer(state, action, 'loadingData');
export const loadingCustomData = (state = true, action) => loadingReducer(state, action, 'loadingCustomData');
export const characterList = (state = null, action) => loadingReducer(state, action, 'characterList');
export const printContent = (state = initialState.printContent, action) => loadingReducer(state, action, 'printContent');

export const vehicleList = (state = {}, action) => {
	if (action.type === `vehicleList_Modified`) return merge(state, action.payload);
	if (action.type === `vehicleList_Removed`) return omit(state, action.payload);
	return state;
};


//character objects
const dataReducer = (state, action, type) => {
	if (action.type === `${type}_Changed`) {
		if (action.payload) return action.payload;
		else return clone(initialState[type]);
	}
	return state;
};

export const archetype = (state = clone(initialState.archetype), action) => dataReducer(state, action, 'archetype');
export const archetypeSpecialSkills = (state = clone(initialState.archetypeSpecialSkills), action) => dataReducer(state, action, 'archetypeSpecialSkills');
export const career = (state = clone(initialState.career), action) => dataReducer(state, action, 'career');
export const careerSkillsRank = (state = clone(initialState.careerSkillsRank), action) => dataReducer(state, action, 'careerSkillsRank');
export const creationCharacteristics = (state = clone(initialState.creationCharacteristics), action) => dataReducer(state, action, 'creationCharacteristics');
export const critical = (state = clone(initialState.critical), action) => dataReducer(state, {
	type: action.type,
	payload: Array.isArray(action.payload) ? action.payload.sort((a, b) => a - b) : null
}, 'critical');
export const currentHullTrauma = (state = initialState.currentHullTrauma, action) => dataReducer(state, action, 'currentHullTrauma');
export const currentSystemStrain = (state = initialState.currentSystemStrain, action) => dataReducer(state, action, 'currentSystemStrain');
export const currentStrain = (state = initialState.currentStrain, action) => dataReducer(state, action, 'currentStrain');
export const currentWound = (state = initialState.currentWound, action) => dataReducer(state, action, 'currentWound');
export const description = (state = clone(initialState.description), action) => dataReducer(state, action, 'description');
export const earnedXP = (state = initialState.earnedXP, action) => dataReducer(state, action, 'earnedXP');
export const equipmentArmor = (state = clone(initialState.equipmentArmor), action) => dataReducer(state, action, 'equipmentArmor');
export const equipmentGear = (state = clone(initialState.equipmentGear), action) => dataReducer(state, action, 'equipmentGear');
export const equipmentWeapons = (state = clone(initialState.equipmentWeapons), action) => dataReducer(state, action, 'equipmentWeapons');
export const masterMotivations = (state = clone(initialState.masterMotivations), action) => dataReducer(state, action, 'masterMotivations');
export const masterSkills = (state = clone(initialState.masterSkills), action) => dataReducer(state, action, 'masterSkills');
export const masterTalents = (state = clone(initialState.masterTalents), action) => dataReducer(state, action, 'masterTalents');
export const misc = (state = clone(initialState.misc), action) => dataReducer(state, action, 'misc');
export const money = (state = initialState.money, action) => dataReducer(state, action, 'money');
export const setting = (state = clone(initialState.setting), action) => dataReducer(state, action, 'setting');
export const strict = (state = initialState.strict, action) => dataReducer(state, action, 'strict');
export const talentModifiers = (state = clone(initialState.talentModifiers), action) => dataReducer(state, action, 'talentModifiers');
export const theme = (state = clone(initialState.theme), action) => dataReducer(state, action, 'theme');
export const themes = (state = clone(initialState.themes), action) => dataReducer(state, action, 'themes');
export const vehicleNotes = (state = clone(initialState.vehicleNotes), action) => dataReducer(state, action, 'vehicleNotes');
export const vehicleType = (state = clone(initialState.vehicleType), action) => dataReducer(state, action, 'vehicleType');
export const vehicleWrite = (state = clone(initialState.vehicleWrite), action) => dataReducer(state, action, 'vehicleWrite');

export const additionalDices = (state = clone(initialState.additionalDices), action) => dataReducer(state, action, 'additionalDices');

//database objects
const databaseReducer = (state, action, type) => {
	if (action.type === `custom${upperFirst(type)}_Changed`) {
		let obj = data[type];
		if (action.payload) obj = merge(data[type], action.payload);
		if (action.setting && action.setting.length > 0 && !action.setting.includes('All') && type !== 'settings') {
			let filter = {};
			Object.keys(obj).forEach(key => {
				if (obj[key].setting) {
					if (action.strict) {
						if (action.setting.some(setting => obj[key].setting.includes(setting))) filter[key] = clone(obj[key]);
					}
					else {
						if (obj[key].setting.includes('All') || action.setting.some(setting => obj[key].setting.includes(setting))) filter[key] = clone(obj[key]);
					}
				} else filter[key] = clone(obj[key]);
			});
			return filter;
		}
		else return obj;
	}
	return state;
};

export const archetypes = (state = data.archetypes, action) => databaseReducer(state, action, 'archetypes');
export const archetypeTalents = (state = data.archetypeTalents, action) => databaseReducer(state, action, 'archetypeTalents');
export const armor = (state = data.armor, action) => databaseReducer(state, action, 'armor');
export const careers = (state = data.careers, action) => databaseReducer(state, action, 'careers');
export const craftsmanship = (state = data.craftsmanship, action) => databaseReducer(state, action, 'craftsmanship');
export const gear = (state = data.gear, action) => databaseReducer(state, action, 'gear');
export const motivations = (state = data.motivations, action) => databaseReducer(state, action, 'motivations');
export const settings = (state = data.settings, action) => databaseReducer(state, action, 'settings');
export const skills = (state = data.skills, action) => databaseReducer(state, action, 'skills');
export const qualities = (state = data.qualities, action) => databaseReducer(state, action, 'qualities');
export const talents = (state = data.talents, action) => databaseReducer(state, action, 'talents');
export const weapons = (state = data.weapons, action) => databaseReducer(state, action, 'weapons');
export const vehicles = (state = data.vehicles, action) => databaseReducer(state, action, 'vehicles');

//custom data objects
const customDataReducer = (state, action, type) => {
    if (action.type === `${type}_Changed`) {
        if (action.payload) return action.payload;
        else return {};
    }
    return state;
};

export const customArchetypes = (state = {}, action) => customDataReducer(state, action, 'customArchetypes');
export const customArchetypeTalents = (state = {}, action) => customDataReducer(state, action, 'customArchetypeTalents');
export const customArmor = (state = {}, action) => customDataReducer(state, action, 'customArmor');
export const customCareers = (state = {}, action) => customDataReducer(state, action, 'customCareers');
export const customGear = (state = {}, action) => customDataReducer(state, action, 'customGear');
export const customSettings = (state = {}, action) => customDataReducer(state, action, 'customSettings');
export const customSkills = (state = {}, action) => customDataReducer(state, action, 'customSkills');
export const customMotivations = (state = {}, action) => customDataReducer(state, action, 'customMotivations');
export const customTalents = (state = {}, action) => customDataReducer(state, action, 'customTalents');
export const customWeapons = (state = {}, action) => customDataReducer(state, action, 'customWeapons');
