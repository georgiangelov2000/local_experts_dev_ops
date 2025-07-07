import ListElement from './List/ListElement';
import Pagination from './List/Pagination';

export default function List({ state, dispatch }) {
  if (state.providers.length === 0) {
    return (
      <>
        <h2 className="text-xl font-bold mb-2">Search Results</h2>
        <div className="mb-4">
          {Object.entries(state.filtered).map(([key, value]) => (
            <span key={key} className='p-2 bg-gray-100 text-gray-700 text-sm rounded-sm rounded-full mr-2'>
              {key} : {value}
            </span>
          ))}
        </div>
        <div className="text-gray-600 text-center p-6 bg-gray-50 rounded-lg">
          No providers found matching your criteria.
        </div>
      </>

    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Search Results</h2>
      <div className="mb-4">
        {Object.entries(state.filtered).map(([key, value]) => (
          <span key={key} className='p-2 bg-gray-100 text-gray-700 text-sm rounded-sm rounded-full'>
            {key} : {value}
          </span>
        ))}
      </div>
      <ul className="list-none pl-0 mt-2">
        {state.providers.map((provider, index) => (
          <ListElement key={index} provider={provider} />
        ))}
      </ul>
      <Pagination
        pagination={state.pagination}
        onPageChange={(page) => {
          console.log("Go to page:", page);
        }}
      />
    </>
  );
}
