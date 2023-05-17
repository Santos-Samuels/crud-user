import UserItem from "./UserItem";

const UserList = ({ users, onDelete, onEdit, isLoading }) => {
  if (isLoading) {
    return (
      <section className="flex-1 flex items-center justify-center mt-10">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </section>
    );
  }

  return (
    <section className="flex-1">
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Nome
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem user={user} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserList;
