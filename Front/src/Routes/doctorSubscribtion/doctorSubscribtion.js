import { React, useRef } from 'react'
import {  Button, FlexboxGrid } from 'rsuite';
import "./doctorSubscribtion.css"
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import SubscriptionCard from '../../components/subscriptionCard/subscriptionCard';
import NavLink from  '../../components/NavLink/Navlink';

const subscriptionPlans = [
  {
    name: "Free",
    price: "0",
    specs: [
      "Appearing for patients",
      "Viewing Basing stats",
    ],
    per:"",
    url: "/signin_signup"
  },
  {
    name: "Month",
    price: "30",
    specs: [
      "Appearing for patients",
      "Viewing all stats",
      "Adding medical data",
      "Viewing medical data",
      "Monitor vital signs",
    ],
    per:" /month",
    url: "/signin_signup"
  },
  {
    name: "One Year",
    price: "300",
    specs: [
      "Appearing for patients",
      "Viewing all stats",
      "Adding medical data",
      "Viewing medical data",
      "Monitor vital signs",
      "Two Months free"
    ],
    per:" /year",
    url: "/signin_signup"
  }
]

const DoctorSubscribtion = () => { 

  return (
          <div className="doctorSubscribDiv" style={{ backgroundImage: `url(${require("../../images/HomeSlider6.jpg")})` }}>
            <h1 style={{ margin: "10vh auto 3vh", textAlign: "center", color: "#0EB093" }}>
              Choose your <span style={{ color: "#FF9800" }}>Subscription</span> Plan
            </h1>
             
            <div className="packagesCollection" >
              <FlexboxGrid justify="space-between">
                <FlexboxGridItem colspan={7}>
                  <SubscriptionCard plan={subscriptionPlans[0]} />
                </FlexboxGridItem>
                <FlexboxGridItem colspan={7}>
                  <SubscriptionCard plan={subscriptionPlans[1]} />
                </FlexboxGridItem>
                <FlexboxGridItem colspan={7}>
                  <SubscriptionCard plan={subscriptionPlans[2]} />
                </FlexboxGridItem>
              </FlexboxGrid>
            </div>

          </div>
  )
}

export default DoctorSubscribtion