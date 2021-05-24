import { add, set, compareAsc } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

const WORK_TIME_SECONDS = 1500;
const BREAK_TIME_SECONDS = 300;
const LUNCH_TIME_SECONDS = 3600;
const POMODORO_TIME_SECONDS = 900;

const w = 'work';
const b = 'break';
const l = 'lunch';
const META = [w, w, w, w, b, w, w, w, w, l, w, w, w, w, b, w, w, w, w];

const usePomodoro = (options = {}) => {
	const {
		time: {
			workTime = WORK_TIME_SECONDS,
			breakTime = BREAK_TIME_SECONDS,
			lunchTime = LUNCH_TIME_SECONDS,
			pomodoroTime = POMODORO_TIME_SECONDS,
		} = {},
		hour = 10,
	} = options;

	const [inBreak, setInBreak] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const pomodoroArray = useMemo(
		() =>
			getPomodoroArray({
				pomodoroTime,
				workTime,
				breakTime,
				lunchTime,
				hour,
			}),
		[workTime, breakTime, lunchTime, pomodoroTime, hour],
	);

	const pomodoroObject = useMemo(
		() => pomodoroArray[activeIndex],
		[activeIndex, pomodoroArray],
	);

	const duration = useMemo(() => {
		const { breakEnd, workEnd } = pomodoroObject;
		const startDate = new Date();
		let endDate = new Date();
		if (inBreak) {
			endDate = new Date(breakEnd);
		} else {
			endDate = new Date(workEnd);
		}

		return Math.ceil((endDate.getTime() - startDate.getTime()) / 1000);
	}, [inBreak, pomodoroObject]);

	useEffect(() => {
		let pomodoroInterval = setInterval(() => {
			let foundRange = false;
			const pomodoroArrayLength = pomodoroArray.length;
			for (let i = 0; i < pomodoroArrayLength; i++) {
				const { start, end, breakStart, breakEnd } = pomodoroArray[i];

				if (isCurrentInRange(start, end)) {
					setActiveIndex(i);

					if (isCurrentInRange(breakStart, breakEnd)) {
						setInBreak(true);
					} else {
						setInBreak(false);
					}

					foundRange = true;
				}

				if (foundRange) {
					foundRange = false;
					continue;
				}
			}
		}, 1000);

		return () => {
			clearInterval(pomodoroInterval);
		};
	}, [pomodoroArray]);

	return {
		inBreak,
		duration,
		activeIndex,
		pomodoroArray,
		pomodoroObject,
	};
};

const isCurrentInRange = (start, end) => {
	const timeNow = new Date();
	const nowStartDiff = compareAsc(timeNow, start);
	const nowEndDiff = compareAsc(timeNow, end);

	return nowStartDiff >= 0 && nowEndDiff < 0;
};

const getPomodoroArray = ({
	workTime,
	breakTime,
	lunchTime,
	pomodoroTime,
	hour = 10,
}) => {
	const pomodoroArray = [];
	let currentDate = set(new Date(), {
		hours: hour,
		minutes: 0,
		seconds: 0,
	});

	const createTimeObj = (date, type) => {
		let workEnd = null;
		let breakEnd = null;
		let breakStart = null;
		let workStart = null;
		switch (type) {
			case w:
				workEnd = add(date, { seconds: workTime });
				breakEnd = add(date, { seconds: workTime + breakTime });
				breakStart = workEnd;
				workStart = date;
				break;
			case b:
				workEnd = null;
				workStart = null;
				breakEnd = add(date, { seconds: pomodoroTime });
				breakStart = add(date, { seconds: 0 });
				break;
			case l:
				workEnd = null;
				workStart = null;
				breakEnd = add(date, { seconds: lunchTime });
				breakStart = add(date, { seconds: 0 });
				break;

			default:
				break;
		}

		return {
			type,
			workEnd,
			breakEnd,
			workStart,
			breakStart,
			start: date,
			end: breakEnd,
		};
	};

	META.forEach((type) => {
		const newObj = createTimeObj(currentDate, type);

		pomodoroArray.push(newObj);

		currentDate = newObj.breakEnd;
	});

	return pomodoroArray;
};

export default usePomodoro;
