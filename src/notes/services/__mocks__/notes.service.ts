
const mockedFindAll = jest.fn();
const mockedFindById = jest.fn();
const mockedDeleteById = jest.fn();
const mockedSave = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {
    findAll: mockedFindAll,
    findById: mockedFindById,
    deleteById: mockedDeleteById,
    save: mockedSave,
  }
});

export {
  mockedFindAll,
  mockedFindById,
  mockedDeleteById,
  mockedSave
}

export default mock
