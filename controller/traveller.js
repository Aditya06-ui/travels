const traveldetail = require("../module/travel.js")

const newtraveler = async(req, res) => {
     const { name, phone_no, number_of_traveler, stay_day, pickup_location, destination, date_of_booking } = req.body

    const parseDate = (datestring) => {
        const [ date , month , year] = datestring.split('/')
        return new Date(`${year}-${month}-${date}T00:00:00Z`)
    }
   
      const parsedate = parseDate(date_of_booking)
   
      console.log(req.user._id)   
   
try{   
    
    const traveler = await traveldetail.create({
        name,
         phone_no, 
         number_of_traveler,
         stay_day,
         pickup_location,
         destination,
         user_id : req.user._id,
         date_of_booking : parsedate,
         
     })

      if(!traveler) {

        return res.status(501).json({
            success: false,
            message: "details not be added"
        })
    }
     
     res.status(200).json({
        success: true,
        message: " booked successfully"
     })
 
} catch(error){ 
   
    res.status(500).json({
        success: false,
        message: error.message
    });
  } 
 }

 

const booked_trip = async(req,res) => {

    const  ticket = await traveldetail.findOne({user_id : req.user._id})

    if (!ticket) {
        return res.status(404).json({
            success: false,
            message: "no any booking" 
        })
    }

    res.status(200).json({
        success: true,
        ticket
    })
}

const updatetravellerdetail = async(req,res) => {

    const { name , phone_no, number_of_traveler,stay_day,pickup_location,destination,date_of_booking } = req.body

    const travelid = req.params.id
    const userid = req.user.id 

    const travelling =  await traveldetail.findOne({_id: travelid , user_id: userid})

    if(!travelling){
        return res.status(200).json({
            success: false,
            message: "no any history or booked history"
        })
    }

   if(name){
    travelling.name = name
} 

if(phone_no){
    travelling.phone_no = phone_no
}

if(number_of_traveler){
    travelling.number_of_traveler = number_of_traveler
}

if(stay_day){
    travelling.stay_day = stay_day
}

if(pickup_location){
    travelling.pickup_location = pickup_location
}

if(destination){
    travelling.destination = destination
}

if(date_of_booking){
       
    const parsedate = (datestring) => {
                   
            const [date,month, year] = datestring.split("/")

            return (`${year}-${month}-${date}T00:00:00Z`)
        
        } 
    
        travelling.date_of_booking = parsedate(date_of_booking)
}


travelling.save()

res.status(200).json({
    success: true,
    message: " update successfully"
 })
}



const canceltrip = async(req,res) => {

  const { destination, name } = req.body
//   const {id} = req.user
   
  const user = { destination: destination, name: name }
 
  try{
    
    const traveller = await traveldetail.findOne(user)
    

   if(!traveller){ 
    return res.status(500).json({
        success: false,
        message: "no any plan"
    })
   }

   await traveller.deleteOne()

   res.status(200).json({
    success: true,
    message: " trip cancel successfully" 
   })


} catch(err){

    res.status(500).json({
        success:false,
        message:"some error are occurred" + err
    })
}
}


// const canceltrip = async (req, res) => {
//     const { destination, name } = req.body;
//     const { user_id } = req.body; // Assuming user_id is passed in the request body
  
//     console.log("Destination:", destination);
//     console.log("Name:", name);
//     console.log("User ID:", user_id);
  
//     try {
//       // Log the exact query being made
//       console.log("Querying with:", { destination: destination, name: name, user_id: user_id });
  
//       // Query the database
//       const traveller = await traveldetail.findOne({ destination: destination, name: name, user_id: user_id });
  
//       // Log the result of the query
//       console.log("Traveller found:", traveller);
  
//       // Check if traveller is null
//       if (!traveller) {
//         return res.status(404).json({
//           success: false,
//           message: "No plan found",
//         });
//       }
  
//       // Delete the traveller
//       await traveller.deleteOne();
  
//       // Send a success response
//       return res.status(200).json({
//         success: true,
//         message: "Trip cancelled successfully",
//       });
  
//     } catch (err) {
//       // Log the error
//       console.error("Error finding or deleting traveller:", err);
  
//       // Send an error response
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred: " + err.message,
//       });
//     }
//   };
  
  
  
  
module.exports = {
    newtraveler,
    booked_trip,
    updatetravellerdetail,
    canceltrip
}