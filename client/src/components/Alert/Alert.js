import { useSelector } from "react-redux"
import "./Alert.css"

const Alert = (props) => {
    const alertText = useSelector(state => state.app.alertText)

    return (
        <div className="alert">
            {alertText}
        </div>
    )
}

export default Alert
