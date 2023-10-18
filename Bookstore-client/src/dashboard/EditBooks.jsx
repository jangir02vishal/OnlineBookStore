import React, { useState }  from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Button, Checkbox, Label, TextInput, Textarea} from 'flowbite-react';

const EditBooks = () =>{
    const {id} = useParams();
    const {title, authors, category, publisher, imageURL, isbn, bookDescription} = useLoaderData();

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
        "Self-help"
    ]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

    const handleChangeSelectedValue = (event) =>{
        setSelectedBookCategory(event.target.value);
    }

    //handle book submission
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const authors = form.authors.value;
        const imageURL = form.imageURL.value;
        const category = form.categoryName.value;
        const isbn = form.isbn.value;
        const publisher = form.publisher.value;
        const bookDescription = form.bookDescription.value;

        const updateBookObj = {
            title, authors, imageURL, category, isbn, publisher, bookDescription
        }

        //update book details
        fetch(import.meta.env.VITE_BASE_SERVER_URL + "/" + id,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateBookObj)
        }).then(res => res.json()).then(data => {
            alert("Book details updated sucessfully.");
            form.reset();
        })
    }

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Update the Book Details</h2>

             <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/*First row */}
                <div className="flex gap-8">
                    {/*Book title */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="title"
                            value="Title"
                        />
                        </div>
                        <TextInput
                        id="title"
                        name="title"
                        placeholder="Enter Book's Title"
                        required
                        type="text"
                        defaultValue={title}
                        />
                    </div>

                     {/*Author Name */}
                     <div className="lg:w-1/2">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="authors"
                            value="Author"
                        />
                        </div>
                        <TextInput
                        id="authors"
                        name="authors"
                        placeholder="Enter Author's Name"
                        required
                        type="text"
                        defaultValue={authors}
                        />
                    </div>
                </div>

                {/*Second row */}
                <div className="flex gap-8">
                    {/*Book Image */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="imageURL"
                            value="Book-Image URL"
                        />
                        </div>
                        <TextInput
                        id="imageURL"
                        name="imageURL"
                        placeholder="Enter Book Image URL"
                        required
                        type="text"
                        defaultValue={imageURL}
                        />
                    </div>

                     {/*category*/}
                     <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="category"
                                value="Category"
                            />
                            </div>

                            <select id="inputState" name="categoryName" className="w-full rounded" value={selectedBookCategory}
                            onChange={handleChangeSelectedValue}>
                                {
                                    bookCategories.map((option) => <option key = {option} value={option}>{option}</option>)
                                }
                            </select>
                    </div>
                </div>

                {/*Third row */}
                <div className="flex gap-8">
                    {/* ISBN */}
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="isbn"
                            value="ISBN"
                        />
                        </div>
                        <TextInput
                        id="isbn"
                        name="isbn"
                        placeholder="Enter ISBN"
                        required
                        type="number"
                        defaultValue={isbn}
                        />
                    </div>

                     {/*publisher Name */}
                     <div className="lg:w-1/2">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="publisher"
                            value="Publisher"
                        />
                        </div>
                        <TextInput
                        id="publisher"
                        name="publisher"
                        placeholder="Enter Publisher's Name"
                        required
                        type="text"
                        defaultValue={publisher}
                        />
                    </div>
                </div>

                 {/*Book description*/}
                 <div>
                        <div className="mb-2 block">
                        <Label
                            htmlFor="bookDescription"
                            value="Description"
                        />
                        </div>
                        <Textarea
                            id="bookDescription"
                            name="tbookDescriptionitle"
                            placeholder="Write Your Book Description Here..."
                            required
                            className="w-full"
                            rows={4}
                            defaultValue={bookDescription}
                        />
                    </div>


                    <Button type="submit" className="mt-5">
                        Update Book
                    </Button>
                </form>
        </div>
    )
}

export default EditBooks;