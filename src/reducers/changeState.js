import * as initialState from './initialState';

export const user = (state = null, action) =>{
  if (action.type === 'User_Changed') {
    return action.payload;
  }
  return state;
};

export const characterList = (state = null, action) =>{
    if (action.type === 'characterList_Changed') {
        return action.payload;
    }
    return state;
};

export const character = (state = null, action) =>{

    if (action.type === 'character_Changed') {
        return action.payload;
    }
    return state;
};


export const archetype = (state = null, action) => {
  if (action.type === 'archetype_Changed') {
    return action.payload;
  }
  return state;
};

export const archetypeSpecialSkills = (state = {}, action) =>{
    if (action.type === 'archetypeSpecialSkills_Changed' && action.payload!==null) return action.payload;
    return state;
};

export const career = (state = null, action) =>{
  if (action.type === 'career_Changed') return action.payload;
  return state;
};

export const careerSkills = (state = [], action) =>{
  if (action.type === 'careerSkills_Changed' && action.payload!==null)
    return action.payload;

  return state;
};

export const masterSkills = (state = initialState.masterSkills, action) =>{
  if (action.type === 'masterSkills_Changed' && action.payload!==null) return action.payload;
  return state;
};

export const masterTalents = (state = {...initialState.masterTalents}, action) =>{
  if (action.type === 'masterTalents_Changed' && action.payload!==null) return action.payload;
  return state;
};

export const masterMotivations = (state = {...initialState.masterMotivations}, action) =>{
  if (action.type === 'masterMotivations_Changed' && action.payload!==null) return {...state, ...action.payload};
  return state;
};

export const creationCharacteristics = (state = {...initialState.creationCharacteristics}, action) =>{
  if (action.type === 'creationCharacteristics_Changed' && action.payload!==null) return action.payload;
  return state;
};

export const talentModifiers = (state = initialState.talentModifiers, action) =>{
  if (action.type === 'talentModifiers_Changed' && action.payload!==null) return action.payload;
  return state;
};

export const currentWound = (state = 0, action) =>{
    if (action.type === 'currentWound_Changed' && action.payload!==null) return action.payload;
    return state;
};

export const currentStrain = (state = 0, action) =>{
    if (action.type === 'currentStrain_Changed' && action.payload!==null) return action.payload;
    return state;
};

export const critical = (state = [], action) =>{
    if (action.type === 'critical_Changed' && action.payload!==null) {
        action.payload.sort((a, b) =>  a - b);
        return action.payload;
    }
    return state;
};

export const description = (state = initialState.description, action) =>{
    if (action.type === 'description_Changed' && action.payload!==null) return action.payload;
    return state;
};