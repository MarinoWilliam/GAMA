import React from 'react'
import "./noAccess.css"
import { FlexboxGrid, Button } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';



const noAccess = () => {
    return (
        <div className='aboutContainer'>
            <div className='error_dev'>

                <FlexboxGrid justify='center' align='middle' className='error_Grid'>
                    <FlexboxGridItem colspan={9}>
                        <img src={require("../../images/fallenSign.jpg")} alt='error' className='error_image' />
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={11}>
                        <h1 className='error_header'>We Are Sorry,</h1>
                        <p className='error_para'>You do not have access to this resource</p>
                        <Button href="/" size="lg" className='error_button'> Home </Button>
                    </FlexboxGridItem>


                </FlexboxGrid>

            </div>
        </div>
    )
}

export default noAccess