import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Education() {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>{t("educationPage.title")}</h1>
        <p>{t("educationPage.description")}</p>
      </div>
    </div>
  );
}

export default Education;