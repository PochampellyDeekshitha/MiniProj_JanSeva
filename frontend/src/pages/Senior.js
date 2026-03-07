import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Senior() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>{t("seniorPage.title")}</h1>
        <p>{t("seniorPage.description")}</p>
      </div>
    </div>
  );
}

export default Senior   ;