import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

function Pet() {
  const [pet, setPet] = useState(null);
  
  const { hospitalId } = useParams(); // Make sure this matches the route parameter name in your backend, i.e., petId

  useEffect(() => {
    // console.log("Fetching hospital with ID:", hospitalId);
    axios.get(`http://localhost:3000/admin/hospital/${hospitalId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        
        setPet(res.data.hospital); //  pet data is returned as res.data.pet
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  }, [hospitalId]);

  if (!pet) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div style={{display:"flex"}}>
    PET
     {/* courses is an object so need to stringify */}
     {/* {JSON.stringify(pet)}  */}
     {/* {pet.map((petItem)=>{
         return <Course course={petItem} />
     })} */}
     <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{pet.name}</Typography>
 <Typography textAlign={"centre"} variant="h4">{pet.address}</Typography>

 {/* <UpdateCard pet={pet}/> */}
    </Card>
     </div>
   
  );
}

// update card

// function UpdateCard({ pet, onUpdate }) {
//   const { petId } = useParams();

//   const [updatedPet, setUpdatedPet] = useState({
//     title: pet.title,
//     description: pet.description,
//     imageLink: pet.imageLink,
//     price: pet.price,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedPet((prevPet) => ({
//       // to put the earlier props 
//       ...prevPet,
//       //changed one
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     axios.put(`http://localhost:3000/admin/pet/${petId}`, updatedPet, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => {
//         onUpdate(res.data.pet);
//       })
//       .catch((error) => {
//         console.error("Error updating pet:", error);
//       });
//   };

//   return (
//     <Card style={{
//       border: "2px solid black",
//       margin: 10,
//       width: 300
//     }}>
//       <TextField
//         name="title"
//         label="Title"
//         value={updatedPet.title}
//         onChange={handleChange}
//       />
//       <TextField
//         name="description"
//         label="Description"
//         value={updatedPet.description}
//         onChange={handleChange}
//       />
//             <TextField
//         name="price"
//         label="Price"
//         value={updatedPet.price}
//         onChange={handleChange}
//       />
//       <TextField
//         name="imageLink"
//         label="Image Link"
//         value={updatedPet.imageLink}
//         onChange={handleChange}
//       />
//       <Button onClick={handleSubmit}>Update</Button>
//     </Card>
//   );
// }




export default Pet;
