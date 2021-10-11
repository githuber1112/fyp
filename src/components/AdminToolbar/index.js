import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import {useSelector} from 'react-redux';
import {checkUserIsAdmin} from './../../utils';

const mapState = ({user}) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const {currentUser} = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    if (!isAdmin) return null;

    return(
        <div className="adminToolbar">
            <ul>
                <li>
                    <Link to="/admindashboard">
                    My admin
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminToolbar;