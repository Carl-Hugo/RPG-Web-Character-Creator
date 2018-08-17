import React from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { changeData } from '../actions';
const clone = require('clone');

class AdditionalDiceComponent extends React.Component {
    state = { additionalDices: this.props.additionalDices };
    dices = [
        { displayName: 'Yellow/Proficiency', code: 'y' },
        { displayName: 'Green/Ability', code: 'g' },
        { displayName: 'Blue/Boost', code: 'b' },
        { displayName: 'Black/Setback', code: 'k' },
        { displayName: 'Red/Challenge', code: 'r' },
        { displayName: 'Purple/Difficulty', code: 'p' },
        { displayName: 'White/Force', code: 'w' }
    ];

    handleChange = event => {
        let obj = clone(this.state.additionalDices);
        obj[event.target.name] = parseInt(event.target.value, 10);
        this.setState({ additionalDices: obj });
        event.preventDefault();
    };

    handleBlur = event => {
        const { changeData, additionalDices } = this.props;
        let obj = clone(additionalDices);
        obj[event.target.name] = this.state.additionalDices[event.target.name];
        changeData(obj, 'additionalDices');
        event.preventDefault();
    };

    render() {
        const { diceCode } = this.props;
        const label = this.dices.filter(d => d.code === diceCode)[0].displayName;
        return (
            <Row>
                <Col>{label}: </Col>
                <Col>
                    <Input value={this.state.additionalDices[diceCode]} name={diceCode} onBlur={this.handleBlur} onChange={this.handleChange} type="number" step="1" />
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        additionalDices: state.additionalDices
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ changeData }, dispatch);
}

export const AdditionalDice = connect(
    mapStateToProps,
    matchDispatchToProps
)(AdditionalDiceComponent);
