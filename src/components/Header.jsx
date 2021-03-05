import PropTypes from 'prop-types';
import Button from './Button';

function Header({ title, showForm, onToggleAddForm }) {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
                text={showForm ? 'Close' : 'Add'} 
                color={showForm ? 'red' : 'green'}
                onClick={onToggleAddForm}></Button>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string
}

export default Header
