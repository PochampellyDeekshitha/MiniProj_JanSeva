import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Farmer() {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>{t("farmerPage.title")}</h1>
        <p>{t("farmerPage.description")}</p>
      </div>
    </div>
  );
}

export default Farmer;