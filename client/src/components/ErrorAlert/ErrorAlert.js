import { useSelector } from "react-redux"
import "./ErrorAlert.css"

const ErrorAlert = () => {
    const errorText = useSelector(state => state.app.errorText)

    return (
        <div className="alert">
            {errorText}
        </div>
    )
}

export default ErrorAlert
