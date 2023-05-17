import { FaTrash, FaUserEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const UserItem = ({ user, onDelete, onEdit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    await onDelete(user.id);
    setIsLoading(false);
  };

  return (
    <tr
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500"
      key={user.id}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {user.id.split("-")[0]}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
      <td className="whitespace-nowrap px-6 py-4 flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex item-center"
          title="editar"
          onClick={() => onEdit(user.id)}
          disabled={isLoading}
        >
          <FaUserEdit />
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          title="deletar"
          onClick={deleteHandler}
        >
          {isLoading ? <ClipLoader size={16} color="white" /> : <FaTrash />}
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
