import ListElement from './List/ListElement';
import Pagination from './List/Pagination';

export default function List({ state, dispatch, searchParams, setSearchParams }) {

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
          <span key={key} className='p-2 bg-gray-100 text-gray-700 text-sm rounded-sm rounded-full mr-2'>
            {key} : {value}
          </span>
        ))}
        <span className="p-2 bg-gray-100 text-gray-700 text-sm rounded-sm mr-2">
          Page: {state.pagination.current_page} / {state.pagination.last_page}
        </span>
        <span className="p-2 bg-gray-100 text-gray-700 text-sm rounded-sm">
          Records: {state.pagination.total}
        </span>
      </div>
      <ul className="list-none pl-0 mt-2">
        {state.providers.map((provider, index) => (
          <ListElement key={index} provider={provider} />
        ))}
      </ul>
      <Pagination
        pagination={state.pagination}
        onPageChange={(page) => {
          const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
          params.set('page', page);
          setSearchParams(params);
        }}
      />
    </>
  );
}
