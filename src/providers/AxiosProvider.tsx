import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import axios, { Axios, AxiosRequestConfig } from 'axios';
import _ from "lodash";


interface IContext {
    axios: Axios;
    setToken: (token: string) => void;
    setHeader: (key: string, value: string) => void;
}

export const Context = createContext<IContext>({
    axios: axios,
    setToken: () => { },
    setHeader: () => { },
});

const AxiosProvider = function (props: PropsWithChildren<AxiosRequestConfig>) {
    const instance = useMemo(() => {
        const instance = axios.create(props);
        return instance;
    }, [props]);

    const value = {
        axios: instance,
        setToken: (token: string) => {
            instance.defaults.headers = _.assign({}, instance.defaults.headers, { Authorization: 'Bearer ' + token });
        },
        setHeader: (key: string, value: string) => {
            instance.defaults.headers = _.assign({}, instance.defaults.headers, { [key]: value });
        },
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const useAxiosRequest = function () {
    const { axios } = useContext(Context);
    return function (config: AxiosRequestConfig, payload?: any, params?: any) {
        let url = config.url ?? '';

        if (url.indexOf(':') >= 0) {
            let xt = url.split('/').map(v => {
                if (v.startsWith(':')) {
                    const x = v.substring(1);
                    if (_.has(params, x)) {
                        return _.get(params, x);
                    }
                    return x;
                }
                return v;
            });
            url = xt.join('/');
        }

        console.log(url);

        switch (config.method) {
            case 'get':
                return axios.get(url, { params });
            case 'post':
                return axios.post(url, payload, { params });
            case 'patch':
                return axios.patch(url, payload, { params });
            case 'delete':
                return axios.delete(url, { params });
        }
    };
};

export default AxiosProvider;