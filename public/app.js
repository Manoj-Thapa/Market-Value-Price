// Toggle Button which change the Background Color of HomePage
const toggle = document.querySelector('.slider');
const tableData = document.querySelectorAll('.table-data');
const btnBG = document.querySelectorAll('.btn-bg');
const number = document.querySelector('.number');

let istoggle = true;
toggle.addEventListener('click', function () {

	if (istoggle) {
		document.body.style.backgroundColor = '#ffffff';
		document.body.style.color = '#000000';
		for (let node = 0; node < tableData.length; node++) {
			tableData[node].style.backgroundColor = '#F8F9FA';
			tableData[node].style.color = '#000000';
		}
		for (let node = 0; node < btnBG.length; node++) {
			btnBG[node].style.backgroundColor = '#F8F9FA';
			btnBG[node].style.color = '#000000';
			btnBG[node].style.border = '1px solid #F8F9FA';
		}
		istoggle = false;
	} else {
		document.body.style.backgroundColor = '#191D28';
		document.body.style.color = '#ffffff';
		for (let node = 0; node < tableData.length; node++) {
			tableData[node].style.backgroundColor = '#2E3241';
			tableData[node].style.color = '#ffffff';
		}
		for (let node = 0; node < btnBG.length; node++) {
			btnBG[node].style.backgroundColor = '#2E3241';
			btnBG[node].style.color = '#ffffff';
			btnBG[node].style.border = '1px solid #2E3241';
		}
		istoggle = true;
	}

});

let countdown = function() {
	return new Promise((resolve,reject) => {
		for (let count = 0; count <= 61; count++) {
			setTimeout(function () {
				if(count == 61) {
					resolve();
				}
				else {
					number.innerHTML = 60 - count;
				}
			}, count * 1000)
		}
	})
}

async function executeCountDown() {
	await countdown();
	await countdown();
	await countdown();
	await countdown();
}

executeCountDown();