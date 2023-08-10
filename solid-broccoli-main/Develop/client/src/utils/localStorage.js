export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('savedBooks')
    ? JSON.parse(localStorage.getItem('savedBooks'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('savedBooks', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('savedBooks');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('savedBooks')
    ? JSON.parse(localStorage.getItem('savedBooks'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('savedBooks', JSON.stringify(updatedSavedBookIds));

  return true;
};
