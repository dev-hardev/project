import { deleteItemFromStore, getItemFromStore } from 'helpers/utils';
import { toast } from 'react-toastify';
import { AppSettings } from '../../../settings';

const CallApi = {
  temporaryToken: '',
  token: function (token) {
    this.temporaryToken = token;
    return this;
  },
  get: async function (
    url,
    showToast = true,
    headers = {},
    showErrorToast = true,
    signal
  ) {
    // console.log("Executing GET request to: ", url);
    // let startTime = performance.now();
    const response = await fetch(getUrl(url), {
      method: 'GET',
      headers: getHeaders(headers, this.temporaryToken),
      signal
    })
      .then(response =>
        manageResponse(showToast, response, true, showErrorToast)
      )
      .catch(error => manageError(error, null, showErrorToast));
    // console.log("GET request ", url, " took: ", performance.now() - startTime, " ms");
    return response;
  },
  post: async function (
    url,
    body,
    showToast = true,
    showFormErrorToasts = true,
    headers = {},
    signal
  ) {
    // console.log("Executing POST request to: ", url);
    const response = await fetch(getUrl(url), {
      method: 'POST',
      headers: getHeaders(headers, this.temporaryToken),
      body: body,
      signal
    })
      .then(response =>
        manageResponse(showToast, response, showFormErrorToasts)
      )
      .catch(error => manageError(error));
    return response;
  },
  put: async function (
    /** @type {string} */ url,
    body = new FormData(),
    showToast = true,
    showFormErrorToasts = true,
    headers = {}
  ) {
    body.append('_method', 'PUT');
    const response = await fetch(getUrl(url), {
      method: 'POST',
      headers: getHeaders(headers, this.temporaryToken),
      body: body
    })
      .then(response =>
        manageResponse(showToast, response, showFormErrorToasts)
      )
      .catch(error => manageError(error));
    return response;
  },
  patch: async function (
    url,
    body = new FormData(),
    showToast = true,
    headers = {}
  ) {
    body.append('_method', 'PATCH');

    const response = await fetch(getUrl(url), {
      method: 'POST',
      headers: getHeaders(headers, this.temporaryToken),
      body: body
    })
      .then(response => manageResponse(showToast, response))
      .catch(error => manageError(error));
    return response;
  },
  delete: async function (url, showToast = true, headers = {}) {
    const response = await fetch(getUrl(url), {
      method: 'DELETE',
      headers: getHeaders(headers, this.temporaryToken)
    })
      .then(response => manageResponse(showToast, response))
      .catch(error => manageError(error));
    return response;
  }
};

const getHeaders = (newHeaders, tempToken) => {
  let headers = { accept: 'application/json' };

  const bearerToken = getItemFromStore('aidaToken', false) || tempToken;

  if (bearerToken) {
    headers['Authorization'] = 'Bearer ' + bearerToken;
  }

  if (newHeaders) {
    for (const property in newHeaders) {
      if (Object.hasOwnProperty.call(newHeaders, property)) {
        headers[property] = newHeaders[property];
      }
    }
  }
  return headers;
};

const getUrl = url => AppSettings.apiUrl + url;

const manageError = (error, response, showErrorToast = true) => {
  if (showErrorToast) {
    toast.error(error);
  }
  console.log(error, response);
};

export const downloadFile = response => {
  // Extract the filename using a regular expression
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(response?.contentDisposition);

  let filename = 'file'; // Default filename
  if (matches != null && matches[1]) {
    filename = matches[1].replace(/['"]/g, ''); // Remove surrounding quotes if present
  }

  const blobUrl = URL.createObjectURL(response?.blob);

  // Create a temporary anchor element
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = blobUrl;
  a.download = filename; // Specify the desired filename

  // Trigger a click event on the anchor
  document.body.appendChild(a);
  a.click();

  // Clean up the anchor element and URL object
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};

const manageResponse = (
  showToast,
  response,
  showFormErrorToasts = true,
  showErrorToast = true
) => {
  if (response?.status == 401) {
    deleteItemFromStore('aidaToken');
  }

  if (response?.status == 404 && showErrorToast) {
    toast.error(`${response?.url} Not Found`, {
      autoClose: 5000,
      position: 'bottom-right'
    });
  }

  // INFO: Catching Server Error
  if (response?.status == 500 && showErrorToast) {
    response.json().then(responseData =>
      toast.error(responseData.message, {
        autoClose: 5000,
        position: 'bottom-right'
      })
    );
    return;
  }
  const contentType = response?.headers.get('content-type');

  const jsonContent = contentType && contentType.includes('application/json');

  const responseData = jsonContent ? response?.json() : response?.blob();

  // Danger: Catching user errors
  if (response?.status == 422) {
    const toastrOptions = error => ({
      onClick: () => navigator.clipboard.writeText(error)
    });

    // Returning the promise along with the status code.
    return responseData.then(json => {
      // INFO: Checking if Form errors found.
      if (json.errors) {
        if (showFormErrorToasts) {
          for (const field in json.errors) {
            if (Object.hasOwnProperty.call(json.errors, field)) {
              json.errors[field].forEach(error => {
                toast.warning(error, toastrOptions(error));
              });
            }
          }
        }
      } else {
        // HACK: If direct message from SQL
        if (json.message) {
          toast.error(json.message, toastrOptions(json.message));
          return { ...json, status: response?.status };
        }

        // HACK: different error format, if found
        for (const field in json) {
          if (Object.hasOwnProperty.call(json, field)) {
            json[field].forEach(error => {
              toast.warning(error, toastrOptions(error));
            });
          }
        }
      }
      return { ...json, status: response?.status };
    });
  }

  responseData.then(json => {
    if (response?.status == 403) {
      toast.warning(json.message);
    }
    if (showToast && json.message && response?.status != 403) {
      if (response?.status > 399 && response?.status < 500) {
        toast.warning(json.message, {
          autoClose: 5000,
          position: 'bottom-right'
        });
      }

      if (response?.status > 199 && response?.status < 300) {
        toast.success(json.message, {
          autoClose: 5000,
          position: 'bottom-right'
        });
      }
    }
  });

  if (response?.status == 403 || response?.status == 401) {
    return responseData.then(json => ({ ...json, status: response?.status }));
  }

  if (response?.status > 399 && response?.status < 500) {
    return;
  }

  // returning the promise along the with the status code
  let richResponse = responseData.then(json =>
    jsonContent
      ? {
          ...json,
          status: response?.status
        }
      : downloadFile({
          contentDisposition: response?.headers.get('Content-Disposition'),
          blob: jsonContent ? null : json // might seem little naming confusion, but here json is basically blob for file (which is supposed to be downloadable).
        })
  );

  return richResponse;
};

export default CallApi;
