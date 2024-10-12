import React from 'react'
import HomeUserCard from '../../components/homeUserCard/homeUserCard';
import { FlexboxGrid ,Col} from 'rsuite';





const SigninSignup = () => {


  return (
    // Users cards Section 
    <div className='appScrollSection' id="userCardSection">
        <div className='userGroupSection'>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                <HomeUserCard title="Doctor"/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                <HomeUserCard title="Patient"/>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    </div>
  )
}
export default SigninSignup
