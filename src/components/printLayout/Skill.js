import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {SkillBlock} from './index';

class Skill extends React.Component {

    render() {
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>SKILLS</h5></Row>
                <hr/>
                <Row>
                    <Col>
                        {['General', 'Magic'].map((type) =>
                            <SkillBlock key={type}
                                        type={type}/>
                        )}
                    </Col>
                    <Col>
                        {['Combat', 'Social', 'Knowledge'].map((type) =>
                            <SkillBlock key={type}
                                        type={type}/>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills,
    };
}

export default connect(mapStateToProps)(Skill);