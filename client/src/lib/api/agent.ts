import axios from "axios";

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

agent.interceptors.response.use(
    async response => {
        if (import.meta.env.DEV) await sleep(1000);
        return response;
    },
    async error => {
        if (import.meta.env.DEV) await sleep(1000);
        const { status, data } = error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];

                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    
                    throw modalStateErrors.flat();
                }
                break;
            default:
                break;
        }
        return Promise.reject(error);
    }
)

export default agent;