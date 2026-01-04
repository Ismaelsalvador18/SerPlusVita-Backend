
export const requireOwner = (req, res, next) => {
    const usuarioId = parseInt(req.params.id);
    console.log(req.route.path);
    console.log(usuarioId, req.user.id);
    if (parseInt(req.user.id) !== usuarioId) {
        console.log("error en requireOwner")
        return res.status(403).json({
        data: null,
        error: { code: 403, message: "Prohibido" }
        });
    }
    next();
};