
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import Alert from 'react-bootstrap/Alert';
const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <><Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    you don't have permission to access this route
                </p>
            </Alert></>

        )
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute;