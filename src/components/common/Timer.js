import React from 'react'

function TimerCmp({time}) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return (
    <div className='flex text-xl bg-black text-white p-1 mb-2 rounded'>
       {timeString}
    </div>
  )
}

export default TimerCmp