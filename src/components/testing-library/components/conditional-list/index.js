import React from "react";

export const ConditionalList = ({
  data,
  renderExist,
  renderEmpty,
  error,
  loading,
}) => {
  if (!data) {
    return <h1>Данных нет</h1>;
  }

  if (error) {
    return <h1>При получении данных произошла ошибка</h1>;
  }

  if (loading) {
    return <div className="spiner" />;
  }

  return data.filter(Boolean).length > 0 ? renderExist(data) : renderEmpty();
};
