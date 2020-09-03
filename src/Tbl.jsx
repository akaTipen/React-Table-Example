import "./css/jquery.dataTables.css";
import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";

const $ = require("jquery");
//require("datatables.net")(window, $);
$.Datatable = require("datatables.net");

export default class Tbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  async getUsersData() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ loading: false, users: res.data });
  }

  componentDidMount() {
    this.getUsersData().then(() => this.sync());
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable({
      data: this.state.users,
      columns: [
        { title: "Name", data: "name" },
        { title: "Username", data: "username" },
        { title: "Email", data: "email" },
        { title: "Phone", data: "phone" },
        { title: "Website", data: "website" },
      ],
    });
  }

  render() {
    return (
      <Row>
        <Col xs="12">
          <table
            className="display"
            width="100%"
            ref={(el) => (this.el = el)}
          ></table>
        </Col>
      </Row>
    );
  }
}
