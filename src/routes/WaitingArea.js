import React, { useEffect, useState } from "react";

import Start from "./Start";

function WaitingArea( {connected} ) {

	const [start, setStart] = useState(false);
	const [Display, setDisplay] = useState('none');

	const StartGame = () => {
		setDisplay('none');
		setStart(true);

	}

	return (
			<div>
				{!start ? (
					<div id = 'waiting'>
						<h3 id = "connected">En attente de joueurs</h3>
						<div class="hollow-dots-spinner">
							<div class="dot"></div>
							<div class="dot"></div>
							<div class="dot"></div>
						</div>
						<div>
							<button onClick = {StartGame}>Start</button>
						</div>
					</div>
					) : (
						<Start/>
				)}
			</div>
	);
}

export default WaitingArea;