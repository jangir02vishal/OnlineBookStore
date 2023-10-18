import React, { useState } from "react";

import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-fiction",
    "Nature",
    "Finance",
    "Cooking",
    "History",
    "Law",
    "Science Fiction",
    "Fantasy",
    "Autobiography",
    "Self-help",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  //handle book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const authors = form.authors.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const isbn = form.isbn.value;
    const publisher = form.publisher.value;
    const bookDescription = form.bookDescription.value;
    const price = form.price.value;
    const language = form.language.value

    const bookObj = {
      title,
      authors,
      imageURL,
      category,
      isbn,
      publisher,
      bookDescription,
      price,
      language
    };

    //Send data to DB
    const localData = JSON.parse(localStorage.getItem("data"));
    console.log( localData.jwtToken);
    axios
      .post(import.meta.env.VITE_BASE_SERVER_URL + "/upload-book",bookObj, {
        headers: {
          token: localData.jwtToken,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.status === 201){
          toast.success("Book uploaded sucessfully.");
          form.reset();
        }
        else{
          toast.error("Something went wrong!!")
        }
      });
  };

  return (
    <div className="px-4 my-12">
      <ToastContainer position="bottom-left" />

      <h2 className="mb-8 text-3xl font-bold">Upload a Book</h2>

      <form
        onSubmit={handleBookSubmit}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/*First row */}
        <div className="flex gap-8">
          {/*Book title */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              name="title"
              placeholder="Enter Book's Title"
              required
              type="text"
            />
          </div>

          {/*Author Name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authors" value="Author" />
            </div>
            <TextInput
              id="authors"
              name="authors"
              placeholder="Enter Author's Name"
              required
              type="text"
            />
          </div>
        </div>

        {/*Second row */}
        <div className="flex gap-8">
          {/*Book Image */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book-Image URL" />
            </div>
            <TextInput
              id="imageURL"
              name="imageURL"
              placeholder="Enter Book Image URL"
              required
              type="text"
            />
          </div>

          {/*category*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>

            <select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*Third row */}
        <div className="flex gap-8">
          {/* ISBN */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="ISBN" />
            </div>
            <TextInput
              id="isbn"
              name="isbn"
              placeholder="Enter ISBN"
              required
              type="number"
            />
          </div>

          {/*publisher Name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="publisher" value="Publisher" />
            </div>
            <TextInput
              id="publisher"
              name="publisher"
              placeholder="Enter Publisher's Name"
              required
              type="text"
            />
          </div>
        </div>
              
        {/*Fourth row */}
        <div className="flex gap-8">
          {/* price */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              id="price"
              name="price"
              placeholder="Enter Price"
              required
              type="number"
            />
          </div>

          {/*language Name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="language" value="Language" />
            </div>
            <TextInput
              id="language"
              name="language"
              placeholder="Enter Language"
              required
              type="text"
            />
          </div>
        </div>

        {/*Book description*/}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Description" />
          </div>
          <Textarea
            id="bookDescription"
            name="tbookDescriptionitle"
            placeholder="Write Your Book Description Here..."
            required
            className="w-full"
            rows={4}
          />
        </div>

        <Button type="submit" className="mt-5">
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
