import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeSeconds = (time) => (minuteSeconds - (time % 60)) | 0;

const renderTime = (timeMins, timeSecs, sidebar, breakMode) => {
    timeMins = timeMins < 10 ? `0${timeMins}` : timeMins;
    timeSecs = timeSecs < 10 ? `0${timeSecs}` : timeSecs;

    timeSecs = (timeMins == "00" && timeSecs == "60") ? "00" : timeSecs;

    if (sidebar) {
        return (
            <h3 className='text-xs -mb-7 font-sans tracking-widest' style={{ color: 'white' }}>
                {timeMins}:{timeSecs}
            </h3>
        );
    } else {
        return (
            <div className='items-center'>
                <h3 className='text-sm text-center mb-2'>{breakMode ? `Break End in` : `Break Starts in`}</h3>
                <h3 className='text-3xl text-center mb-2'>
                    {timeMins}<span className='text-base'>m</span> : {timeSecs}<span className='text-base'>s</span>
                </h3>
            </div>
        );
    }
};

const showNotification = () => {
    const notification = new Notification("Break Time!", {
        body: "Hey there, it's time for you to take a break."
    });
};

const CountDownTimer = (props) => {
    console.log(props.breakMode);
    const timerDuration = props.breakMode ? 300 : 1500;
    const startTime = Date.now() / 1000;
    const endTime = startTime + timerDuration;

    const remainingTime = endTime - startTime;
    // console.log(getTimeMinutes(startTime), getTimeMinutes(endTime), getTimeMinutes(remainingTime));
    return (
        <CountdownCircleTimer
            isPlaying
            key={props.key}
            strokeWidth={props.strokeWidth}
            duration={remainingTime}
            colors={props.sidebar ?
                [
                    ['#000000', 1]
                ]
                :
                props.breakMode ?
                    [
                        ['#A30000', 1]
                    ]
                    :
                    [
                        ['#004777', 1]
                    ]
            }
            onComplete={() => {
                if (Notification.permission === "granted") {
                    showNotification();
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then(permission => {
                        if (permission === "granted") {
                            showNotification();
                        }
                    });
                }
                // return [true, 1000];
            }}
            size={props.sidebar ? 50 : 200}
        >
            {({ elapsedTime }) =>
                renderTime(getTimeMinutes(remainingTime - elapsedTime), getTimeSeconds(elapsedTime), props.sidebar, props.breakMode)
            }
        </CountdownCircleTimer>
    );
};

export default CountDownTimer;