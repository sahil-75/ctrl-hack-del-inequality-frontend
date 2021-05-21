import React from 'react';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import { FaTimes } from 'react-icons/fa';

const CountDownModal = (props) => {
    return (
        <div className='flex justify-center w-screen h-screen items-center antialiased absolute top-0 left-0 overflow-hidden' style={{ backgroundColor: 'rgb(0 0 0 / 70%)' }}>
            <div className='flex flex-col mx-auto rounded-lg bg-gray-50 border border-gray-300 shadow-xl' style={{ width: 300 }}>
                <div className='flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg'>
                    <p className='font-semibold text-gray-800'>Break Countdown</p>
                    <h3 className='text-xl cursor-pointer' onClick={() => props.setModalVisible('hidden')}>
                        <FaTimes />
                    </h3>
                </div>
                <div className='flex flex-col items-center p-5 m-2'>
                    <CountDownTimer strokeWidth={6} sidebar={false} breakMode={props.breakMode} setTimeUp={props.setTimeUp} />
                    {props.isTimeUp &&
                        <button
                            onClick={() => props.toggleBreakMode()}
                            className='py-2 px-5 mt-5 bg-blue-500 hover:bg-cyan-700 focus:outline-none text-white rounded-md'
                        >
                            {props.breakMode ? `End Break` : `Start Break`}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default CountDownModal;