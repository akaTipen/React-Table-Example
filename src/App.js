import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavLink, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import FormPage from "./FormPage";
import Tbl from "./Tbl";
import Main from "./Main";
import React_Table_V6 from "./React_Table_V6";
import React_Table_V7 from "./React_Table_V7";
import React_Data_Table from "./React_Data_Table";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <header className="App App App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Navbar color="navbar navbar-dark bg-primary" expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/FormPage" className="nav-link">
                Form Page
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Tbl" className="nav-link">
                DataTables Page
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/React_Table_V6" className="nav-link">
                React-Table V6 Page
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/React_Table_V7" className="nav-link">
                React-Table V7 Page
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/React_Data_Table" className="nav-link">
                React-Data-Table-Component Page
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>

      <Container className="themed-container" fluid={true}>
        <Row>
          <Col>
            <div>
              <br />
            </div>
          </Col>
        </Row>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/FormPage" component={FormPage}></Route>
          <Route path="/Tbl" component={Tbl}></Route>
          <Route path="/React_Table_V6" component={React_Table_V6}></Route>
          <Route path="/React_Table_V7" component={React_Table_V7}></Route>
          <Route path="/React_Data_Table" component={React_Data_Table}></Route>
        </Switch>
      </Container>

      <div
        className="footer d-none d-sm-block"
        style={{
          clear: "both",
          textAlign: "center",
          height: 70,
          padding: 10,
          marginTop: 20,
          backgroundColor: "lightblue",
          fontWeight: "bold",
        }}
      >
        <Container className="themed-container" fluid={true}>
          <span className="text-muted">Place sticky footer content here.</span>
        </Container>
      </div>
    </div>
  );
}

export default App;
