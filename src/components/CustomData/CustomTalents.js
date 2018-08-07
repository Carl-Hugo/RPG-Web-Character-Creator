import {omit} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData, changeData} from '../../actions';
import {Fragment} from './';

const clone = require('clone');

const modifiableAttributes = ['woundThreshold', 'strainThreshold', 'soak', 'meleeDefense', 'rangedDefense', 'defense', 'careerSkills'];

class CustomTalentsComponent extends React.Component {
	state = {
		name: '',
		tier: '',
		activation: '',
		turn: '',
		ranked: '',
		description: '',
		setting: [],
		modifier: false,
		modifierValue: '',
		prerequisite: '',
		antirequisite: '',
		mode: 'add'
	};

	initState = () => {
		this.setState({
			name: '',
			tier: '',
			activation: '',
			turn: '',
			ranked: '',
			description: '',
			setting: [],
			modifier: false,
			modifierValue: '',
			prerequisite: '',
			antirequisite: '',
			mode: 'add'
		});
	};

	handleChange = (event) => {
		let value = event.target.value;
		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (event.target.name === 'tier') value = +value;
		if (modifiableAttributes.includes(this.state.modifier) && event.target.name === 'modifierValue') value = +value;
		this.setState({[event.target.name]: value});
		if (event.target.name === 'modifier') this.setState({modifierValue: ''});
		event.preventDefault();
	};

	handleCareerSkill = (event) => {
		const {modifierValue} = this.state;
		let arr = [];
		if (Array.isArray(modifierValue)) arr = [...modifierValue];
		arr.push(event.target.value);
		this.setState({modifierValue: arr});
		event.preventDefault();

	};

	handleSubmit = () => {
		const {name, modifier, modifierValue} = this.state;
		const {customTalents, changeCustomData} = this.props;
		let Obj = clone(customTalents);
		let key = name.replace(/\s/g, '').replace(/[{()}]/g, '');
		Obj[key] = {};
		['name', 'tier', 'activation', 'turn', 'ranked', 'description', 'setting', 'prerequisite', 'antirequisite'].forEach(stat => {
			if (this.state[stat] !== '') Obj[key][stat] = this.state[stat];
		});
		if (modifier) Obj[key].modifier = {[modifier]: modifierValue};
		changeCustomData(Obj, 'customTalents', false);
		this.initState();
	};

