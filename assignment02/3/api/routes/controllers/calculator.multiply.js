module.exports.multiply = function(req, res) {
    console.log("Multiply");
    console.log(req.query);
    let num1 = req.params.val;
    let num2 = 2;
    if(req.query && req.query.num2) {
        num2 = parseInt(req.query.num2, )
    } 
    res.status(200).json({"Result": num1*num2});
};