import { navigate } from '@reach/router';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectPomodoroConfig,
	selectStartHour,
} from '../../features/user/user.selector';
import { userActions } from '../../features/user/user.slice';
import useInputForm from '../../hooks/useInputForm';

const Delegatee = () => {
	const dispatch = useDispatch();
	const {
		workTime: w = 900,
		breakTime: b = 300,
		pomodoroTime: p = 1200,
	} = useSelector(selectPomodoroConfig) ?? {};

	const start = useSelector(selectStartHour) ?? 10;

	const [workTime, setWorkTime] = useInputForm(w / 60);
	const [breakTime, setBreakTime] = useInputForm(b / 60);
	const [pomodoroTime, setPomodoroTime] = useInputForm(p / 60);

	const [hours, setHours] = useInputForm(start);

	const submitHandler = (e) => {
		if (e) {
			e.preventDefault();
		}

		dispatch(
			userActions.setPomodoroConfig({
				lunchTime: 3600,
				workTime: workTime * 60,
				breakTime: breakTime * 60,
				pomodoroTime: pomodoroTime * 60,
			}),
		);

		dispatch(userActions.setStartHour(hours));

		navigate('/');
	};

	return (
		<div
			className='bg-primary bg-blue-500 text-gray-500 p-12'
			style={{
				background: '#f2f2f2',
			}}
		>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl py-4 overflow-y-auto max-h-full p-10'>
				<div className='text-center'>
					<div className='my-2 mb-0 text-2xl text-gray-800'>
						Set your pomodoro timeline
					</div>
					<div className='mb-6'>(Time is in minutes)</div>
				</div>
				<form onSubmit={submitHandler} className='px-6 mb-4'>
					<div>
						<label
							htmlFor='workTime'
							className='text-gray-600 text-base font-medium'
						>
							Work time
						</label>
						<input
							min='2'
							max='25'
							type='number'
							id='workTime'
							value={workTime}
							className='input-primary'
							onChange={setWorkTime}
						/>
					</div>
					<div className='mt-2'>
						<div>
							<label
								htmlFor='breakTime'
								className='text-gray-600 text-base font-medium'
							>
								Break time
							</label>
							<input
								min='2'
								max='15'
								type='number'
								id='breakTime'
								value={breakTime}
								placeholder='Break time'
								className='input-primary'
								onChange={setBreakTime}
							/>
						</div>
					</div>
					<div className='mt-2'>
						<div>
							<label
								htmlFor='pomodoroTime'
								className='text-gray-600 text-base font-medium'
							>
								Pomodoro time
							</label>
							<input
								min='15'
								max='30'
								type='number'
								id='pomodoroTime'
								value={pomodoroTime}
								className='input-primary'
								onChange={setPomodoroTime}
							/>
						</div>
					</div>
					<div className='my-2 text-gray-600 text-base font-medium border-t pt-3'>
						When do you start your work?
					</div>
					<select
						id='hour'
						value={hours}
						onChange={setHours}
						className='input-primary'
					>
						{[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]?.map(
							(t) => (
								<option value={t} key={t}>
									{`${t > 12 ? t - 12 : t} ${
										t >= 12 ? 'PM' : 'AM'
									}`}
								</option>
							),
						)}
					</select>
					<button
						type='submit'
						className={`btn-primary flex items-center justify-center w-full font-semibold uppercase tracking-wider`}
					>
						Submit
					</button>
				</form>
			</div>
			<h3
				className='absolute top-5 left-5 h-20 cursor-pointer'
				style={{ color: '#FFF' }}
				onClick={() => navigate('/')}
			>
				<FaArrowLeft size={30} />
			</h3>
		</div>
	);
};

export default Delegatee;
