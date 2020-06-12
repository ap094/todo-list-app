import axios from 'axios';

async function getData(url) {
    try {
        const response = await axios.get(`${url}`);
        const results = await response.data;

        return results;
    } catch (err) {
        console.error('Error on getting data - ', err);
    };
}

function postData(url, method, data) {
    const requestData = { url, method, data };

    return axios(requestData)
        .then(data => data)
        .catch(err => {
            console.error('Error on posting data - ', err);
        });
}

function deleteData(url) {
    return axios.delete(`${url}`)
        .then(data => data)
        .catch(err => {
            console.error('Error on deleting data - ', err);
        });
}

export { getData, postData, deleteData }
