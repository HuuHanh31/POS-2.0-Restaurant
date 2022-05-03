const Order = require('../models/order.model');
const shortId = require('shortid')
module.exports = {
    async postPayment(data, res, io) {
        try {
            if (!data.total) {
                return res.json({
                    success: 0,
                    message: "khong co thong tin don hang"
                })
            }
            const order = new Order;
            order.orderID = shortId.generate();
            order.email = data.email;
            order.products = data.products;
            order.status = 'unconfirmed';
            order.process = 'pending';
            order.payment = data.payment;
            order.total = data.total;
            console.log(data.total);
            await order.save();
            io.emit('clerk');
            return res({
                success: 1,
                orderId: order.orderID,
                message: "don hang da duoc luu vao db"
            })
        }
        catch (err) {
            console.log(err)
        }
    },
    async getOrder(req, res) {
        try {
            console.log({
                permission: req.user.permission,
                status: req.query.status,
                process: req.query.process
            })
            if (req.user.permission === 'chef') {
                const order = req.query.status ? await Order.find({ status: req.query.status }) : null;
                if (order) {
                    return res.json({
                        success: 1,
                        order,
                        message: "thanh cong"
                    })
                }
                return res.json({
                    success: 0,
                    message: "that bai"
                })
            }
            // else if (req.user.permission === 'kithen') {
            //     const order = req.query.process ? await Order.find({ process: req.query.process }) : null;
            //     if (order) {
            //         return res.json({
            //             success: 1,
            //             order,
            //             message: "thanh cong"
            //         })
            //     }
            //     return res.json({
            //         success: 0,
            //         message: "that bai"
            //     })
            // }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid token"
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async getCook(req, res) {
        try {
            console.log({
                permission: req.user.permission,
                status: req.query.status,
                process: req.query.process
            })
            // if (req.user.permission === 'chef') {
            //     const order = req.query.status ? await Order.find({ status: req.query.status }) : null;
            //     if (order) {
            //         return res.json({
            //             success: 1,
            //             order,
            //             message: "thanh cong"
            //         })
            //     }
            //     return res.json({
            //         success: 0,
            //         message: "that bai"
            //     })
            // }
            if (req.user.permission === 'chef') {
                const order = req.query.process ? await Order.find({ process: req.query.process }) : null;
                if (order) {
                    return res.json({
                        success: 1,
                        order,
                        message: "thanh cong"
                    })
                }
                return res.json({
                    success: 0,
                    message: "that bai"
                })
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid token"
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async getOrderShipper(req, res) {
        try {
            // console.log({
            //     permission: req.user.permission,
            //     status: req.query.status,
            //     process: req.query.process
            // })
            // if (req.user.permission === 'chef') {
            //     const order = req.query.status ? await Order.find({ status: req.query.status }) : null;
            //     if (order) {
            //         return res.json({
            //             success: 1,
            //             order,
            //             message: "thanh cong"
            //         })
            //     }
            //     return res.json({
            //         success: 0,
            //         message: "that bai"
            //     })
            // }
            if (req.user.permission === 'shipper') {
                const order = req.query.process ? await Order.find({ process: req.query.process }) : null;
                if (order) {
                    return res.json({
                        success: 1,
                        order,
                        message: "thanh cong"
                    })
                }
                return res.json({
                    success: 0,
                    message: "that bai"
                })
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid token"
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async getOrderbyemail(req, res){
        if (req.user.permission === 'customer') {
            const order = req.query.email ? await Order.find({ email: req.query.email }) : null;
            if (order) {
                return res.json({
                    success: 1,
                    order,
                    message: "thanh cong"
                })
            }
            return res.json({
                success: 0,
                message: "that bai"
            })
        }
        else {
            return res.json({
                success: 0,
                message: "Invalid token"
            })
        }
    }
}