import React from 'react';
import {Button, Row} from 'reactstrap';

export const About = () => {
	return (
		<div className='d-print-none m-2, w-100'>
			<Row className='justify-content-center'>
				Created by&nbsp;<a href="https://github.com/SkyJedi" target="_blank"
								   rel="noopener noreferrer">SkyJedi</a>. Questions? Comments?&nbsp;
				<a href="mailto:info@genesysemporium.com?subject=Genesys%20Emporium%20Feedback" target="_blank"
				   rel="noopener noreferrer">Contact Me</a>.
			</Row>
			<Row className='justify-content-center'>
				<Button color='link' href="https://www.facebook.com/groups/242585076458814/" target="_blank"
						className='p-0 m-2'>Facebook Group</Button>
				<Button color='link' href="https://www.reddit.com/r/genesysrpg/" target="_blank"
						className='p-0 m-2'>Subreddit</Button>
				<Button color='link' href="http://discord.gg/3vNJa6t" target="_blank"
						className='p-0 m-2'>Discord</Button>
			</Row>
			<Row className='justify-content-center'>
				<Button color='link' href="https://paypal.me/SkyJedi" target="_blank"
						className='p-0 m-2'>Donate</Button>
				<Button color='link' href="https://patreon.com/SkyJedi" target="_blank"
						className='p-0 m-2'>Patreon</Button>
			</Row>
			<Row className='justify-content-center'>
				Contributions by Nick Holmstead.
			</Row>
			<Row className='justify-content-center'>
				Images by&nbsp;<a href="https://www.reddit.com/user/DrainSmith" target="_blank"
								  rel="noopener noreferrer">DrainSmith</a>.&nbsp;
			</Row>
			<Row className='justify-content-center'>
				A Character Creator for&nbsp;
				<a href='http://fantasyflightgames.com/' target="_blank" rel="noopener noreferrer">Fantasy Flight
					Games'</a>,&nbsp;
				<a href='https://www.fantasyflightgames.com/en/products/genesys/' target="_blank"
				   rel="noopener noreferrer">Genesys</a>.
			</Row>
			<Row className='justify-content-center'>
				<a href="https://github.com/SkyJedi/RPG-Web-Character-Creator" target="_blank"
				   rel="noopener noreferrer">Source Code</a>
			</Row>
		</div>
	)
};