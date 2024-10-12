import {React , forwardRef} from 'react'
import { Link } from 'react-router-dom';


const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));

export default NavLink