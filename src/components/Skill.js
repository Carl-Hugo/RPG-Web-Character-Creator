import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { SkillBlock, AdditionalDice } from './index';
import { bot } from '../bot/index';

class SkillComponent extends React.Component {
    state = { modal: false };
    dices = [
        { code: 'y', category: 'positive' },
        { code: 'g', category: 'positive' },
        { code: 'b', category: 'positive' },
        { code: 'r', category: 'negative' },
        { code: 'p', category: 'negative' },
        { code: 'k', category: 'negative' },
        { code: 'w', category: 'force' }
    ];

    rollDices = (event, additionalDices) => {
        bot.rollSkill(this.props.description.discordPlayerId, this.props.description.discordChannelId, this.props.description.playerName, 'Custom', false, '', additionalDices);
    };

    render() {
        return (
            <div className="w-100">
                <Row className="justify-content-end">
                    <h5>DICES</h5>
                </Row>
                <hr />
                <Row>
                    {this.dices.filter(dice => dice.category === 'positive').map((dice, index) => (
                        <Col>
                            <AdditionalDice diceCode={dice.code} />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {this.dices.filter(dice => dice.category === 'negative').map((dice, index) => (
                        <Col>
                            <AdditionalDice diceCode={dice.code} />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {this.dices.filter(dice => dice.category === 'force').map((dice, index) => (
                        <Col>
                            <AdditionalDice diceCode={dice.code} />
                        </Col>
                    ))}
                    <Col>
                        <Button type="button" onClick={event => this.rollDices(event, this.props.additionalDices)}>
                            Custom roll
                        </Button>
                    </Col>
                    <Col />
                </Row>
				<Row className='justify-content-end'><h5>SKILLS</h5></Row>
				<hr/>
				<Row>
					<Col>
						{['General', 'Magic'].map((type, index) =>
							<SkillBlock key={type}
										type={type}
										index={index}/>
						)}
					</Col>
					<Col>
						{['Combat', 'Social', 'Knowledge'].map((type, index) =>
							<SkillBlock key={type}
										type={type}
										index={index}/>
						)}
					</Col>
				</Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills,
        description: state.description,
        additionalDices: state.additionalDices
    };
}

export const Skill = connect(mapStateToProps)(SkillComponent);
