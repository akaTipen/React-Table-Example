import React, { useState, useEffect } from "react";
import ArtistsDataService from "../services/ArtistsService";
// import { Link } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import DataTable, { defaultThemes } from "react-data-table-component";

const customStyles = {
  header: {
    style: {
      minHeight: '56px',
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};

const columns = [
  {
    name: "ID",
    selector: "artistId",
    sortable: true,
  },
  {
    name: "Name",
    selector: "artistName",
  },

  {
    name: "Album name",
    selector: "albumName",
  },
  {
    name: "Image URL",
    selector: "imageUrl",
  },
  {
    name: "Release Date",
    selector: "releaseDate",
  },
  {
    name: "Price",
    selector: "price",
  },
  {
    name: "Sample URL",
    selector: "sampleURL",
  },
];

const ArtistsList = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setArtist(initiallState);
  }

  const initiallState = {
    artistId: null,
    artistName: "",
    albumName: "",
    imageUrl: "",
    releaseDate: new Date(),
    price: 0.00,
    sampleURL: "",
  };
  const [artist, setArtist] = useState(initiallState);

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    retrieveArtists(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveArtists = async (page) => {
    setLoading(true);
    ArtistsDataService.getAll(page, perPage)
      .then(response => {
        setArtists(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handlePageChange = (page) => {
    retrieveArtists(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    ArtistsDataService.getAll(page, newPerPage)
      .then(response => {
        setArtists(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArtist({ ...artist, [name]: value });
  };

  const saveArtist = () => {
    var data = {
      artistId: artist.artistId,
      artistName: artist.artistName,
      albumName: artist.albumName,
      imageUrl: artist.imageUrl,
      releaseDate: new Date(),
      price: 0.00,
      sampleURL: artist.sampleURL,
    };

    ArtistsDataService.create(data)
      .then(response => {
        toggle();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Row>
      <Col className="mb1" xs="12">
        <Button color="success" onClick={toggle}>Add New</Button>
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="txtName">Name</Label>
                <Input
                  type="name"
                  id="txtName"
                  placeholder="Enter Artist Name"
                  value={artist.artistName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="txtAlbumName">Album Name</Label>
                <Input
                  type="email"
                  id="txtAlbumName"
                  placeholder="Enter Album Name"
                  value={artist.albumName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <br />
              <Button onClick={saveArtist}>Submit</Button>
            </Form>

          </ModalBody>
        </Modal>
      </Col>
      <Col className="mb1" xs="12">
        <DataTable
          columns={columns}
          data={artists}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          noHeader={true}
          highlightOnHover={true}
          striped={true}
          customStyles={customStyles}
        />
      </Col>
    </Row>
  );
};

export default ArtistsList;