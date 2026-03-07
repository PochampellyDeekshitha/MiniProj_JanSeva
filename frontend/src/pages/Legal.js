import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Legal() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>{t("legalPage.title")}</h1>
        <p>{t("legalPage.description")}</p>
      </div>
    </div>
  );
}

export default Legal;