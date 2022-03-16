

const Button = (props) => {

    const handleClick = (e) => {
       props.handleClick()
    }

    return (
        <button 
            className="btn"
            onClick={handleClick}
            style={{backgroundColor: props.color}}
        >
            {props.text}
        </button>
    )
}

export default Button