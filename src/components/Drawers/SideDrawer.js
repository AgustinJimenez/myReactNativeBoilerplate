import React from 'react'
import { Drawer } from 'native-base'
import SideBar from '../SideBars/SideBar'

let SideDrawer = props => {
    var closeDrawer = _ => this.drawer._root.close()
    //var openDrawer = _ => this.drawer._root.open()
    var setRef = ref => (this.drawer = ref)

    return <Drawer ref={setRef} content={<SideBar navigator={this.navigator} />} onClose={closeDrawer} />
}

export default SideDrawer
