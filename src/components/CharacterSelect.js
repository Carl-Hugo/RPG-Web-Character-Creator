import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, InputGroupAddon, Label, Row, UncontrolledTooltip} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addCharacter, changeCharacter, changeCharacterName, changeData, deleteCharacter, loadData} from '../actions';
import {Archetype, Career, ModalDeleteConfirm} from './';

class CharacterSelectComponent extends React.Component {
	state = {
		name: this.props.characterList ? this.props.characterList[this.props.character] : '',
		playerName: this.props.description.playerName,
		setting: this.props.setting,
		archetypeModal: false,
		careerModal: false,
		deleteModal: false,
		discordPlayerId: this.props.description.discordPlayerId,
        discordChannelId: this.props.description.discordChannelId,
	};

    componentWillReceiveProps(nextProps) {
        this.setState({ playerName: nextProps.description.playerName });
        this.setState({ setting: nextProps.setting });
        if (this.props.characterList)
            this.setState({
                name: this.props.characterList[nextProps.character]
            });
        if (nextProps.characterList)
            this.setState({
                name: nextProps.characterList[nextProps.character]
            });
        this.setState({ discordPlayerId: nextProps.description.discordPlayerId });
        this.setState({ discordChannelId: nextProps.description.discordChannelId });
    }

    handleSelect = event => {
        const { changeCharacter, loadData } = this.props;
        changeCharacter(event.target.value);
        loadData();
        event.preventDefault();
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
    };

    handleBlur = event => {
        const { changeData, description } = this.props;
        let type = event.target.name;
        let newObj = { ...description };
        newObj[type] = this.state[type];
        changeData(newObj, 'description');
        event.preventDefault();
    };

    confirmedDelete = event => {
        this.props.deleteCharacter();
        this.setState({ deleteModal: false });
        event.preventDefault();
    };

	render() {
		const {archetype, archetypes, careers, career, characterList, character, changeData, settings, strict, theme} = this.props;
		const {name, playerName, archetypeModal, careerModal, deleteModal, setting, discordPlayerId, discordChannelId} = this.state;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>CHARACTER</div>
				</Row>
				<hr/>
				<Row className='align-items-center justify-content-between'>
					<Col>
						<Input type='select' bsSize='sm' value={character} onChange={this.handleSelect}>
							{characterList &&
							Object.keys(characterList).sort((a, b) => characterList[a] < characterList[b] ? -1 : (characterList[a] > characterList[b] ? 1 : 0)).map(key =>
								<option value={key}
										key={key}>{characterList[key]}</option>
							)}
						</Input>
					</Col>
					<Col>
						<InputGroupAddon addonType='append' className='justify-content-end'>
							<ButtonGroup>
								<Button onClick={() => this.props.addCharacter()}>New</Button>
								<Button onClick={() => this.setState({deleteModal: true})}>Delete</Button>
							</ButtonGroup>
						</InputGroupAddon>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Label for='characterName' sm={4}><b>CHARACTER NAME</b></Label>
					<Col className='m-auto' id='characterName'>
						<Input type='text' bsSize='sm' value={name ? name : ''} maxLength='50' name='name'
							   onChange={this.handleChange}
							   onBlur={() => this.props.changeCharacterName(name)}/>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center justify-content-between'>
					<Label for='archetype' sm={4}><b>ARCHETYPE</b></Label>
					<Col id='archetype'>
						{archetype && archetypes[archetype] ? archetypes[archetype].name : 'Missing Archetype Data'}
					</Col>
					<Col className='text-right'>
						<Button name='archetype' onClick={() => this.setState({archetypeModal: true})}>Select</Button>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center justify-content-between'>
					<Label for='career' sm='4'><b>CAREER</b></Label>
					<Col id='career'>
						{career && careers[career] ? careers[career].name : 'Missing Career Data'}
					</Col>
					<Col className='text-right'>
						<Button name='career' onClick={() => this.setState({careerModal: true})}>Select</Button>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Label for='setting' sm='4'><b>SETTING</b></Label>
					<Col id='setting'>
						<Typeahead
							multiple={true}
							options={Object.values(settings)}
							name='setting'
							selected={setting}
							placeholder="Choose a Setting..."
							clearButton={true}
							onChange={(selected) => this.setState({setting: selected.includes('All') ? ['All'] : selected})}
							onBlur={() => changeData(setting, 'setting', false)}/>
					</Col>
					<Col>
						<Input type='checkbox' id='strict' checked={strict} onChange={() => changeData(!strict, 'strict')}/> <Label for='strict'><b
						id='tooltip'>Strict</b></Label>
						<UncontrolledTooltip target='tooltip' placement='right'>
							When Strict is checked, only data items that have the current setting listed will be displayed. 'All' and blank
							settings
							will be ignored.
						</UncontrolledTooltip>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4'>
						<b>PLAYER NAME</b>
					</Col>
					<Col className='m-auto'>
						<Input type='text' bsSize='sm' value={playerName} maxLength='25' name='playerName'
							   onChange={this.handleChange}
							   onBlur={this.handleBlur}/>
					</Col>
				</Row>
				<hr />
                <Row className="justify-content-end">
                    <h5>DISCORD</h5>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Col sm="4">
                        <b>Player ID:</b>
                    </Col>
                    <Col className="m-auto">
                        <Input type="text" value={discordPlayerId} maxLength="25" name="discordPlayerId" onChange={this.handleChange} onBlur={this.handleBlur} />
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Col sm="4">
                        <b>Channel ID:</b>
                    </Col>
                    <Col className="m-auto">
                        <Input type="text" value={discordChannelId} maxLength="25" name="discordChannelId" onChange={this.handleChange} onBlur={this.handleBlur} />
                    </Col>
                </Row>
				<hr />
				<Archetype modal={archetypeModal} handleClose={() => this.setState({archetypeModal: false})}/>
				<Career modal={careerModal} handleClose={() => this.setState({careerModal: false})}/>
				<ModalDeleteConfirm deleteModal={deleteModal}
									confirmedDelete={this.confirmedDelete}
									handleClose={() => this.setState({deleteModal: false})}
									type='Character'/>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		archetype: state.archetype,
		archetypes: state.archetypes,
		career: state.career,
		careers: state.careers,
		character: state.character,
		characterList: state.characterList,
		description: state.description,
		setting: state.setting,
		strict: state.strict,
		user: state.user,
		settings: state.settings,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({
	changeData,
	addCharacter,
	changeCharacter,
	deleteCharacter,
	changeCharacterName,
	loadData,
}, dispatch);

export const CharacterSelect = connect(mapStateToProps, matchDispatchToProps)(CharacterSelectComponent);
