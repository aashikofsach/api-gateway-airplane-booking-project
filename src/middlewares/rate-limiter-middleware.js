const {rateLimit} =require('express-rate-limit')


const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 minutes
    limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    
})

module.exports ={
    limiter
}