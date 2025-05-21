import Header from "../../components/Header/Header";
import CreateVillaNumber from "../../components/CreateVillaNumber/CreateVillaNumber";
import { getUserFromLocalStorage } from "../../utils/localStorage/usersToLS";
import { fetchVilla } from "../../utils/villas/villas";

const CreateVillaNumberPage = () => {
  const userData = getUserFromLocalStorage();

  const userName = userData?.name;
  const userSurname = userData?.surname;

  return (
    <div>
      <Header name={userName} surname={userSurname} />
      <CreateVillaNumber />
    </div>
  );
};

export default CreateVillaNumberPage;
