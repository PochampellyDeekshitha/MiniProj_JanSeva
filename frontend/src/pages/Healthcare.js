import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Healthcare() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>{t("healthcarePage.title")}</h1>
        <p>{t("healthcarePage.description")}</p>
      </div>
    </div>
  );
}

export default Healthcare;