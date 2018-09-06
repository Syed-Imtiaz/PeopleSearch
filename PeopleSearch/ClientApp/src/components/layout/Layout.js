import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Grid } from 'semantic-ui-react';

export default props => (
  <Grid style={{ marginLeft: '10px', marginRight: '10px' }}>
    <Grid.Row>
      <Grid.Column width={16}>
        <Header/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{ marginTop: '2em' }}>
      <Grid.Column width={16}>
        {props.children}
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16}>
        <Footer/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
