 const nextHandlerWrapper = app => {
    const handler = app.getRequestHandler();
    return async (request, h) => {
        const { raw,query } = request
        const { pathname } = request.url
        await handler(raw.req, raw.res, {pathname,query});
        return h.close;
    }
};

 const defaultHandlerWrapper = app => async (request, h) => {
    const { pathname, query } = request;
    const html = await app.renderToHTML(req, res, pathname, query);
    return h.response(html).code(res.statusCode)
};

 const pathWrapper = (app, pathName, opts) => async (
    { raw, query, params },
    h
) => {

    const html = await app.renderToHTML(
        raw.req,
        raw.res,
        pathName,
        { ...query, ...params },
        opts
    );
    return h.response(html).code(raw.res.statusCode)
};

module.exports={
    nextHandlerWrapper,
    defaultHandlerWrapper,
    pathWrapper
}