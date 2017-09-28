import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PhraseActions from '../actions'
import Week from '../components/Week'

const App = ({schedule, actions}) => (
  <Week schedule={schedule} actions={actions} />
)

App.propTypes = {
  schedule: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  schedule: state.schedule
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PhraseActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
