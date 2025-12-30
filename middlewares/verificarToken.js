import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generarToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

export const verificarToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }catch {
        return null
    }
}

export const requireAuth = (request, response, next) => {
    
    const header = request.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
        return response.status(401).json({
            data: null,
            error: { 
                code: 401, 
                message: "Token requerido" }
        });
    }

    const decoded = verificarToken(token);

    if (!decoded) {
        return response.status(401).json({
            data: null,
            error: { 
                code: 401, 
                message: "Token inválido" }
        });
    }

    request.user = decoded;

    next();
}