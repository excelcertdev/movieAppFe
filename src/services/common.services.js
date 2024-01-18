import axios from 'axios';

export const commonService = {
    withOutToken,
    withToken,
    getDataWithToken,
    getWithToken,
    deleteWithToken,
    withTokenFormData,
    putWithToken
};


//-- It's common function for using without token
function withOutToken(apiName, data) {
    // Create a new AbortController
    const controller = new AbortController();
    const { signal } = controller;

    // Set up a timeout to abort the request after a specified time (e.g., 30 seconds)
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 30000); // 30 seconds

    // Define your request configuration
    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        data: data,
        signal, // Assign the signal to the request
    };

    // Send the request
    return axios(config)
        .then(handleResponse)
        .catch((error) => {
            if (error.name === 'AbortError') {
                console.log('Request aborted:', error);
            } else {
                console.log('Error:', error);
            }
        })
        .finally(() => {
            clearTimeout(timeoutId); // Clear the timeout
        });
}

//-- It's common function for using the token
function withToken(apiName, data) {
    // Initialize the i18n translation hook.
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = userData?.data.token;
    // Create a new AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;

    // Define an abort function to cancel the request
    const abort = () => controller.abort();

    // Create a promise that resolves when the request is completed
    const requestPromise = axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        data: data,
        signal: signal, // Associate the signal with the request
    }).then((handleResponse) => {
        return handleResponse;
    }).catch(error => {
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'), {
            //     position: toast.POSITION.TOP_RIGHT,
            // })
        }
    });

    // Attach the abort function to the promise so you can cancel the request if needed
    requestPromise.abort = abort;

    return requestPromise;
}

function putWithToken(apiName, data) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = userData.data.token;

    // Create a new AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;

    // Define an abort function to cancel the request
    const abort = () => controller.abort();

    // Create a promise that resolves when the request is completed
    const requestPromise = axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Authorization': `Bearer ${token}` },
        data: data,
        signal: signal, // Associate the signal with the request
    }).then((handleResponse) => {
        return handleResponse;
    }).catch(error => {
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'),{
            //         position: toast.POSITION.TOP_RIGHT,
            //     })
        }
    });

    // Attach the abort function to the promise so you can cancel the request if needed
    requestPromise.abort = abort;

    return requestPromise;
}


//-- It's common function for using the token and multipart form data
function withTokenFormData(apiName, data) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = userData.data.token;

    // Create a new AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;

    // Define an abort function to cancel the request
    const abort = () => controller.abort();

    // Create a promise that resolves when the request is completed
    const requestPromise = axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data' },
        data: data,
        signal: signal, // Associate the signal with the request
    }).then((handleResponse) => {
        return handleResponse;
    }).catch(error => {
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'),{
            //         position: toast.POSITION.TOP_RIGHT,
            //     })
        }
    });

    // Attach the abort function to the promise so you can cancel the request if needed
    requestPromise.abort = abort;

    return requestPromise;
}


//-- get data
function getDataWithToken(apiName, data) {
    let userData = JSON.parse(localStorage.getItem("userData"))
    let token = userData.data.token;
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        params: data
    }).then(handleResponse).catch(error => {
        
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'), {
            //     position: toast.POSITION.TOP_RIGHT,
            // })
        }
    });
}


function getWithToken(apiName) {
    let userData = JSON.parse(localStorage.getItem("userData"))
    let token = userData.data.token;
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    }).then(handleResponse).catch(error => {
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'), {
            //     position: toast.POSITION.TOP_RIGHT,
            // })
        }
    });
}


//-- It's common function for delete using the token
function deleteWithToken(apiName, data) {

    let userData = JSON.parse(localStorage.getItem("userData"))
    let token = userData.data.token;
    return axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        data: data
    }).then((handleResponse) => {
        return handleResponse;
    }).catch(error => {
        if (error && error.response && error.response.data && !error.response.data.status) {
            // toast.error(
            //     t('errorMsg'), {
            //     position: toast.POSITION.TOP_RIGHT,
            // })
        }
    });
}


function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response;
    } else {
        const error = response;
        return Promise.reject(error);
    }
}

