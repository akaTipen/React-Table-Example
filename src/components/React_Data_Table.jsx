import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";

import DataTable from "react-data-table-component";

const handleChange = (state) => {
  console.log("Selected Rows: ", state.selectedRows);
};

const columns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
  },
  {
    name: "Name",
    selector: "name",
  },

  {
    name: "Username",
    selector: "username",
  },
  {
    name: "Phone",
    selector: "phone",
  },
  {
    name: "Email",
    selector: "email",
  },
  {
    name: "Website",
    selector: "website",
  },
];

export default class React_Data_Table extends Component {
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
          <DataTable
            columns={columns}
            data={this.state.users}
            selectableRows // add for checkbox selection
            onSelectedRowsChange={handleChange}
            clearSelectedRows={this.state.toggledClearRows}
            pagination
          />
        </Col>
      </Row>
    );
  }
}
