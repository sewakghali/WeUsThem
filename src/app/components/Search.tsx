import React, { useCallback, useEffect, useState } from 'react';

interface SearchProps {
   onSearch: (param: string) => void;
   param: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, param }) => {
   const submitForm = (e: any) => {
      e.preventDefault();
   }

   return (
      <>
         <div className='px-4 md:px-12  mt-4 space-y-8'>
            <form className='p-1' onSubmit={submitForm}>

               <div className="relative">
                  <div className='flex flex-row flex-nowrap'>
                     <input aria-label='Search' placeholder='search' value={param} onChange={(e) => onSearch(e.target.value)} className="w-full p-4 pl-4 text-sm text-gray-900 border-4 border-gray-300" required />
                     <button type="submit" className="min-w-[100px] text-white bg-blue-700">Search</button>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

export default Search;