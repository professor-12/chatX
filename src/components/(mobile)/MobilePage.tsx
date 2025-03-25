import React from 'react'
import TabContainer from '../tabs/tabcontainer'
import MobileNav from '../mobile/SideNav'

const MobilePage = () => {
      return (
            <div className='h-screen overflow-hidden max-h-screen flex flex-col'>
                  <TabContainer />
                  <MobileNav/>
            </div>
      )
}

export default MobilePage