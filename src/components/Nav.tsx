import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/SavedCandidates', label: 'Potential Candidates' },
];

const Nav = () => {
  const { pathname: currentPage } = useLocation();

  return (
    <ul className='nav nav-tabs'>
      {navLinks.map(({ to, label }) => (
        <li className='nav-item' key={to}>
          <Link
            to={to}
            className={currentPage === to ? 'nav-link active' : 'nav-link'}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
