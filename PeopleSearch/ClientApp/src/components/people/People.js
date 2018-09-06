import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import PersonItem from "./PersonItem";
import { actionCreators } from "../../store/People";
import {
  Modal,
  Progress,
  Grid,
  Segment,
  Label,
  Input,
  Button,
  Card,
  Header
} from "semantic-ui-react";

class People extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "Both",
      view: "grid",
      itemsPerRow: 3,
      open: false,
      percent: 30,
      current: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.searchPeople('');
  }

  componentWillMount() {
    // // This method runs when the component is first added to the page
    // const personName = this.props.match.params.personName || "";
    // this.props.searchPeople(personName);
  }

  componentWillReceiveProps(nextProps) {
    // // This method runs when incoming props (e.g., route params) change
    // const personName = nextProps.match.params.personName || "";
    // this.props.searchPeople(personName);
  }

  handleGenderClick = e => this.setState({ gender: e.target.innerText });
  handleViewClick = e => {
    if (this.state.view === "grid") {
      this.setState({ view: "list" });
      this.setState({ itemsPerRow: 1 });
    } else {
      this.setState({ view: "grid" });
      this.setState({ itemsPerRow: 3 });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  show = dimmer => () => {
    this.setState({ dimmer, open: true });
  };

  close = () => this.setState({ open: false });

  render() {
    const { person, people } = this.props;
    const { open, dimmer } = this.state;
    const dummyRows = [
      { key: 1, text: "50", value: 50 },
      { key: 2, text: "100", value: 100 },
      { key: 3, text: "200", value: 200 },
      { key: 4, text: "500", value: 500 }
    ];

    const options = [
      { key: "all", text: "All", value: "all" },
      { key: "male", text: "Male", value: "male" },
      { key: "female", text: "Female", value: "female" }
    ];

    const loading = false;
    let personItems;

    if (people === null || loading || people.length === 0) {
      personItems = <Spinner />;
    } else {
      if (people.length > 0) {
        personItems = people
          .filter(
            person =>
              (this.state.gender === "Both" ||
                person.gender === this.state.gender) &&
              (this.state.name === "" ||
                person.firstName
                  .toLowerCase()
                  .indexOf(this.state.name.toLowerCase()) !== -1 ||
                person.lastName
                  .toLowerCase()
                  .indexOf(this.state.name.toLowerCase()) !== -1)
          )
          .map(person => <PersonItem key={person.personId} person={person} />);
      } else {
        personItems = <h4>No people found for given name...</h4>;
      }
    }

    return (
      <div className="people">
        <Header size="large">People Search</Header>
        <Grid columns={3}>
          <Grid.Column>
            <Segment basic>
              <Input
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                icon="search"
                placeholder="Search..."
              />
              <Button.Group
                style={{ marginBottom: "10px", marginLeft: "40px" }}
                size="medium"
                onClick={this.handleGenderClick.bind(this)}
              >
                <Button
                  type="button"
                  active={this.state.gender === "Both"}
                  positive={this.state.gender === "Both"}
                >
                  Both
                </Button>
                <Button.Or />
                <Button
                  type="button"
                  active={this.state.gender === "Male"}
                  positive={this.state.gender === "Male"}
                >
                  Male
                </Button>
                <Button.Or />
                <Button
                  type="button"
                  active={this.state.gender === "Female"}
                  positive={this.state.gender === "Female"}
                >
                  Female
                </Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment basic>
              <Label>
                Matching: {personItems.length} / {people.length}
              </Label>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Segment basic>
              <Button.Group
                size="medium"
                onClick={this.handleViewClick.bind(this)}
              >
                <Button
                  type="button"
                  active={this.state.view === "grid"}
                  positive={this.state.view === "grid"}
                  icon="grid layout"
                  text="grid"
                />
                <Button
                  type="button"
                  active={this.state.view === "list"}
                  positive={this.state.view === "list"}
                  icon="list layout"
                  text="list"
                />
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {personItems}
        </Card.Group>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header style={{ backgroundColor: "#f8f8f9" }}>
            Data Generation
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Progress
                percent={this.state.percent}
                size="medium"
                color="teal"
                active
                progress
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="teal" onClick={this.close}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

People.propTypes = {
  //getPeople: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person
});

export default connect(
  state => state.people,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(People);
