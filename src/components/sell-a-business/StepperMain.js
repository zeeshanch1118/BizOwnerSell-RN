import React from 'react'
// import LinearStepper from './LinearStepper'
import {CssBaseline, Container, Paper, Box} from '@material-ui/core'
import LinaerStepper from './LinearStepper'

export default function StepperMain() {
  return (
    <div>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          {/* <LinearStepper /> */}
          <LinaerStepper />
        </Paper>
      </Container>
    </div>
  )
}
