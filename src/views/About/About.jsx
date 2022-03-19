import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from '../../UserContext';

const About = () => {

    // const {user} = useContext(UserContext);

    return (
        <div>
            <h3>Version 1.0.0</h3>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default About