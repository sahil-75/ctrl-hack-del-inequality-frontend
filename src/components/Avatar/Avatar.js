import cs from 'classnames';

const Avatar = ({ name, sm = false }) => {
	const initials = () => {
		let initial = '';

		if (name) {
			const first = name[0];
			const second = name[1];

			if (first) {
				initial += first;
			}

			if (second) {
				initial += second;
			}
		}

		return initial.toUpperCase();
	};

	return (
		<div
			title={name}
			className={cs(
				'flex items-center justify-center font-bold bg-white text-gray-700 rounded-full',
				{ 'w-9 h-9 text-sm': sm === true, 'w-12 h-12': sm === false },
			)}
		>
			{initials()}
		</div>
	);
};

export default Avatar;
