import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Table} from 'reactstrap';
import {changeData} from '../actions';
import {Description} from "./index";
import {gearDice, skillDice} from "../reducers";

class CarriedGear extends React.Component {

    getLabel = (type, block, key) => {
        const {equipmentArmor, equipmentWeapons, equipmentGear, weapons, armor, gear, skills, qualities, gearDice} = this.props;
        let data, equipment;
        if (type === 'equipmentWeapons') {
            equipment = {...equipmentWeapons};
            data = {...weapons};
        }
        if (type === 'equipmentArmor') {
            equipment = {...equipmentArmor};
            data = {...armor};
        }
        if (type === 'equipmentGear') {
            equipment = {...equipmentGear};
            data = {...gear};
        }
        let item = data[equipment[key].id];
        if (!item && block !== 'deleteButton') return <td key={type + key + block}>MissingData</td>;
        switch (block) {
            case 'name':
            case 'damage':
            case 'critical':
            case 'range':
            case 'encumbrance':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
            case 'amount':
                return (
                    <td key={type + key + block}>
                        {item[block]}
                    </td>
                );
            case 'skill':
                return (
                    <td key={type + key + block}>
                        {item.skill ? (skills[item.skill] ? skills[item.skill].name : '') : ''}
                    </td>
                );
            case 'qualities':
                return (
                    <td key={type + key + block}>
                        {item[block] && Object.keys(item[block]).map(quality => `${qualities[quality].name} ${item[block][quality]}`).sort().join(', ')}
                    </td>
                );
            case 'gearDice':
                return (
                    <td key={type + key + block}>
                        <Description text={gearDice.weapons[key]}/>
                    </td>
                );
            default:
                return <td key={type + key}/>;
        }
    };

    render() {
        const {equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>CARRIED GEAR</h5></Row>
                <hr/>
                {Object.keys(equipmentWeapons).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Weapons:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DAM</th>
                            <th>CRIT</th>
                            <th>RANGE</th>
                            <th>SKILL</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                            <th>DICE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentWeapons).map(key =>
                            equipmentWeapons[key].carried &&
                            <tr key={key}>
                                {['name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'qualities', 'gearDice'].map(block =>
                                    this.getLabel('equipmentWeapons', block, key)
                                )}
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                }
                {Object.keys(equipmentArmor).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Armor:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>SOAK</th>
                            <th>DEF</th>
                            <th>RANGED DEF</th>
                            <th>MELEE DEF</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentArmor).map(key =>
                            equipmentArmor[key].carried &&
                            <tr key={key}>
                                {['name', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'qualities'].map(block =>
                                    this.getLabel('equipmentArmor', block, key)
                                )}
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                }
                {Object.keys(equipmentGear).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Gear:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>AMOUNT</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentGear).map((key) =>
                            equipmentGear[key].carried &&
                            <tr key={key}>
                                {['name', 'amount', 'encumbrance', 'qualities'].map(block =>
                                    this.getLabel('equipmentGear', block, key)
                                )}
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        gear: state.gear,
        gearDice: gearDice(state),
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
        equipmentArmor: state.equipmentArmor,
        equipmentGear: state.equipmentGear,
        equipmentWeapons: state.equipmentWeapons,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CarriedGear);