import React from 'react'
import MyFiedld from './MyFeild'
import OpponentFeild from './OpponentFeild'
import { useAppContext } from '../../store/AppProvider'
import './style.css'
import MyFiedldOnline from './MyFeildOnline'
import OpponentFeildOnline from './OpponentFeildOnline'
function BattleFeild() {
  const {mode} = useAppContext()
  return (
    <div className='flex w-full items-center gap-2 md:flex-row flex-col justify-around mt-5'>
      <div className='w-1/2 relative'>
       {mode === 'compute' ? <MyFiedld /> : <MyFiedldOnline/>}
      </div>
      <div className='w-1/2 relative'>
        {mode === 'computer' ? <OpponentFeild /> : <OpponentFeildOnline/>}
      </div>
    </div>
  )
}

export default BattleFeild