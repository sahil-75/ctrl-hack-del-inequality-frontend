import Spinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
	return (
		<div className='h-full w-full flex items-center justify-center pb-10'>
			<Spinner type='ThreeDots' color='#3C81F6' height={40} width={40} />
		</div>
	);
};

export default Loader;
