function createClock() {
    const hoursSelect = document.querySelector('#hours');
    const minutesSelect = document.querySelector('#minutes');
    const secondSelect = document.querySelector('#seconds');

    for (let i = 0; i < 60; i++) {

        if (i > 0 && i < 13) {
            const hoursOption = document.createElement('option');
            hoursOption.value = i;
            hoursOption.appendChild(document.createTextNode(i < 10 ? '0' + i : i));
            hoursSelect.appendChild(hoursOption);
        }

        const minutesOption = document.createElement('option');
        minutesOption.value = i;
        minutesOption.appendChild(document.createTextNode(i < 10 ? '0' + i : i));
        minutesSelect.appendChild(minutesOption);

        const secondsOption = document.createElement('option');
        secondsOption.value = i;
        secondsOption.appendChild(document.createTextNode(i < 10 ? '0' + i : i));



       
        secondSelect.appendChild(secondsOption);
    }
}

createClock();

let alarms = [];
function setAlarm({ hours, minutes, seconds, period }) {
    const newHours = Number.parseInt(hours);
    const newMinutes = Number.parseInt(minutes);
    const newSeconds = Number.parseInt(seconds);
    alarms.push({ "hours": newHours, "minutes": newMinutes, "seconds": newSeconds, "period": period });
    document.querySelector('.alarms').innerHTML += `<code>Alarm: ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${period}</code>`;

    console.log(`Alarm will ring at ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${period}`);
    console.log(alarms)
}

document.querySelector('#alarm-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    })

    setAlarm(data);
})

const alarmAudio = new Audio('ring-tone/alarm.mp3');
alarmAudio.loop = true;



function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let period = 'AM';

    if (hours >= 12) {
        period = 'PM';
        // Convert to 12-hour format
        if (hours > 12) {
            hours -= 12;
        }
    }

    // Ensure single digit hours are padded with a leading zero
    hours = hours;

    return {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "period": period
    };
}

setInterval(checkAlarms, 1000, alarms);

function checkAlarms(alarms) {
    const { hours, minutes, seconds, period } = getCurrentTime();

    alarms.forEach((alarm) => {
        if (hours === alarm["hours"] && minutes === alarm["minutes"] && seconds === alarm["seconds"] && period === alarm["period"]) {
            console.log('alarm should play')
            playAlarm(10);
        }
    });
}

let palyAlarmTimeOut = null;
function playAlarm(timeDuration = 1) {
    alarmAudio.play()
    console.log('alarm playing')
    if (!palyAlarmTimeOut) {
        palyAlarmTimeOut = setTimeout(() => {
            stopAlarm();
            console.log(`play alarm time out`)
        }, timeDuration * 1000)
    }
}

function stopAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    clearTimeout(palyAlarmTimeOut);
    palyAlarmTimeOut = null;
    console.log('Alarm is stop')
}

function snoozeAlarm(timeDurantions) {
    console.log('Alarm is Snoozed');
    stopAlarm();
    playAlarm(timeDurantions);
}