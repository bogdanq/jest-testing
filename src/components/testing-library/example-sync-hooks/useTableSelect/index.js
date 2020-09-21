import _ from "lodash";
import { useCallback, useState } from "react";

export const useTableSelect = (uniqKey, pagination = "pages") => {
  const [selectedRows, setSelectedRows] = useState([]);

  const getActiveRow = useCallback(
    (row) => {
      const foundRow = selectedRows.find(
        (item) => item[uniqKey] === row[uniqKey]
      );

      return Boolean(foundRow);
    },
    [selectedRows, uniqKey]
  );

  const checkRowInStateByKey = useCallback(
    (name) => {
      const foundRow = selectedRows.find((item) => item[uniqKey] === name);

      return Boolean(foundRow);
    },
    [selectedRows, uniqKey]
  );

  const getToggleCheckboxValue = useCallback(
    (data) => {
      return data.every((item) => {
        return selectedRows.find((local) => local[uniqKey] === item[uniqKey]);
      });
    },
    [selectedRows, uniqKey]
  );

  const getToggleAllCheckboxProps = useCallback(
    (data) => {
      const isChecked = getToggleCheckboxValue(data);

      return {
        selectAllRow: () => {
          if (!isChecked) {
            return setSelectedRows((prev) => [...prev, ...data]);
          }

          setSelectedRows((prev) => {
            if (pagination === "pages") {
              const diff = _.differenceWith(prev, data, (a, b) => {
                return a[uniqKey] === b[uniqKey];
              });

              return diff;
            }

            return [];
          });
        },
        isChecked,
      };
    },
    [getToggleCheckboxValue, pagination, uniqKey]
  );

  const getCheckBoxProps = useCallback(
    (row) => {
      const hasCheckBoxInState = checkRowInStateByKey(row.original[uniqKey]);

      return {
        handleChangeCheckBox: () => {
          if (hasCheckBoxInState) {
            return setSelectedRows((prev) =>
              prev.filter((item) => item[uniqKey] !== row.original[uniqKey])
            );
          }

          return setSelectedRows((prev) => [...prev, row.original]);
        },
        hasCheckBoxInState: Boolean(hasCheckBoxInState),
      };
    },
    [checkRowInStateByKey, uniqKey]
  );

  const getRadioButtonProps = useCallback(
    (row) => {
      const hasRadioBtnInState = checkRowInStateByKey(row.original[uniqKey]);

      return {
        handleChangeRadioBtn: () => {
          if (!hasRadioBtnInState) {
            setSelectedRows([row.original]);

            return true;
          }
        },
        hasRadioBtnInState: Boolean(hasRadioBtnInState),
      };
    },
    [checkRowInStateByKey, uniqKey]
  );

  return {
    selectedRows,
    setSelectedRows,
    getToggleAllCheckboxProps,
    getCheckBoxProps,
    getRadioButtonProps,
    getActiveRow,
  };
};
