import React from 'react';

export const archetype = null;
export const archetypeSpecialSkills = {};
export const career = null;
export const careerSkillsRank = [];
export const creationCharacteristics = {
    Brawn: 0,
    Agility: 0,
    Intellect: 0,
    Cunning: 0,
    Willpower: 0,
    Presence: 0
};
export const critical = [];
export const currentWound = 0;
export const currentStrain = 0;
export const description = {
    name: 'New Character',
    playerName: 'Enter Player Name',
    discordPlayerId: '',
    discordChannelId: ''
};
export const earnedXP = 0;
export const equipmentArmor = {};
export const equipmentGear = {};
export const equipmentWeapons = {};
export const masterMotivations = { Desire: {}, Fear: {}, Strength: {}, Flaw: {} };
export const masterSkills = {};
export const masterTalents = { 1: { 1: '' } };
export const misc = null;
export const money = 0;
export const setting = ['All'];
export const strict = false;
export const talentModifiers = {Dedication: {},};
export const theme = 'CRB';
export const themes = {CRB: 'Core Rule Book', ROT: 'Realms of Terrinoth', SOTB: 'Shadow of the Beanstalk'};

export const printContent = (
    <h1 className="text-left m-3" style={{ whiteSpace: 'pre-line' }}>
        {`You savage. I made print button and you dare to use the print function in the browser?!?!\n
    For better results use the aforementioned print button.  It's located on the top-right of the characters tab.\n
    Can't I just hijack the print function and do it automatically, you ask?\n
    PROBABLY!\n\n
    -Sky`}
    </h1>
);

export const additionalDices = {
    y: 0,
    g: 0,
    b: 0,
    k: 0,
    r: 0,
    p: 0,
    w: 0
};

/*
{ displayName: 'Yellow/Proficiency', code: 'y', category: 'positive' },
{ displayName: 'Green/Ability', code: 'g', category: 'positive' },
{ displayName: 'Blue/Boost', code: 'b', category: 'positive' },
{ displayName: 'Black/Setback', code: 'k', category: 'negative' },
{ displayName: 'Red/Challenge', code: 'r', category: 'negative' },
{ displayName: 'Purple/Difficulty', code: 'p', category: 'negative' },
{ displayName: 'White/Force', code: 'w', category: 'force' }
*/
