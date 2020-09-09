export const usePooling = (queryResult, status, time) => {
  const { startPolling, stopPolling, loading } = queryResult;

  if (loading) {
    queryResult.loading = true;
    return;
  }

  if (startPolling && stopPolling && status) {
    if (status === "PENDING") {
      queryResult.loading = true;
      queryResult.startPolling(time ? time : 2000);
    } else {
      queryResult.loading = false;
      queryResult.stopPolling();
    }
  }
};
