import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/FormElements/Input';
import Button from '../../components/FormElements/Button';
import ImageUpload from '../../components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/Util/validators"
import { useForm } from '../../shared/hooks/form-hook';
import './NewBook.css';

const NewBook = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      price: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        image: false
      }
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value)
      formData.append("description", formState.inputs.description.value)
      formData.append("price", formState.inputs.address.value)
      formData.append("image", formState.inputs.image.value)
      
      await fetch('/api/seller/createbook', {
        method: "POST" ,
        body: formData,
        headers: {
          // "Authorization" : "Bearer" + token
        }
      }
      );
      navigate('/');
    } catch (err) { }
  };

  return (
    <React.Fragment>
      <form className="bookform" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
        />
        <ImageUpload id="image"
          onInput={inputHandler}
          errorText="Please provide an image" />
        <Button type="submit" disabled={!formState.isValid}>
          ADD BOOK
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewBook;
