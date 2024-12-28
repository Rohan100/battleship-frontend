import React, { useState } from 'react'
import Background from './components/background/Background';
import Setup from './components/setup/Setup';
import BattleFeild from './components/BattleFeild';
import WinnerModal from './components/common/WinnerModal';
import { useAppContext } from './store/AppProvider';
function PlayWithCompute() {
  const { isReady, winner } = useAppContext();

  return (
    <>
          <Background />
          {isReady ? <BattleFeild /> : <Setup />}
          <WinnerModal winner={winner} />
        </>
  )
}

export default PlayWithCompute