// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {listItem, clickStar} = props
  const {id, title, date, isStarred} = listItem
  const isStarredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    clickStar(id)
  }
  return (
    <li className="list-style">
      <div className="list-border">
        <div className="list-container">
          <p className="heading">{title}</p>
          <button
            type="button"
            className="star-button"
            onClick={onClickStar}
            data-testid="star"
          >
            <img src={isStarredImgUrl} alt="star" />
          </button>
        </div>
        <p className="format-date">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
