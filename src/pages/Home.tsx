/* eslint-disable @typescript-eslint/no-unused-vars */
import { TokenMintForm } from "@/components/dummiWeb3/TokenMintForm";
import { useCreateUser, useDeleteUser, useUsers } from "@/hooks/api/useUsers";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("common");

  const { data: users, isLoading } = useUsers();
  const { mutate: createUser } = useCreateUser();
  const { mutate: deleteUser } = useDeleteUser();

  // Loading Module 
  // if (isLoading) return <p>Loading users...</p>;

  console.log("users", users);

  const createUserFunction = () => {
    createUser({ name: "John Doe", email: "john@example.com" });
  };

  const deleteUserFunction = (id: number) => {
    deleteUser(id);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold">{t("welcome")}</h1>
        <p className="mt-2 text-gray-600">This is the home page.</p>
        <TokenMintForm />
      </div>
    </>
  );
};

export default Home;
