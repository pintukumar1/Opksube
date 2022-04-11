import Button from "../components/FormElements/Button";
import Card from "../components/UIElements/Card";

const Error = () => {
    return (
        <Card>
            <h3>Ohh! Page not found</h3>
            <p>We can't seem to find the page you are looking for..</p>
            <Button to="/" inverse>Back home</Button>
        </Card>
    )
}

export default Error
