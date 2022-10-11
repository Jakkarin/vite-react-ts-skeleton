const resources = {
    auth: {
        check: {
            url: '/auth',
            method: 'GET',
        },
        login: {
            url: '/auth',
            method: 'POST',
        },
        logout:{
            url: '/auth',
            method: 'DELETE',
        },
    },
    post: {
        show: {
            url: '/post/:id',
            method: 'GET',
        },
    }
};

export default resources;