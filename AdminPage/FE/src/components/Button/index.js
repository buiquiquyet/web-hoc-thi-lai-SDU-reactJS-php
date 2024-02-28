import classNames from "classnames/bind";
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button({ to, href, primary = false, className, onClick, ...passProps}) {

    let Component = 'button'
    const props = {
        onClick,
        ...passProps,
    }
    const classes = cx('wrapper', {
        primary,
        [className]: className
    })
    if(to) {
        props.to = to
        Component = Link
    } else if (href) {
        props.href = href
        Component = 'a'
    }
    return (
        <Component className={classes} {...props}>
            
        </Component>
    );
}

export default Button;