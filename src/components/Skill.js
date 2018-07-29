import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { CustomSkills, SkillBlock, AdditionalDice } from './index';

class SkillComponent extends React.Component {
    state = { modal: false };
    dices = [
        { code: 'y', category: 'positive' },
        { code: 'g', category: 'positive' },
        { code: 'b', category: 'positive' },
        { code: 'k', category: 'negative' },
        { code: 'r', category: 'negative' },
        { code: 'p', category: 'negative' },
        { code: 'w', category: 'force' }
    ];

    render() {
        return (
            <div className="w-100">
                <Row className="justify-content-end">
                    <h5>DICES</h5>
                </Row>
                <hr />
                <Row>
                    <Col>{this.dices.filter(dice => dice.category == 'positive').map((dice, index) => <AdditionalDice diceCode={dice.code} />)}</Col>
                    <Col>{this.dices.filter(dice => dice.category == 'negative').map((dice, index) => <AdditionalDice diceCode={dice.code} />)}</Col>
                </Row>
                <Row>
                    <Col>{this.dices.filter(dice => dice.category == 'force').map((dice, index) => <AdditionalDice diceCode={dice.code} />)}</Col>
                    <Col />
                </Row>
                <Row className="justify-content-end">
                    <h5>SKILLS</h5>{' '}
                    <Button color="link" className="noUnderLine p-0 mt-1" onClick={() => this.setState({ modal: true })}>
                        ⚙
                    </Button>
                </Row>
                <hr />
                <Row>
                    <Col>{['General', 'Magic'].map((type, index) => <SkillBlock key={type} type={type} index={index} />)}</Col>
                    <Col>{['Combat', 'Social', 'Knowledge'].map((type, index) => <SkillBlock key={type} type={type} index={index} />)}</Col>
                </Row>

                <CustomSkills modal={this.state.modal} handleClose={() => this.setState({ modal: false })} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills
    };
}

export const Skill = connect(mapStateToProps)(SkillComponent);
