"use client";
import { useEffect, useState } from "react";
import { baseURL } from "../services/api";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const notify = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: type,
      theme: "light",
    });
  };

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/user/list`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      setUsers([]);
    }

    setIsLoading(false);
  };

  const createUser = async (user) => {
    setIsLoading(true);

    await fetch(`${baseURL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode == 200) {
          notify(`${data.message}`, "success");
          fetchUsers();
          return;
        }

        notify(`${data.message}`, "error");
      });
    setIsLoading(false);
  };

  const deleteUser = async (id) => {
    await fetch(`${baseURL}/user/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode == 200) {
          notify(`${data.message}`, "success");
          fetchUsers();
          return;
        }

        notify(`${data.message}`, "error");
      });
  };

  const editUser = async (id, user) => {
    setIsLoading(true);

    await fetch(`${baseURL}/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode == 200) {
          notify(`${data.message}`, "success");
          fetchUsers();
          return;
        }

        notify(`${data.message}`, "error");
      });

    setCurrentUserId("");
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="gap-10">
      <UserForm
        createUser={createUser}
        isLoading={isLoading}
        editUser={editUser}
        currentUser={
          currentUserId
            ? users.find((user) => user.id === currentUserId)
            : undefined
        }
      />

      <UserList
        users={users}
        onDelete={deleteUser}
        onEdit={(id) => setCurrentUserId(id)}
        isLoading={isLoading}
      />

      <ToastContainer />
    </main>
  );
}
