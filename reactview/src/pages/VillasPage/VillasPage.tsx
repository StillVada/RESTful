import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import VillasList from "../../components/VillasList/VillasList";
import { getUserFromLocalStorage } from "../../utils/localStorage/usersToLS";

interface UserData {
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
}

const VillasPage = () => {
  const userData = getUserFromLocalStorage();

  const userName = userData?.name;
  const userSurname = userData?.surname;

  return (
    <div>
      <Header name={userName} surname={userSurname} />
      <VillasList />
    </div>
  );
};

export default VillasPage;
