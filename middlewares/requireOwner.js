export const requireOwner = (req, res, next) => {
    const usuarioId = parseInt(req.params.id);

    console.log(usuarioId);
    if (req.user.id !== usuarioId) {
        return res.status(403).json({
        data: null,
        error: { code: 403, message: "Prohibido" }
        });
    }
    next();
};