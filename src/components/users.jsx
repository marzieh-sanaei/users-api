import React, { Component } from "react";
import axios from "axios";
import LoadingUsers from "./loading/loadingUsers";
import './../index.css'

class Users extends React.Component {
  state = {
    users: [],
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      this.setState({ users: response.data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      this.setState({ error: "An error occurred while fetching users." });
    }
  }
  render() {
    const { users, isLoading, error } = this.state;
    return (
      <>
        {error && <p className="error-message">{error}</p>}
        <div className="row g-0">
          {isLoading ? (
            <LoadingUsers />
          ) : (
            users.map((user) => {
              return (
                <div className="col-lg-4 col-md-6 text-center p-5">
                  <div className="wrapper-card rounded">
                    <img
                      src={user.avatar}
                      style={{ width: "100px" }}
                      alt="avatar image"
                      className="rounded-circle mb-1"
                    />
                    <h4>
                      {user.first_name} {user.last_name}
                    </h4>
                    <h6>{user.email}</h6>
                    <div className="row g-0">
                      <div className="col-6">
                        <button
                          onClick={() => {
                            this.handleUpdate(user);
                          }}
                          className="btn btn-info btn-sm"
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          onClick={() => {
                            this.handleDelete(user);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }

  handleUpdate = async (user) => {
    user.first_name = "updated";
    const response = await axios.put(
      `https://reqres.in/api/users/${user.id}`,
      user
    );
    const updatedUsers = [...this.state.users];
    const index = updatedUsers.indexOf(user);
    updatedUsers[index] = { ...user };
    this.setState({ users: updatedUsers });
  };

  handleDelete = async (user) => {
    await axios.delete(`https://reqres.in/api/users/${user.id}`);
    const newUsers = this.state.users.filter((u) => u.id !== user.id);
    this.setState({ users: newUsers });
  };
}

export default Users;
