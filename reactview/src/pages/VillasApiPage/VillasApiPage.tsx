import Header from "../../components/Header/Header";
import VillasApi from "../../components/VillasApi/VillasApi";
import { getUserFromLocalStorage } from "../../utils/localStorage/usersToLS";

const VillasApiPage = () => {
  const userData = getUserFromLocalStorage();

  const userName = userData?.name;
  const userSurname = userData?.surname;

  return (
    <div>
      <Header name={userName} surname={userSurname} />
      <VillasApi />
    </div>
  );
};

export default VillasApiPage;
