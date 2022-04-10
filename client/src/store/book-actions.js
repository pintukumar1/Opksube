import { bookActions } from "./book-slice"

export const getBooksData = () => {
    return async (dispatch) => {
        const getBooks = async () => {
            const response = await fetch(
                "/api/books/getbooks"
            )
            if (!response.ok) {
                throw new Error("Could not fetch data..")
            }
            const data = await response.json()
            return data;
        }
        try {
            const fetchedBooks = await getBooks()
            dispatch(bookActions.getItems({
                books: fetchedBooks.books,
                totalQuantity: fetchedBooks.totalBooks
            })
            )
        } catch (err) {
            console.log(err)
        }
    }
}