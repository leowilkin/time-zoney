document.addEventListener('DOMContentLoaded', () => {
    const timezoneInput1 = document.getElementById('timezone1');
    const timezoneInput2 = document.getElementById('timezone2');
    const datalist = document.getElementById('timezones');

    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.name;
        datalist.appendChild(option);
    });


    timezoneInput1.addEventListener('input', function () {
        filterDatalist(this);
    });
    
    timezoneInput2.addEventListener('input', function () {
        filterDatalist(this);
    });
});

function filterDatalist(input) {
    const datalist = document.getElementById('timezones');
    const options = Array.from(datalist.querySelectorAll('option'));
    const searchValue = input.value.toLowerCase();
    options.forEach(option => {
        option.style.display = option.value.toLowerCase().includes(searchValue) ? '' : 'none';
    });
}

function showMeetingTimes() {
    const timezone1Name = document.getElementById('timezone1').value;
    const timezone2Name = document.getElementById('timezone2').value;

    const timezone1 = timeZones.find(zone => zone.name === timezone1Name);
    const timezone2 = timeZones.find(zone => zone.name === timezone2Name);

    if (!timezone1 || !timezone2) return;

    const resultsDiv = document.getElementById('results');
    const tableBody = document.querySelector('#times-table tbody');
    const timezone1Header = document.getElementById('timezone1-header');
    const timezone2Header = document.getElementById('timezone2-header');
    const noTimesMessage = document.getElementById('no-times-message');
    const noExactMatchMessage = document.getElementById('no-exact-match-message');

    timezone1Header.textContent = `Time in ${timezone1.name}`;
    timezone2Header.textContent = `Time in ${timezone2.name}`;

    tableBody.innerHTML = '';

    let hasValidTimes = false;
    let allOrange = true;

    for (let hour = 0; hour < 24; hour++) {
        let hourInTimezone1 = (hour + timezone1.offset + 24) % 24;
        let hourInTimezone2 = (hour + timezone2.offset + 24) % 24;

        let timeInTimezone1 = formatTime(hourInTimezone1);
        let timeInTimezone2 = formatTime(hourInTimezone2);

        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = timeInTimezone1;
        cell2.textContent = timeInTimezone2;

        if (isValidMeetingTime(hourInTimezone1) || isValidMeetingTime(hourInTimezone2)) {
            if (isValidMeetingTime(hourInTimezone1) && isValidMeetingTime(hourInTimezone2)) {
                cell1.classList.add('highlight-green');
                cell2.classList.add('highlight-green');
                hasValidTimes = true;
                allOrange = false;
            } else {
                cell1.classList.add('highlight-orange');
                cell2.classList.add('highlight-orange');
                hasValidTimes = true;
            }
            row.appendChild(cell1);
            row.appendChild(cell2);
            tableBody.appendChild(row);
        }
    }

    if (hasValidTimes) {
        resultsDiv.classList.remove('hidden');
        noTimesMessage.classList.add('hidden');
        noExactMatchMessage.classList.toggle('hidden', !allOrange);
    } else {
        resultsDiv.classList.add('hidden');
        noTimesMessage.classList.toggle('hidden', true);
        noExactMatchMessage.classList.add('hidden');
    }
}

function showAllTimes() {
    const resultsDiv = document.getElementById('results');
    const noTimesMessage = document.getElementById('no-times-message');
    
    resultsDiv.classList.remove('hidden');
    noTimesMessage.classList.add('hidden');
}

function isValidMeetingTime(hour) {
    return hour >= 10 && hour <= 16;
}

function formatTime(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${period}`;
}


const timeZones = [
    { name: "UTC (Coordinated Universal Time)", offset: 0 },
    { name: "GMT (Greenwich Mean Time)", offset: 0 },
    { name: "BST (British Summer Time)", offset: 1 },
    { name: "CET (Central European Time)", offset: 1 },
    { name: "CEST (Central European Summer Time)", offset: 2 },
    { name: "EET (Eastern European Time)", offset: 2 },
    { name: "EEST (Eastern European Summer Time)", offset: 3 },
    { name: "MSK (Moscow Time)", offset: 3 },
    { name: "IST (India Standard Time)", offset: 5.5 },
    { name: "Pakistan Standard Time", offset: 5 },
    { name: "Bangladesh Standard Time", offset: 6 },
    { name: "CST (China Standard Time)", offset: 8 },
    { name: "JST (Japan Standard Time)", offset: 9 },
    { name: "ACST (Australian Central Standard Time)", offset: 9.5 },
    { name: "AEST (Australian Eastern Standard Time)", offset: 10 },
    { name: "AEDT (Australian Eastern Daylight Time)", offset: 11 },
    { name: "NZST (New Zealand Standard Time)", offset: 12 },
    { name: "NZDT (New Zealand Daylight Time)", offset: 13 },
    { name: "EST (Eastern Standard Time)", offset: -5 },
    { name: "EDT (Eastern Daylight Time)", offset: -4 },
    { name: "CST (Central Standard Time)", offset: -6 },
    { name: "CDT (Central Daylight Time)", offset: -5 },
    { name: "MST (Mountain Standard Time)", offset: -7 },
    { name: "MDT (Mountain Daylight Time)", offset: -6 },
    { name: "PST (Pacific Standard Time)", offset: -8 },
    { name: "PDT (Pacific Daylight Time)", offset: -7 },
    { name: "AKST (Alaska Standard Time)", offset: -9 },
    { name: "AKDT (Alaska Daylight Time)", offset: -8 },
    { name: "HST (Hawaii-Aleutian Standard Time)", offset: -10 },
    { name: "HADT (Hawaii-Aleutian Daylight Time)", offset: -9 },
    { name: "Samoa Standard Time", offset: -11 },
    { name: "Tonga Time", offset: -13 }
];
