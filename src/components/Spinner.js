import React from 'react';
import '../scss/Spinner.scss';

function Spinner() {
	return (
		<section>
			<div id="loader-wrapper">
				<div id="loader"></div>
				<div class="loader-section section-left"></div>
				<div class="loader-section section-right"></div>

			</div>
		</section>
	);
}

export default Spinner;
