import Header from "../../components/Header/Header";
import VillasNumbersApi from "../../components/VillasNumbersApi/VillasNumbersApi";
import { getUserFromLocalStorage } from "../../utils/localStorage/usersToLS";

const userData = getUserFromLocalStorage();

const userName = userData?.name;
const userSurname = userData?.surname;

const VillasNumbersApiPage = () => {
  return (
    <div>
      <Header name={userName} surname={userSurname} />
      <VillasNumbersApi />
    </div>
  );
};

export default VillasNumbersApiPage;
