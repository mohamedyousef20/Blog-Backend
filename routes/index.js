import authRouter from './authRoute.js'
import userRouter from './userRoute.js'
import postRouter from './postRoute.js'
import commentRouter from './commentRoute.js'
import categoryRouter from './categoryRoute.js'
import notFound from '../utils/notFound.js'

const mountRoutes = (app) => {

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/post", postRouter);
    app.use("/api/v1/comment", commentRouter);
    app.use("/api/v1/category", categoryRouter);

    app.use("*", notFound);
}

export default mountRoutes;