	handleDelete = (event) => {
		const {customTalents, changeCustomData} = this.props;
		changeCustomData(omit(customTalents, event.target.name), 'customTalents', false);
		event.preventDefault();
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleEdit = (event) => {
		const {customTalents} = this.props;
		const talent = customTalents[event.target.name];
		this.setState({
			name: talent.name ? talent.name : '',
			tier: talent.tier ? talent.tier : '',
			activation: talent.activation ? talent.activation : '',
			turn: talent.turn ? talent.turn : '',
			ranked: talent.ranked ? talent.ranked : '',
			description: talent.description ? talent.description : '',
			setting: typeof talent.setting === 'string' ? talent.setting.split(', ') : talent.setting,
			prerequisite: talent.prerequisite ? talent.prerequisite : '',
			antirequisite: talent.antirequisite ? talent.antirequisite : '',
			modifier: talent.modifier ? Object.keys(talent.modifier)[0] : false,
			modifierValue: talent.modifier ? Object.values(talent.modifier)[0] : '',
			mode: 'edit'
		});
	};

	render() {
		const {customTalents, skills, talents} = this.props;
		const {name, tier, ranked, activation, turn, description, setting, modifier, modifierValue, prerequisite, antirequisite, mode} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} mode={mode} handleChange={this.handleChange}/>
				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Tier:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={tier} name='tier'
							   onChange={this.handleChange}>
							{['', 1, 2, 3, 4, 5].map(number =>
								<option key={number} value={number}>{number}</option>
							)}
						</Input>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Activation:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={activation} name='activation'
							   onChange={this.handleChange}>
							<option value=''/>
							<option value={true}>Active</option>
							<option value={false}>Passive</option>
						</Input>
					</Col>
				</Row>
				{activation &&
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Slot:</b>
					</Col>
					<Col>
						<Input className='my-auto' type='text' value={turn} name='turn' maxLength='25'
							   onChange={this.handleChange}/>
					</Col>
				</Row>
				}
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Ranked:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={ranked} name='ranked'
							   onChange={this.handleChange}>
							<option value=''/>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</Input>
					</Col>
				</Row>
				<Fragment type='description' value={description} handleChange={this.handleChange}/>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Prerequisite Talent:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={prerequisite} name='prerequisite'
							   onChange={this.handleChange}>
							<option value=''>None</option>
							{Object.keys(talents).map(talentKey =>
								<option key={talentKey} value={talentKey}>{talents[talentKey].name}</option>
							)}
						</Input>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Antirequisite Talent:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={antirequisite} name='antirequisite'
							   onChange={this.handleChange}>
							<option value=''>None</option>
							{Object.keys(talents).map(talentKey =>
								<option key={talentKey} value={talentKey}>{talents[talentKey].name}</option>
							)}
						</Input>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Modifier:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={modifier} name='modifier'
							   onChange={this.handleChange}>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</Input>
					</Col>
				</Row>
				{modifier &&
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Attribute:</b>
					</Col>
					<Col>
						<Input type='select' className='my-auto' value={modifier} name='modifier'
							   onChange={this.handleChange}>
							<option value=''/>
							<option value='careerSkills'>Career Skills</option>
							<option value='defense'>Defense</option>
							<option value='meleeDefense'>Melee Defense</option>
							<option value='strainThreshold'>Strain Threshold</option>
							<option value='soak'>Soak</option>
							<option value='rangedDefense'>Ranged Defense</option>
							<option value='woundThreshold'>Wound Threshold</option>
							{Object.keys(skills).sort().map(key =>
								<option key={key} value={key}>{skills[key].name}</option>
							)}
						</Input>
					</Col>
				</Row>
				}
				{(modifiableAttributes.includes(modifier) || Object.keys(skills).includes(modifier)) &&
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'>
						<b>Modifier Value:</b>
					</Col>
					<Col>
						{modifier === 'careerSkills' ?
							<div>
								<Input type='select' className='my-auto' value='' name='modifierValue'
									   onChange={this.handleCareerSkill}>
									<option value=''/>
									{Object.keys(skills).filter(skill => !modifierValue.includes(skill)).sort().map(skillKey =>
										<option key={skillKey} value={skillKey}>{skills[skillKey].name}</option>
									)}
								</Input>
							</div>
							: (modifiableAttributes.includes(modifier) ?
									<Input type='number' className='my-auto' value={modifierValue}
										   name='modifierValue'
										   maxLength='25'
										   onChange={this.handleChange}>
									</Input>
									:
									<Input type='select' className='my-auto' value={modifierValue}
										   name='modifierValue'
										   onChange={this.handleChange}>
										<option value=''/>
										<option value='[blue]'>Bonus Die</option>
										<option value='[black]'>Setback Die</option>
										<option value='[success]'>Success</option>
										<option value='[advantage]'>Advantage</option>
									</Input>
							)
						}
					</Col>
				</Row>
				}
				{Array.isArray(modifierValue) &&
				<Row>
					<Col sm='4'>
						<Button onClick={() => this.setState({modifierValue: []})}>Clear</Button>
					</Col>
					<Col>
						{modifierValue.map(skill => skills[skill] ? skills[skill].name : skill).sort().join(', ')}
					</Col>
				</Row>
				}
				<hr/>
				<ControlButtonSet
					mode={this.state.mode}
					type={'Talent'}
					handleSubmit={this.handleSubmit}
					onEditSubmit={this.handleSubmit}
					onEditCancel={this.initState}
					disabled={name === '' || tier === '' || ranked === '' || activation === ''}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th>TIER</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{customTalents &&
					Object.keys(customTalents).map(key =>
						<tr key={key}>
							<td>{customTalents[key].name}</td>
							<td>{customTalents[key].tier}</td>
							<td><Button name={key} onClick={this.handleEdit}>Edit</Button></td>
							<td><DeleteButton name={key} onClick={this.handleDelete}/></td>
						</tr>
					)
					}
					</tbody>
				</Table>
			</div>
		)
			;
	}
}

function mapStateToProps(state) {
	return {
		customTalents: state.customTalents,
		talents: state.talents,
		skills: state.skills,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeCustomData, changeData}, dispatch);
}

export const CustomTalents = connect(mapStateToProps, matchDispatchToProps)(CustomTalentsComponent);
