import Button from '../Button/Button';
import './Header.css'
import { useLocation } from 'react-router-dom';

const Header = (props) => {

    const btnOnClick = () => {
        props.buttonAddOnClick();
    }

    const location = useLocation();

    return (
        <header>
            <h1>{props.title}</h1>
            {
                ( location.pathname === '/' && !props.editMode ) ? <Button
                    handleClick={btnOnClick}
                    text={props.showAddTask ? 'Close' : 'Add Task'}
                    color={props.showAddTask ? 'red' : 'green'}
                /> : null
            }

        </header>
    );
}

export default Header