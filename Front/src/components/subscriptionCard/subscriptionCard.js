import {React, useState }from 'react'
import { Button} from 'rsuite';
import { Drawer } from 'rsuite';
import "./subscriptionCard.css"
import DoctorSignUp from '../doctorSignUp/doctorSignUp';

const SubscriptionCard = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="packageCard" >
        <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
          <Drawer.Body>
            <DoctorSignUp />
          </Drawer.Body>
        </Drawer>
        <div className='pricingPlan'>
            <h2 style={{color:"#FF9800"}}>{props.plan.name}</h2>
            <h1 style={{color:"#0EB093"}}>{props.plan.price} EGP<span style={{fontSize:"large"}}>{props.plan.per}</span></h1>
            <hr className='subscribeHr'/>
        </div>
        <div className='pricingContent'>
            <ul>
                {
                    props.plan.specs.map(spec =>{
                        return(
                            <li>
                                {spec}
                            </li>
                        ) 
                    })
                }
            </ul>
        </div>
        <div className='subscribeButton'>
            <Button onClick={() => { setOpen(true)}} appearance='primary' color='orange' size='lg' block>Subscribe</Button>
        </div>
    </div>
  )
}

export default SubscriptionCard