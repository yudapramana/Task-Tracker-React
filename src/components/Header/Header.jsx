import Button from '../Button/Button';
import './Header.css'
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const Header = (props) => {

    const { user, setUser } = useContext(UserContext);

    const btnOnClick = () => {
        props.buttonAddOnClick();
    }

    const triggerLogout = () => {
        props.triggerLogout();
    }

    const location = useLocation();

    return (
        <header>

            <div>
                <h1>
                    {props.title}
                </h1>
                {
                    user ? (
                        <h4>
                            Hello {user.user.name.split(' ')[0]} &nbsp;
                            <button onClick={triggerLogout}>logout</button>
                        </h4>
                    ) : null
                }
            </div>



            {
                user ? (
                    (location.pathname === '/' && !props.editMode) ? <Button
                        handleClick={btnOnClick}
                        text={props.showAddTask ? 'Close' : 'Add Task'}
                        color={props.showAddTask ? 'red' : 'green'}
                    /> : null
                ) : null
            }

        </header>
    );
}

export default Header