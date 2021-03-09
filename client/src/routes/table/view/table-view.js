import React from "react";
import DeletePopUp from "../../../widgets/pop-ups/delete-pop-up/delete-pop-up";
import "./table-view.css";

const mock_data = [
  {
    table_name: "Tracking",
    size: "1 GB",
    no_of_colums: 5,
    no_of_entries: 500,
    date_created: new Date().toLocaleDateString(),
  },
];

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      show_delete_prompt: false,
    };
    this.table_to_delete = "";
    this.deleteTable = this.deleteTable.bind(this);
    this.changeDeleteModalState = this.changeDeleteModalState.bind(this);
  }

  changeDeleteModalState(state, table_to_delete) {
    this.table_to_delete = table_to_delete;
    this.setState({ show_delete_prompt: state });
  }

  deleteTable() {
    console.log(this.table_to_delete);
    this.setState({is_loading: true});
  }

  render() {
    return (
      <div id="table-view-container">
        <DeletePopUp
          show={this.state.show_delete_prompt}
          openModal={this.changeDeleteModalState}
          deleteData={this.deleteTable}
          delete_name="table"
          loading={this.state.is_loading}
        />
        <label className="center-label page-label">
          Tables in the <span id="db-name-selected">Trivia</span> Database
        </label>
        <hr className="header-hr" />
        <div className="row">
          {mock_data.map((db, index) => {
            return (
              <div key={index} className="col-4 custom-card">
                <label className="center-label db-name-label">
                  {db.table_name}
                </label>
                <hr className="header-hr" />
                <label>Number of Entries: {db.no_of_entries} records</label>
                <br />
                <label>Number of Columns: {db.no_of_colums} columns</label>{" "}
                <br />
                <label>Size: {db.size}</label> <br />
                <label>Date Created: {db.date_created}</label>
                <br />
                <a href="/data">
                  <div className="button view-more-button">View Data</div>
                </a>
                <a href="/table/edit">
                  <div className="button edit-button">Edit</div>
                </a>
                <div
                  className="button delete-button"
                  onClick={() => {
                    this.changeDeleteModalState(true, db.table_name);
                  }}
                >
                  DELETE
                </div>
                <a href="/table">
                  <div className="button delete-button">Wipe Data</div>
                </a>
              </div>
            );
          })}
          <div key={mock_data.length} className="col-4 custom-card">
            <a href="/databases">
              <label className="center-label" id="add-new-db-label">
                ADD A NEW TABLE
              </label>
              <hr className="header-hr" />
              <i className="fas fa-plus fa-7x big-plus"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default TableView;
