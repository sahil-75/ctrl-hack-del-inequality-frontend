import cs from 'classnames';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/user.selector';
import Avatar from '../Avatar/Avatar';

const BreakRoomMessage = ({ name, text, timestamp, user }: any) => {
	const { email } = useSelector(selectUser);

	const isCurrentUser = () => email === user.email;

	const isBot = () => user.name === 'bot';

	const time = () => {
		const date = new Date(timestamp);

		const normalizeDigit = (digit: number) =>
			`${digit < 10 ? '0' : ''}${digit}`;

		return `${normalizeDigit(date.getHours())}:${normalizeDigit(
			date.getMinutes(),
		)}`;
	};

	return (
		<div
			className={cs('w-full flex items-end', {
				'justify-start': isCurrentUser() !== true,
				'justify-end': isCurrentUser() === true,
			})}
		>
			{isBot() ? (
				<div className='w-full pt-5 text-center text-sm opacity-70'>
					{text}
				</div>
			) : (
				<>
					{!isCurrentUser() && (
						<>
							<Avatar name={user.name} />
							<div style={{ width: '8px' }}></div>
						</>
					)}
					<div
						className={cs(
							'max-w-1/2 mt-4 px-4 py-3 rounded-2xl shadow-lg',
							{
								'rounded-bl-none bg-white':
									isCurrentUser() !== true,
								'rounded-br-none bg-blue-500 text-white':
									isCurrentUser() === true,
							},
						)}
					>
						<div className='text-sm break-all pb-1'>{text}</div>
						<div className='opacity-7' style={{ fontSize: 10 }}>
							{time()}
						</div>
					</div>
					{isCurrentUser() && (
						<>
							<div style={{ width: '8px' }}></div>
							<Avatar name={user.name} />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default BreakRoomMessage;
