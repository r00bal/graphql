import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getBookQuery,
  deleteBookMutation,
  getBooksQuery
} from "../queries/queries";

class BookDetails extends Component {
  deleteBook = e => {
    e.preventDefault();
    this.props.deleteBookMutation({
      variables: {
        id: e.target.value
      },
      refetchQueries: [{ query: getBookQuery }, { query: getBooksQuery }]
    });
  };

  displayBookDetails = () => {
    const { book } = this.props.data;
    console.log(book);
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All book by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <button className="delete" value={book.id} onClick={this.deleteBook}>
            Delete
          </button>
        </div>
      );
    } else {
      return <div>No book selected..</div>;
    }
  };
  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default compose(
  graphql(getBookQuery, {
    options: props => {
      return {
        variables: {
          id: props.bookid
        }
      };
    }
  }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookDetails);
