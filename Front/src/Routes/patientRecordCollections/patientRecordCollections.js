import {React , useState} from 'react'
import { FlexboxGrid , IconButton , InputGroup , Input , SelectPicker , Form,RadioGroup,Radio, ButtonGroup, Button} from 'rsuite'
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem'
import "./patientRecordCollections.scss"
import PatientSideNavbar from '../../components/sideNavbar/patientSideNavbar';
import PinedIcon from '@rsuite/icons/Pined';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import { useParams } from 'react-router-dom';
import NavLink from '../../components/NavLink/Navlink';
import { Popover, Whisper } from 'rsuite';

// Categories of record speciality
const categories = require('../../data/category_of_specialization.json')
const data = categories.map(
    item => ({ label: item.name, value: item.name })
  );

const PatientRecordCollections = () => {
    // SideNavbar States
  const [activeKey, setActiveKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['3', '4']);
  const [expanded, setExpand] = useState(false);
  const [pinnedCategory, setpinnedCategory] = useState({
    'name':'Dental',
    'img_src' : '../../images/dentistryCategory.png',
    'seeMoreLink' : '/Dental/id'
  })
 
  const { userId } = useParams();
  const speaker = (
    <Popover style={{color:'black'}}>
        <h4>Choose Category:</h4>
      <ButtonGroup>
        {
              categories.map((category , index)=>{
                  return(
                      <Button onClick={()=>{
                        setpinnedCategory(category)
                      }}>{category.name}</Button>
                  )
              })
        }
      </ButtonGroup>
          
        
          
    </Popover>
  );
  
  return (
    <div className='container'>
        <FlexboxGrid>
        {/* SideNavbar */}
        <FlexboxGridItem colspan={1}>
          <div className='sideNavbar'>
          <PatientSideNavbar
            activeKey={activeKey}
            openKeys={openKeys}
            onSelect={setActiveKey}
            onOpenChange={setOpenKeys}
            expanded={expanded}
            onExpand={setExpand}
            appearance="default"
          />
        </div>
        </FlexboxGridItem >
        {/* All Page Content */}
        <FlexboxGridItem colspan={23}>
            {/* First Row of three collections */}
            <div className='RecordCollections'>
                <FlexboxGrid justify='space-around'>
                    {/* Basic Info */}
                    <FlexboxGridItem colspan={8}>
                        <div className='collectionCard'>
                            <h2>Basic Info</h2>
                            <hr/>
                            <img src={require("../../images/userImgCategory.png")} alt='userIcon' width={100}/>
                            <p> Hello here is your basic information collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientBasicInfo/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                        </div>
                    </FlexboxGridItem >
                    {/* Critical Info */}
                    <FlexboxGridItem colspan={8}>
                        <div className='collectionCard'>
                            <h2>Critical Info</h2>
                            <hr/>
                            <img src={require("../../images/CriticalCategory.png")} alt='userIcon' width={100}/>
                            <p> Hello here is your Critical information collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientCriticalInfo/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                        </div>
                    </FlexboxGridItem>
                    {/* Search for Records */}
                    <FlexboxGridItem colspan={8}>
                        <div className='collectionCard'>
                            <h2>Search for a record</h2>
                            <hr/>
                            <Form layout='inline'>
                                <FlexboxGrid justify='center'>
                                <FlexboxGridItem colspan={10}>
                                    <SelectPicker data={data} appearance="subtle" placeholder="Category" />
                                </FlexboxGridItem>
                                <FlexboxGridItem colspan={14}>
                                    <InputGroup>
                                    <Input placeholder='Name of Record'/>
                                    <InputGroup.Button>
                                        <SearchIcon />
                                    </InputGroup.Button>
                                    </InputGroup>
                                </FlexboxGridItem>
                                </FlexboxGrid>
                            </Form>
                            <p> Hello here is your basic information collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientBasicInfo/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                        </div>
                    </FlexboxGridItem>
                </FlexboxGrid>

                {/* Second Row of Four collections */}
                <FlexboxGrid justify='space-around'>
                    {/* Lab Tests */}
                    <FlexboxGridItem colspan={6}>
                        <div className='collectionCard'>
                            <h2>Lab Tests</h2>
                            <hr/>
                            <img src={require("../../images/labCategory.png")} alt='userIcon' width={100}/>
                            <p> Hello here is your Lab Tests collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientLabTests/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                        </div>
                    </FlexboxGridItem >
                    {/* Scans and Imaging */}
                    <FlexboxGridItem colspan={6}>
                        <div className='collectionCard'>
                            <h2>Scans</h2>
                            <hr/>
                            <img src={require("../../images/imagingCategory.png")} alt='userIcon' width={100}/>   
                            <p> Hello here is your Scans collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientScans/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                        </div>
                    </FlexboxGridItem>
                    {/* Pinned Category */}
                    <FlexboxGridItem colspan={6}>
                        <div className='collectionCard'>
                            <h2>{pinnedCategory.name} <PinedIcon/></h2>
                            <hr/>
                            <img src={require("../../images/dentistryCategory.png")} alt='userIcon' width={100}/>
                            <p> Hello here is your basic information collection. </p>
                            <div className="seeMore">
                                <NavLink href={`/patientBasicInfo/${userId}`} style={{color: '#FA8900'}}> See More</NavLink>
                            </div>
                            
                        </div>
                    </FlexboxGridItem>
                    {/* Pin A Category */}
                    <FlexboxGridItem colspan={6}>
                        <div className='collectionCard'>
                            <h2>Pin A Category</h2>
                            <hr/>
                            <Whisper placement="top" trigger="click" controlId="control-id-click" speaker={speaker}>
                                <IconButton icon={<PlusIcon />} color="orange" appearance="primary" circle size='lg'/>
                            </Whisper>                
                            <p> Pin a any Category from Here  </p>
                            
                        </div>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </div>
        
        </FlexboxGridItem>
        </FlexboxGrid>
        
    </div>
  )
}

export default PatientRecordCollections