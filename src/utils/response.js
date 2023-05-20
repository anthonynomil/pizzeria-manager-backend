export const sendResponse = (res, status, infos) => {
    res.status(status).send(infos);
};