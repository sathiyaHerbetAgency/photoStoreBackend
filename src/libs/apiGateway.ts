

export const formatJSON=({
    statusCode= 200,
    data={},
    headers,
}:{
    statusCode?: number; // '?' using for optional
    data?: any;
    headers?: Record<string, string>; // object both key and value are strings
})=>{
    return {
        statusCode,
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':true,
            ...headers,
        },
    }
};