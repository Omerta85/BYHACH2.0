// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const expressFileUpload = require('express-fileupload');
// const https = require('https');
// //const fs = require('fs');
//
//
// require('dotenv').config();
//
// mongoose.set('strictQuery', false);
//
// const { PORT, DB_CONNECT_URL, ALLOWED_ORIGINS } = require('./config/variables');
//
// const app = express();
// mongoose.connect(DB_CONNECT_URL);
//
// app.use(helmet());
//
// app.use(cors());
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(expressFileUpload());
//
// //to protect the site
// // const options = {
// //   key: fs.readFileSync('./client-key.pem'),
// //   cert: fs.readFileSync('./cert.pem')
// // };
//
// if (process.env.NODE_ENV === 'dev') {
//     const morgan = require('morgan');
//     app.use(morgan('dev'));
// }
//
// const {
//     authRouter, userRouter, pubRouter, adminRouter
// } = require('./routes');
// const ErrorHandler = require('./errors/ErrorHandler');
//
// app.use('/auth', authRouter);
// app.use('/users', userRouter);
// app.use('/pubs', pubRouter);
// app.use('/admin', adminRouter);
// app.use('*', _notFoundError);
// app.use(_mainErrorHandler);
//
// //if better protection is needed, we write the option constant
//
// // const connection = async ()=>{
// //     let dbCon = false
// //
// //     while (!dbCon) {
// //         try {
// //             console.log('Connecting to database...')
// //             await mongoose.connect(process.env.MONGO_URI)
// //             dbCon = true
// //             console.log('Database available!!!')
// //         } catch (e) {
// //             console.log('Database unavailable, wait 3 seconds')
// //             await new Promise(resolve => setTimeout(resolve, 3000))
// //         }
// //     }
// //
// // }
// const start = async () => {
//     try {
//         let dbCon = false
//         console.log('Connecting to database...')
//         while (!dbCon){
//             try {
//                 await mongoose.connect(process.env.DB_CONNECT_URL)
//                 dbCon =true
//                 console.log('Database available!!!')
//             } catch (e) {
//                 console.log('Database unavailable, wait 3 seconds')
//                 await new Promise(resolve => setTimeout(resolve, 3000))
//             }
//         }
//
//         await app.listen(+process.env.PORT, process.env.HOST)
//         console.log(`Server listening on ${process.env.PORT} port`)
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// start()
//
// https.createServer(app).listen(PORT, () => {
//     console.log(`App listen on port ${PORT}...`);
// });
//
// function _notFoundError(err, req, res, next) {
//     next({
//         status: err.status || 404,
//         message: err.message || 'Not found'
//     });
// }
//
//
// function _mainErrorHandler(err, req, res, next) {
//     res
//         .status(err.status || 500)
//         .json({ message: err.message });
// }
//
//
// function _configureCors(origin, callback) {
//     const whiteList = ALLOWED_ORIGINS.split(';');
//
//     if (!origin && process.env.NODE_ENV === 'dev') {
//         return callback(null, true);
//     }
//
//     if (!whiteList.includes(origin)) {
//         return callback(new ErrorHandler(403, 'Cors not allowed'), false);
//     }
//
//     return callback(null, true);
// }

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();
mongoose.set('strictQuery', false);
const { PORT, DB_CONNECT_URL, ALLOWED_ORIGINS } = require('./config/variables');

const app = express();
mongoose.connect(DB_CONNECT_URL);

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

const {
    authRouter, userRouter, pubRouter, adminRouter
} = require('./routes');
const ErrorHandler = require('./errors/ErrorHandler');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pubs', pubRouter);
app.use('/admin', adminRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({ message: err.message });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(403, 'Cors not allowed'), false);
    }

    return callback(null, true);
}

const start = async () => {
    try {
        let dbCon = false;
        console.log('Connecting to database...');
        while (!dbCon) {
            try {
                await mongoose.connect(process.env.DB_CONNECT_URL);
                dbCon = true;
                console.log('Database available!!!');
            } catch (e) {
                console.log('Database unavailable, wait 3 seconds');
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        await app.listen(+process.env.PORT, process.env.HOST)
        console.log(`Server listening on ${process.env.PORT} port`)
    } catch (e) {
        console.log(e);
    }
};

start();

