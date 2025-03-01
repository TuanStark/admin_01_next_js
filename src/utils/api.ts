import queryString from 'query-string';

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : null,
        credentials: useCredentials ? 'include' : 'omit',
        ...nextOption
    };

    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    try {
        console.log('>> Making request to:', url);
        console.log('>> With options:', JSON.stringify(options, null, 2));
        
        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log('>> Response status:', response.status);
        console.log('>> Response data:', data);
        
        if (response.ok) {
            return data as T;
        }
        
        return {
            statusCode: response.status,
            message: data?.message || "Unknown error",
            error: data?.error || "Something went wrong"
        } as T;
    } catch (error) {
        console.error('>> Network or parsing error:', error);
        throw error;
    }
};

export const sendRequestFile = async <T>(props: IRequest) => { //type
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ ...headers }),
        body: body ? body : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";

    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T; //generic
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};
