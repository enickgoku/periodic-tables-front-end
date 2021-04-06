import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-time";

/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 * This function is NOT exported because it is not needed outside of this file.
 * @param url
 *  the url for the request.
 * @param options
 *  any options for fetch.
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations by date.
 * @param {object} params
 *  a search query that contains one of the following: `date`.
 * @param {AbortSignal} signal
 *  the optional `AbortSignal` for rejecting the `.fetch()` promise.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservations saved in the database.
 */
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves all existing tables by status.
 * @param {object} params
 *  `{ status: all }`, `{ status: free }`, or `{ status: occupied }`.
 *  
 * @param {AbortSignal} signal
 *  the optional `AbortSignal` for rejecting the `.fetch()` promise.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */
export async function listTables(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Gets a specific reservation by `reservation_id`.
 * @param {object} reservationId
 *  the `reservation_id` to be found in the database.
 * @param {AbortSignal} signal
 *  the optional `AbortSignal` for rejecting the `.fetch()` promise.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successful `GET` request of the reservation.
 */
export async function getReservation(reservationId, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  return await fetchJson(url, { headers, signal })
}

/**
 * Gets a specific table by `table_id`.
 * @param {integer} tableId
 *  the `table_id` to be found in the database.
 * @param {AbortSignal} signal
 *  the optional `AbortSignal` for rejecting the `.fetch()` promise.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successful `GET` request of the table.
 */
export async function getTable(tableId, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}`);
  return await fetchJson(url, { headers, signal })
}

/**
 * Create a new reservation.
 * @param reservation
 *  the `formData` from the `CreateReservationForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successful `POST` request.
 */
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Create a new table.
 * @param table
 *  the `formData` from the `CreateTableForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successful `POST` request.
 */
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(table),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Updates a specific reservation by `reservation_id`.
 * @param {object} table
 *  the `formData` from the `EditReservationForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successfully updated reservation.
 */
export async function editReservation(reservation, reservationId) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}/edit`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(reservation)
  };
  return await fetchJson(url, options);
}

/**
 * Updates a specific table by `table_id`.
 * @param {object} table
 *  the `formData` from the `EditTableForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successfully updated table.
 */
export async function editTable(table, tableId) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/edit`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(table)
  };
  return await fetchJson(url, options);
}

/**
 * Updates a specific table by `table_id`.
 * @param {object} table
 *  the `formData` from the `EditTableForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successfully updated table.
 */
export async function deleteReservation(reservationId) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  const options = {
    method: "DELETE",
    headers
  };
  return await fetchJson(url, options);
}

/**
 * Updates a specific table by `table_id`.
 * @param {object} table
 *  the `formData` from the `EditTableForm` submission.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successfully updated table.
 */
export async function deleteTable(tableId) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}`);
  const options = {
    method: "DELETE",
    headers
  };
  return await fetchJson(url, options);
}

/**
 * Assigns a `reservation_id` to a specific `table_id`.
 * This assignment is the key determinant of the current status of the table.
 * @param {integer} reservationId
 *  the `reservation_id` that will be assigned to a `table_id`.
 * @param {integer} tableId
 *  the `table_id` to be assigned a `reservation_id`.
 * @param {AbortSignal} signal
 *  the optional `AbortSignal` for rejecting the `.fetch()` promise.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a successful `PUT` request.
 */
export async function seatReservation(reservation_id, tableId) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id }})
  };
  return await fetchJson(url, options);
}

/**
 * Removes the reservation from the table and makes it available.
 * @param {integer} table_id 
 *  the table to be removed of its `reservation_id`
 * @returns {Promise}
 *  a promise that resolves to a successful `DELETE` request.
 */
export async function dismissReservation(table_id) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "DELETE",
    headers
  };
  return await fetchJson(url, options);
}
