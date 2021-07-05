module.exports.harden = function (err, OK,) { 
    const respose = { 
      status: 200, 
      massage: OK, 
    }; 
   
    if (err) { 
      respose.status = 500; 
      respose.massage = err; 
    } else if (!OK) { 
      respose.status = 400; 
      respose.massage = { error: "Input error"}; 
    } 
    return respose; 
  };