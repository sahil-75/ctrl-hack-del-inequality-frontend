import { navigate } from '@reach/router';
import { FaArrowLeft } from 'react-icons/fa';

const Info = () => {
	return (
		<div
			className='bg-primary bg-blue-500 text-gray-500 p-12'
			style={{
				background: '#f2f2f2',
			}}
		>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl py-4 overflow-y-auto max-h-full p-10 pb-6'>
				<div className='text-center pb-2'>
					<div className='my-2 text-2xl text-gray-800'>About</div>
				</div>
				<div>
					Breakify is a digital well being workplace chat app that
					follows the <strong>Pomodoro</strong> technique as its
					foundation, to help users enhance their productivity and
					work life balance.
				</div>
				<div className='pt-3'>
					The pomodoro timeline is configurable and breaktimes can be
					adjusted accordingly.
				</div>
				<div className='pt-3'>Currently we follow this technique:</div>
				<div>
					{' -> '}Work day starts
					<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						work
					</code>
					{' -> '}
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						break
					</code>
					] * 4<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						pomodoro break
					</code>
					]
					<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						work
					</code>
					{' -> '}
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						break
					</code>
					] * 4
					<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						lunch break
					</code>
					]<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						work
					</code>
					{' -> '}
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						break
					</code>
					] * 4<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						pomodoro break
					</code>
					]
					<br />
					{' -> '}[
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						work
					</code>
					{' -> '}
					<code className='bg-blue-500 px-2 rounded text-white text-sm'>
						break
					</code>
					] * 4<br />
				</div>
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

export default Info;
