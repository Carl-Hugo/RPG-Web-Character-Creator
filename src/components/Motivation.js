import React from 'react';
import { Row } from 'reactstrap';
import { MotivationBlock } from './index';

export const Motivation = () => {
    return (
        <div className="w-100">
            <Row className="justify-content-end">
                <h5>MOTIVATIONS</h5>
            </Row>
            <hr />
            <Row className="justify-content-center">{['Strength', 'Flaw', 'Desire', 'Fear', 'Duty', 'Duty2'].map(type => <MotivationBlock key={type} type={type} />)}</Row>
        </div>
    );
};
