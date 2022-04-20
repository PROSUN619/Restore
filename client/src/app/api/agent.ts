import axios, { AxiosResponse } from "axios";
import { resolve } from "path";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error) => {
    //console.log('caught by interceptor');
    const { data, status } = error.response!;
    // ! marks is used to tell that we are overiding the type safety
    //bcz we know that there must be error and we do not need to create a type for error 
    // debugger;
    switch (status) {
        case 400:
            //part for validation error
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            //part for validation error
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: { error: data }
            });
            //toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}


const TestErrors = {
    get400Errors: () => requests.get('buggy/bad-request'),
    get401Errors: () => requests.get('buggy/unauthorised'),
    get404Errors: () => requests.get('buggy/not-found'),
    get500Errors: () => requests.get('buggy/server-error'),
    getValidationErrors: () => requests.get('buggy/validation-error')
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;

