export async function waitForNextUpdateWithError(waitForNextUpdate) {
  try {
    await waitForNextUpdate({ timeout: 100 });
  } catch (err) {
    expect(err.timeout).toBeTruthy();
  }
}
