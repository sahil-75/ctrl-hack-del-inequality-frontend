import cs from 'classnames';

const Avatar = ({ name, altBg = false, sm = false }) => {
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
				'flex items-center justify-center font-bold rounded-full',
				{ 'w-9 h-9 text-sm': sm === true, 'w-12 h-12': sm === false },
				{
					'bg-blue-500 text-white': altBg === true,
					'bg-white text-gray-700': altBg === false,
				},
			)}
		>
			{initials()}
		</div>
	);
};

export default Avatar;
