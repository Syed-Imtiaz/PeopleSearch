import React from 'react';
import { Form, List, Header, Message } from 'semantic-ui-react';

export default () => {
  return (
    <div>
      <Header size='large'>The People Search Application</Header>

      <Message
        attached='top'
        header='About Application'
      />
      <Form className='attached fluid segment'>
        <List bulleted>
          <List.Item>This application is built using .Net Core, React and Semantic UI.</List.Item>
          <List.Item>The application uses EF Core to communicate with database and is using In-Memory database.</List.Item>
          <List.Item>It generates random data in the begining and then allow user to filter people data providing search criteria for First or Last Name.</List.Item>
          <List.Item>It also allows user to filter the list on Gender.</List.Item>
        </List>
      </Form>

      <Message
        attached='top'
        header='Business Requirements'
      />
      <Form className='attached fluid segment'>
        <List bulleted>
          <List.Item>The application accepts search input in a text box and then displays in a pleasing style a list of people where any part of their first or last name matches what was typed in the search box (displaying at least name, address, age, interests, and a picture).</List.Item>
          <List.Item>Solution should either seed data or provide a way to enter new users or both.</List.Item>
          <List.Item>Simulate search being slow and have the UI gracefully handle the delay.</List.Item>
        </List>
      </Form>

      <Message
        attached='top'
        header='Technical Requirements'
      />
      <Form className='attached fluid segment'>
        <List bulleted>
          <List.Item>A Web Application using WebAPI and a front-end JavaScript framework (e.g., Angular, AngularJS, React, Aurelia, etc.).</List.Item>
          <List.Item>Use an ORM framework to talk to the database.</List.Item>
          <List.Item>Unit Tests for appropriate parts of the application.</List.Item>
        </List>
      </Form>
    </div>
  )
}
