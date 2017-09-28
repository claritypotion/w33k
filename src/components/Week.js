
import React from 'react'
import ReactDOM from 'react-dom'
import { encode } from '../transport/transport'

const daysDict = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default class Week extends React.Component {
  render () {
    const schedule = this.props.schedule
    const totalHours = this.props.schedule.filter(h => h).length
    const totalMinutes = totalHours * 60

    return <div className='w33k-app'>
      <div className='w33k-meta'>
        <div>Hours: <b>{totalHours}</b></div>
        <div>Minutes: <b>{totalMinutes}</b></div>
        <div><span onClick={() => this.props.actions.clearAll()}>Clear All</span></div>
        <div><span onClick={() => this.props.actions.loadState()}>Load Fixtures</span></div>
        <div><span onClick={() => this.onSerialize()}>Serialize to Console</span></div>
      </div>
      <div className='w33k-timeline'>
        {(new Array(24)).fill(0).map((v, i) => {
          if (i % 3 === 0) {
            const text = `${i.toString().padStart(2, 0)}:00`
            return <div key={i}>{text}</div>
          }
        })}
      </div>
      <div className='w33k-days' >
        {daysDict.map((day, i) => {
          const isActive = this.props.schedule.reduce((p, c, hI) => {
            if (!p) {
              return p
            }

            if (hI >= i * 24 && hI < i * 24 + 24) {
              return c
            }

            return p
          }, true)

          const elClass = `w33k-day${isActive ? ' active' : ''}`
          return <div onClick={() => this.onDayClick(isActive, i)} className={elClass} key={i}>{day}</div>
        }
        )}
      </div>
      <div className='w33k-hours'>
        {this.props.schedule.map((hour, i) => {
          const elClass = `w33k-hour${hour ? ' active' : ''}`
          return <div onClick={() => this.onHourClick(hour, i)}
            onMouseEnter={(e) => this.onHourMouseInOut(hour, i, e)}
            onMouseLeave={(e) => this.onHourMouseInOut(hour, i, e)}
            className={elClass} key={i} />
        })}
      </div>
    </div>
  }

  onSerialize () {
    // should not be here
    console.log(JSON.stringify(encode(this.props.schedule)))
  }

  onHourMouseInOut (hour, i, e) {
    if (hour) {
      return
    }

    if (e.buttons == 1) {
      this.props.actions.markHour(i)
    }
  }

  onDayClick (day, i) {
    if (day) {
      this.props.actions.unmarkDay(i)
    } else {
      this.props.actions.markDay(i)
    }
  }

  onHourClick (hour, i) {
    if (hour) {
      this.props.actions.unmarkHour(i)
    } else {
      this.props.actions.markHour(i)
    }
  }
}
