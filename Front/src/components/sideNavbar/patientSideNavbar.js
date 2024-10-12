import React from 'react'
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import GridIcon from '@rsuite/icons/Grid';
import AdminIcon from '@rsuite/icons/Admin';
import NavLink from "../NavLink/Navlink";
import {  useParams} from 'react-router-dom';




const styles = {
    width: 200,
    display: 'inline-table',
    marginRight: 2
};

const PatientSideNavbar = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
    const {userId} = useParams();
    return (
    <div style={styles}>
    <Sidenav
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
    >
        <Sidenav.Toggle onToggle={onExpand} />
        <Sidenav.Body>
        <Nav {...navProps}>
            <Nav.Item eventKey="1" active icon={<DashboardIcon />} as={NavLink} href={`/patientHome/${userId}`}>
                Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<AdminIcon />} as={NavLink} href={`/patientBasicInfo/${userId}`}>
                Basic Information
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GridIcon />} as={NavLink} href={`/patientRecordCollections/${userId}`}>
                Record Collections
            </Nav.Item>
            <Nav.Menu eventKey="3" title="Settings" icon={<GearCircleIcon />}>
            <Nav.Item eventKey="3-1">Account Settings</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            </Nav.Menu>
        </Nav>
        </Sidenav.Body>
        
    </Sidenav>
    </div>
);
}

export default PatientSideNavbar