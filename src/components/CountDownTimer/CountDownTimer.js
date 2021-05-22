import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaRegHourglass } from 'react-icons/fa';

const formatSeconds = (seconds) => {
	let timeMins = 0;
	let timeSecs = 0;

	const format = (t) => `${t < 10 ? '0' : ''}${t}`;

	timeMins = Math.trunc(seconds / 60);
	timeSecs = Math.trunc(seconds % 60);

	timeSecs = timeMins > 0 && timeSecs === 0 ? 0 : timeSecs;

	return { timeMins: format(timeMins), timeSecs: format(timeSecs) };
};

const renderTime = (duration, elapsedTime, sidebar, breakMode) => {
	const timePased = Math.ceil(elapsedTime);

	const { timeMins, timeSecs } = formatSeconds(duration - timePased);

	if (sidebar) {
		return (
			<div className='flex-col flex items-center cursor-pointer mb-3'>
				<h3 className='text-xl text-white mb-2'>
					<FaRegHourglass
						className={`${
							timeMins != '00' && timeSecs != '00'
								? 'spinning-animation'
								: ''
						}`}
					/>
				</h3>
				<h3
					className='text-xs font-sans tracking-widest'
					style={{ color: 'white' }}
				>
					{timeMins}:{timeSecs}
				</h3>
			</div>
		);
	} else {
		return (
			<div className='items-center'>
				<h3 className='text-sm text-center mb-2'>
					{breakMode ? `Break ends in` : `Break starts in`}
				</h3>
				<h3 className='text-3xl text-center mb-2'>
					{timeMins}
					<span className='text-base'>m</span> : {timeSecs}
					<span className='text-base'>s</span>
				</h3>
			</div>
		);
	}
};

const showNotification = () => {
	const notification = new Notification('Break Time!', {
		body: "Hey there, it's time for you to take a break.",
	});
};

const CountDownTimer = (props) => {
	const { duration } = props;
	const [localKey, setLocalKey] = useState(0);

	// const timerDuration = props.breakMode ? 300 : 60;
	// const startTime = Date.now() / 1000;
	// const endTime = startTime + timerDuration;

	// const remainingTime = endTime - startTime;

	useEffect(() => setLocalKey((key) => key + 1), [duration]);
	return (
		<CountdownCircleTimer
			isPlaying
			key={props.timerKey + localKey}
			strokeWidth={props.strokeWidth}
			duration={duration}
			colors={
				props.sidebar
					? [['#000000', 1]]
					: props.breakMode
					? [['#A30000', 1]]
					: [['#004777', 1]]
			}
			onComplete={() => {
				if (!props.sidebar && props.setTimeUp && duration > -1) {
					if (Notification.permission === 'granted') {
						showNotification();
					} else if (Notification.permission !== 'denied') {
						Notification.requestPermission().then((permission) => {
							if (permission === 'granted') {
								showNotification();
							}
						});
					}
					console.log(props);
					props.setTimeUp(true);
				}
			}}
			size={props.sidebar ? 50 : 200}
		>
			{({ elapsedTime }) =>
				renderTime(
					duration,
					elapsedTime,
					props.sidebar,
					props.breakMode,
				)
			}
		</CountdownCircleTimer>
	);
};

export default CountDownTimer;
