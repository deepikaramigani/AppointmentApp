// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isActive: false,
    isStarredList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onClickStarred = () => {
    const {appointmentList} = this.state
    const newStarredList = appointmentList.filter(
      eachApppintment => eachApppintment.isStarred === true,
    )
    this.setState(prevState => ({
      isActive: !prevState.isActive,
      isStarredList: newStarredList,
    }))
  }

  clickStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {title, date, appointmentList, isActive, isStarredList} = this.state
    const starredClassName = isActive
      ? 'onclick-starred-button'
      : 'starred-button'
    return (
      <div className="bg-container">
        <div className="container">
          <div className="input-img-container">
            <div className="input-container">
              <form className="form-style" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  className="input-style"
                  placeholder="Title"
                  id="title"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input-style"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr />
          <div className="appointment-container">
            <div className="starred-button-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={starredClassName}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="list-items">
              {isActive
                ? isStarredList.map(each => (
                    <AppointmentItem
                      listItem={each}
                      key={each.id}
                      clickStar={this.clickStar}
                    />
                  ))
                : appointmentList.map(each => (
                    <AppointmentItem
                      listItem={each}
                      key={each.id}
                      clickStar={this.clickStar}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
