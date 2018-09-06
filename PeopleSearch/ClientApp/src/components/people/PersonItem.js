import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InterestItem from './InterestItem';
import { Modal, Button, Grid, Header, Image, Card, Segment, Label } from 'semantic-ui-react'

var dateFormat = require('dateformat');

class PersonItem extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  
  render() {
    const { person } = this.props;
    const { open, dimmer } = this.state;

    let gridColumns = 3;
    let imgUrl = person.imageUrl;
    if (imgUrl.length === 0)
    {
      if (person.gender === 'Male')
        imgUrl = "./assets/img/default-male.png";
      else
        imgUrl = "./assets/img/default-female.png";
    }


    const extra = (
      <Grid columns={2}>
        <Grid.Column>
        <Button
      content='View Details'
      icon='user'
      primary
      onClick={this.show('inverted')}
      />
        </Grid.Column>
        <Grid.Column textAlign='right'>
        <Label textAlign='right'>Last Modified: {dateFormat(person.lastModified, "dd/mm/yyyy hh:MM:ss TT")}</Label>
        </Grid.Column>
      </Grid>
    )

    const meta = (
      <div>
        {person.age} years {person.gender}
      </div>
    )

    const desc = (
      <Grid columns={gridColumns}>
        <Grid.Column>
          <Segment basic>
            <Header size='mini'>Address:</Header>
            {person.address}
            <br/>{person.city}
            <br/>{person.state} {person.zip}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic>
            <Header size='mini'>Interest:</Header>
            <ul className="list-group">
              {person.interests.split(',').map((interest, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                    {interest.split(':')[0]}
                    <InterestItem key={interest} level={interest.split(':')[1] * 10} />
                </li>
              ))}
            </ul>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic>
            <Image floated='right' size='medium' style={{ maxHeight: 100, maxWidth: 80 }} src={imgUrl} />
          </Segment>
        </Grid.Column>
      </Grid> 
    )

    return (
        <Card>
          <Card.Content>
            <Card.Header>{person.firstName} {person.lastName} 
              <Label color='orange' size='tiny' floating>
              {person.personId}
              </Label>
            </Card.Header>
            <Card.Meta>{meta}</Card.Meta>
            <Card.Description>
              {desc}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {extra}
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
              <Modal.Header style={{ backgroundColor: '#f8f8f9' }}>
                <Grid columns={2}>
                  <Grid.Column>
                    {person.firstName} {person.lastName}
                  </Grid.Column>
                  <Grid.Column textAlign='right'>
                    PersonId: {person.personId}
                  </Grid.Column>
                </Grid>
              </Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  {meta}
                  {desc}
                  <Label>Birth Date: {dateFormat(person.dateOfBirth, "dd/mm/yyyy")}</Label><br/>
                  <Label>Last Modified: {dateFormat(person.lastModified, "dd/mm/yyyy hh:MM:ss TT")}</Label>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='teal' onClick={this.close}>
                  Close
                </Button>
              </Modal.Actions>
            </Modal>
          </Card.Content>
        </Card>        
    );
  }
}

PersonItem.propTypes = {
  person: PropTypes.object.isRequired
};

export default PersonItem;
