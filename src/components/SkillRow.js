import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeData } from '../actions';
import { archetypeSkillRank, careerCheck, skillDice, skillRanks } from '../selectors';
import { Description } from './index';
import { bot } from '../bot/index';
import { Button } from 'reactstrap';

class SkillRowComponent extends React.Component {
    handleRankChange = event => {
        const { masterSkills, skillKey, changeData, careerSkillsRank, archetypeSkillRank, careerCheck } = this.props;
        let newObj = { ...masterSkills };
        let rankType = careerCheck[skillKey] ? 'careerRank' : 'rank';
        if (!newObj[skillKey]) newObj[skillKey] = {};
        newObj[skillKey][rankType] =
            +event.target.value -
            (careerSkillsRank.includes(skillKey) ? 1 : 0) -
            (archetypeSkillRank[skillKey] ? archetypeSkillRank[skillKey].rank : 0) -
            (careerCheck[skillKey] && (masterSkills[skillKey] ? masterSkills[skillKey].rank > 0 : false) ? careerCheck[skillKey] : 0);
        changeData(newObj, 'masterSkills');
    };

    rollDices = (event, additionalDices) => {
        const skill = event.target.getAttribute('skill');
        const shortAttribute = event.target.getAttribute('short-attribute');
        const skillDices = event.target.getAttribute('dices');
        bot.rollSkill(this.props.description.discordPlayerId, this.props.description.discordChannelId, this.props.description.playerName, skill, shortAttribute, skillDices, additionalDices);
    };

    shortCharacteristics = () => {
        const { skillKey, skills } = this.props;
        switch (skills[skillKey].characteristic) {
            case 'Agility':
                return 'AG';
            case 'Brawn':
                return 'BR';
            case 'Intellect':
                return 'INT';
            case 'Cunning':
                return 'CUN';
            case 'Willpower':
                return 'WILL';
            case 'Presence':
                return 'PR';
            default:
                return '';
        }
    };

	render() {
		const {archetype, career, masterSkills, skills, skillKey, careerSkillsRank, skillDice, skillRanks, archetypeSkillRank, careerCheck} = this.props;
		const skill = skills[skillKey];
		let ranks = [0, 1, 2, 3, 4, 5];
		if (careerSkillsRank.includes(skillKey)) ranks.shift();
		if (archetypeSkillRank[skillKey]) {
			for (let i = 0; archetypeSkillRank[skillKey].rank > i; i++) {
				ranks.shift();
			}
		}
		return (
			<tr className={masterSkills[skillKey] ? (masterSkills[skillKey].hide ? 'row-hide' : '') : ''}>
				<td className='table-name'>
					{`${skill.name} (${this.shortCharacteristics()})`}
				</td>
				<td className='table-career'>
					{!!careerCheck[skillKey] ? '✓' : ''}
				</td>
				<td className='table-rank'>
					<Input type='select' bsSize='sm' disabled={!archetype || !career} value={skillRanks[skillKey]}
						   onChange={this.handleRankChange} className='p-0 m-0'>
						{ranks.map((key) => <option key={key} value={key}>{key}</option>)}
					</Input>
				</td>
				<td className='table-dice'>
					<Description text={skillDice[skillKey]}/>
                </td>
                <td>
                    <Button
                        type="button"
                        onClick={event => this.rollDices(event, this.props.additionalDices)}
                        dices={diceToBotRoll(skillDice[skillKey])}
                        skill={skill.name}
                        short-attribute={this.shortCharacteristics()}
                    >
                        Roll
                    </Button>
                </td>
			</tr>
		)
	}
}

const tags = [{ full: '[yellow]', abbr: 'y' }, { full: '[green]', abbr: 'g' }, { full: ' ', abbr: '' }];
function diceToBotRoll(input) {
    let result = input;
    tags.forEach(tag => {
        do {
            result = result.replace(tag.full, tag.abbr);
        } while (result.indexOf(tag.full) > -1);
    });
    return result;
}

const mapStateToProps = state => {
    return {
        archetype: state.archetype,
        masterSkills: state.masterSkills,
        skills: state.skills,
        careerSkillsRank: state.careerSkillsRank,
        career: state.career,
        careers: state.careers,
        skillDice: skillDice(state),
        skillRanks: skillRanks(state),
        archetypeSkillRank: archetypeSkillRank(state),
        careerCheck: careerCheck(state),
        description: state.description,
        additionalDices: state.additionalDices
    };
}

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const SkillRow = connect(
    mapStateToProps,
    matchDispatchToProps
)(SkillRowComponent);
