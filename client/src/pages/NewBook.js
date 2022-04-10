// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from '../components/FormElements/Input';
// import Button from '../components/FormElements/Button';
// import ImageUpload from '../components/FormElements/ImageUpload';
// import './NewBook.css';

// const NewBook = () => {
//   const navigate = useNavigate();

//   const placeSubmitHandler = async event => {
//     event.preventDefault();
//     try {
//       // const formData = new FormData();
//       // formData.append("title", formState.inputs.title.value)
//       // formData.append("description", formState.inputs.description.value)
//       // formData.append("price", formState.inputs.address.value)
//       // formData.append("image", formState.inputs.image.value)

//       await fetch('/api/seller/createbook', {
//         method: "POST",
//         body: formData,
//         headers: {
//           // "Authorization" : "Bearer" + token
//         }
//       }
//       );
//       navigate('/');
//     } catch (err) { }
//   };

//   return (
//     <React.Fragment>
//       <form className="bookform" onSubmit={placeSubmitHandler}>
//         <Input
//           id="title"
//           element="input"
//           type="text"
//           label="Title"
//         />
//         <Input
//           id="description"
//           element="textarea"
//           label="Description"
//         />
//         <Input
//           id="price"
//           element="input"
//           label="Price"
//         />
//         <ImageUpload id="image" />
//         <Button type="submit">
//           ADD BOOK
//         </Button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default NewBook;
