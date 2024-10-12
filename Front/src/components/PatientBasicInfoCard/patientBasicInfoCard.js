import React from 'react'
import { Panel, Placeholder, Stack, ButtonGroup, Button } from 'rsuite';


const patientBasicInfoCard = (props) => {
  return (
    <div>
        <Panel
            bordered
            header={
            <Stack justifyContent="space-between">
                <span>Report Title</span>
                <ButtonGroup>
                <Button active>{props.name}</Button>
                <Button>Week</Button>
                <Button>Month</Button>
                </ButtonGroup>
            </Stack>
            }
        >
            <Placeholder.Paragraph rows={5} graph="image" />
        </Panel>
    </div>
  )
}

export default patientBasicInfoCard