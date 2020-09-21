import { renderHook, act } from "@testing-library/react-hooks";

import { waitForNextUpdateWithError } from "../../../../utils/waitForNextUpdateWithError";

import { useTableSelect } from "./index";

const data = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

describe("test useTableSelect hook", () => {
  it("check selectedRows after use useTableSelect", () => {
    const { result } = renderHook(() => useTableSelect("id"));

    expect(result.current.selectedRows.length).toBe(0);
  });

  it("should call setSelectedRows", () => {
    const { result } = renderHook(() => useTableSelect("id"));

    act(() => {
      result.current.setSelectedRows(data);
    });

    expect(result.current.selectedRows.length).toBe(3);
  });

  it("should call getActiveRow", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useTableSelect("id")
    );

    act(() => {
      const isActive = result.current.getActiveRow({ id: "1" });

      expect(isActive).toBe(false);
    });

    act(() => {
      result.current.setSelectedRows(data);
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    act(() => {
      const isActive = result.current.getActiveRow({ id: "1" });

      expect(isActive).toBe(true);
    });
  });

  it("should call getRadioButtonProps", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useTableSelect("id")
    );

    act(() => {
      const {
        hasRadioBtnInState,
        handleChangeRadioBtn,
      } = result.current.getRadioButtonProps({
        original: { id: "1" },
      });

      expect(handleChangeRadioBtn()).toBe(true);
      expect(hasRadioBtnInState).toBe(false);
    });

    act(() => {
      result.current.setSelectedRows(data);
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    act(() => {
      const {
        hasRadioBtnInState,
        handleChangeRadioBtn,
      } = result.current.getRadioButtonProps({
        original: { id: "1" },
      });

      expect(handleChangeRadioBtn()).toBe(undefined);
      expect(hasRadioBtnInState).toBe(true);
    });
  });

  it("should call getCheckBoxProps", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useTableSelect("id")
    );

    act(() => {
      const {
        hasCheckBoxInState,
        handleChangeCheckBox,
      } = result.current.getCheckBoxProps({
        original: { id: "1" },
      });

      expect(handleChangeCheckBox()).toBe(undefined);
      expect(hasCheckBoxInState).toBe(false);
    });

    act(() => {
      result.current.setSelectedRows(data);
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    act(() => {
      const {
        hasCheckBoxInState,
        handleChangeCheckBox,
      } = result.current.getCheckBoxProps({
        original: { id: "1" },
      });

      expect(handleChangeCheckBox()).toBe(undefined);
      expect(hasCheckBoxInState).toBe(true);
    });
  });

  it("should call getToggleAllCheckboxProps", async () => {
    const localData = [{ id: "1" }];

    const { result, waitForNextUpdate } = renderHook(() =>
      useTableSelect("id")
    );

    act(() => {
      const {
        isChecked,
        selectAllRow,
      } = result.current.getToggleAllCheckboxProps(localData);

      expect(isChecked).toBe(false);
      selectAllRow();
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    expect(result.current.selectedRows).toEqual(localData);

    act(() => {
      const {
        isChecked,
        selectAllRow,
      } = result.current.getToggleAllCheckboxProps(localData);

      expect(isChecked).toBe(true);
      selectAllRow();
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    expect(result.current.selectedRows).toEqual([]);
  });

  it("should call getToggleAllCheckboxProps with scroll pagination", async () => {
    const localData = [{ id: "1" }];

    const { result, waitForNextUpdate } = renderHook(() =>
      useTableSelect("id", "scroll")
    );

    act(() => {
      result.current.setSelectedRows(data);
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    act(() => {
      const {
        isChecked,
        selectAllRow,
      } = result.current.getToggleAllCheckboxProps(localData);

      expect(isChecked).toBe(true);
      selectAllRow();
    });

    await waitForNextUpdateWithError(waitForNextUpdate);

    expect(result.current.selectedRows).toEqual([]);
  });
});
