let statuses = [];
const statusTexts = Array.from(document.querySelectorAll('.status'));
const statusBoxes = Array.from(document.querySelectorAll('.line__status-box'));
const refreshButton = document.querySelector('.btn');

function refresh() {
	const getStatus = fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status');
	getStatus
		.then(data => {
			return data.json();
		})
		.then(json => {
			json.forEach(el => {
				statuses.push(el.lineStatuses[0].statusSeverityDescription);
			});
		})
		.then(() => {
			for (let i = 0; i < 11; i++) {
				statusTexts[i].textContent = statuses[i];
				if (statuses[i] == 'Good Service') {
					statusBoxes[i].classList.add('status__good');
				} else if (statuses[i] == 'Minor Delays') {
					statusBoxes[i].classList.add('status__minor');
				} else if (statuses[i] == 'Severe Delays') {
					statusBoxes[i].classList.add('status__severe');
				} else if (
					statuses[i] == 'Closed' ||
					statuses[i] == 'No Service' ||
					statuses[i] == 'Service Closed'
				) {
					statusBoxes[i].classList.add('status__closed');
				} else if (statuses[i] == 'Planned Closure' || statuses[i] == 'Part Closure') {
					statusBoxes[i].classList.add('status__part');
				}
				console.log(statuses[i]);
			}
		});
}

refreshButton.addEventListener('click', () => {
	refresh();
	console.log('refreshed');
});

refresh();
