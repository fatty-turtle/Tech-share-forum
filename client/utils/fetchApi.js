import axios from "axios";

/**
 * A function for making HTTP requests using Axios
 * @param {string}      url       - The full URL to request
 * @param {string}      [method="GET"] - HTTP method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
 * @param {object|null} [data=null]    - Request payload for POST / PUT / PATCH
 * @param {object}      [headers={}]   - Additional request headers
 * @returns {Promise<{ response: any, error: string|null, loading: boolean }>}
 */

async function fetchApi(url, method = "GET", data = null, headers = {}) {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: data,
      headers: headers,
    });
    return { response: response.data, error: null, loading: false };
  } catch (error) {
    return {
      response: null,
      error: error.response?.data || error.message,
      loading: false,
    };
  }
}

export default fetchApi;
