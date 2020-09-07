import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Website",
    accessor: "website",
  },
];

export default class React_Table_V6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      toggledClearRows: false,
    };
  }

  async getUsersData() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ loading: false, users: res.data });
  }

  componentDidMount() {
    this.getUsersData();
  }

  render() {
    return (
      <Row>
        <Col className="col" xs="12">
          <ReactTable
            className="table"
            data={this.state.users}
            columns={columns}
          />
        </Col>
      </Row>
    );
  }
}
