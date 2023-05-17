const UserForm = ({ createUser, currentUser, isLoading, editUser }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault(); 

    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: "123456",
    };

    if(currentUser) {
      editUser(currentUser.id, user);
      return;
    }

    createUser(user);

    event.target.reset();
  };

  return (
    <form
      className="flex gap-5 bg-gray-100 p-5 rounded-lg"
      onSubmit={onSubmitHandler}
    >
      <input
        className="border border-gray-400 p-2 rounded-lg w-full"
        type="text"
        name="name"
        id="name"
        placeholder="Nome"
        required
        defaultValue={currentUser?.name}
      />
      <input
        className="border border-gray-400 p-2 rounded-lg w-full"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        defaultValue={currentUser?.email}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-1/2 disabled:opacity-50"
        disabled={isLoading}
      >
        {!currentUser ? "Adicionar" : "Editar"}
      </button>
    </form>
  );
};

export default UserForm;
