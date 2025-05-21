import Header from "../../components/Header/Header";
import CreateVilla from "../../components/CreateVilla/CreateVilla";
import { getUserFromLocalStorage } from "../../utils/localStorage/usersToLS";
import { fetchVilla } from "../../utils/villas/villas";

const CreateVillaPage = () => {
  const userData = getUserFromLocalStorage();

  const userName = userData?.name;
  const userSurname = userData?.surname;

  return (
    <div>
      <Header name={userName} surname={userSurname} />
      <CreateVilla />
    </div>
  );
};

export default CreateVillaPage;
