// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// const upload = multer({ dest: 'uploads/' })

// export const uploadimage = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.json({
//         status: false,
//         message: "token not found",
//       });
//     }
//     const data = jwt.verify(token, SECRET_TOKEN_KEY);
//     const user = await User.findById(data.id);
//     if (user) {
//       req.userdata = user;
//       next();
//     } else {
//       return res.json({
//         status: false,
//         message: "token is not valid",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: false,
//       message: "serverside error occured",
//     });
//   }
// };
