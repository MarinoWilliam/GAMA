import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ScatterIcon from '@rsuite/icons/Scatter';
import VisibleIcon from '@rsuite/icons/Visible';
import LineChartIcon from '@rsuite/icons/LineChart';
import DetailIcon from '@rsuite/icons/Detail';
import { React, useState, useEffect } from 'react'

import "./showSideNavBar.css"

const ShowSideNavBar = ({ tableCallback }) => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');

    
    return (
        <div className='SideNavBar'>

            <Sidenav expanded={expanded} >
                <Sidenav.Body>
                    <Nav  activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<DetailIcon className='icon_option' />}>
                            <div onClick={() => { tableCallback('Reports') 
                        setActiveKey('1')
                        }}>
                                Reports
                            </div>
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ScatterIcon className='icon_option_4' />}>
                            <div onClick={() => { tableCallback('Drugs')
                        setActiveKey('2')
                    }}>
                                Drugs
                            </div>

                        </Nav.Item>
                        <Nav.Menu eventKey="3" title="Invistigation" icon={<VisibleIcon className='icon_option_2' />}>
                            <Nav.Item eventKey="3-1">
                                <div onClick={() => { tableCallback('Analysis') }}>
                                    Analysis
                                </div>
                            </Nav.Item>
                            <Nav.Item eventKey="3-2">
                                <div onClick={() => { tableCallback('Scans') } }>
                                    Scans
                                </div>
                            </Nav.Item>
                        </Nav.Menu>
                        <Nav.Item eventKey="4" icon={<LineChartIcon className='icon_option_3' />}>
                            <div onClick={() => { tableCallback('Operations') } }>
                                Operations
                            </div>
                            
                        </Nav.Item>

                    </Nav>
                </Sidenav.Body>
                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />

            </Sidenav>
        </div>
    )
}

export default ShowSideNavBar
