import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class AttendanceForm extends React.Component {
  render() {
    return (
      <div>
        <Form style={{padding: '2rem', paddingTop:'1rem'}}>
          <FormGroup>
            <Label>SID</Label>
            <Input type="number" name="SID" id="SID" placeholder="Enter 10-digit SID" />
          </FormGroup>
          <FormGroup>
            <Label>First Name</Label>
            <Input type="text" name="FirstName" id="FirstName" placeholder="Enter First Name" />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input type="text" name="LastName" id="FirstName" placeholder="Enter Last Name" />
          </FormGroup>
          {/*
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above input.
              It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Radio Buttons</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option one is this and that—be sure to include why it's great
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option two can be something else and selecting it will deselect option one
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" disabled />{' '}
                Option three is disabled
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
            </Label>
          </FormGroup>
          */}
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}