import NetInfo from '@react-native-community/netinfo'
import { setOthers } from '../actions'
import { connect } from 'react-redux'
//import { othersSelector } from '../selectors/datasetsSelector'

const NetStatusChecker = props => {
    NetInfo.addEventListener(network => props.setOthers({ network }))
    return null
}
const mapStateToProps = state => ({
    //others: othersSelector(state),
})
const mapDispatchToProps = {
    setOthers,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NetStatusChecker)
