import React, { useState } from "react";
import botImage from '../../assets/bot.png'



const Header = () => {
  return (
    <div className="flex flex-row  shadow-lg "
    style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-between items-center px-8 mr-6 py-2">
            <img src={botImage} className='w-10 '></img>
            <h1 className="font-bold text-sky-800 px-4">CTGenix</h1>
          </div>
          
        
      </div>
    </div>
    
  )
}

export default Header