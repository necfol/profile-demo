import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { getFirstChar } from '../../utils/helper';
import { getAllProfileService, IProfile } from '../../libs/profile';

function ProfileDetail() {
  const [currentUser, setCurrentUser] = useState<IProfile | undefined>(undefined);
  const { data: res, error, loading } = useRequest<{ data: Array<IProfile> }, Array<any>>(getAllProfileService);
  const navigate = useNavigate();

  useEffect(() => {
    if (res?.data && res?.data.length > 0) {
      setCurrentUser(res.data[0]);
    }
  }, [res?.data]);

  const handleGoAdd = () => {
    navigate('/add');
  };

  const handleGoEdit = () => {
    navigate(`/edit/${currentUser?.id}`);
  };

  const handleCheck = (item: IProfile) => {
    setCurrentUser(item);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch profiles</div>;
  }
  return (
    <div className="mb-5">
      {res?.data && res?.data.length ? (
        <div className="float-right" onClick={handleGoEdit}>
          <svg
            className="icon cursor-pointer"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30">
            <path
              d="M196 751h632v60H196v-60z m487.093-529.213L793.4 332.095c11.716 11.716 11.716 30.711 0 42.427L500.66 667.264a30 30 0 0 1-21.41 8.786l-111.006-0.731c-16.566-0.11-29.907-13.625-29.802-30.19l0.697-109.578a30 30 0 0 1 8.786-21.022l292.742-292.742c11.716-11.716 30.71-11.716 42.427 0z m-21.214 63.64l-262.82 262.82-0.429 67.27 68.471 0.452 262.66-262.66-67.882-67.883z"
              fill="#979797"></path>
          </svg>
        </div>
      ) : null}

      <div className="flex mb-4">
        {res?.data && res?.data.length
          ? res.data.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => handleCheck(item)}
                className={`rounded-full mr-2 flex justify-center items-center border-2 border-white w-14 h-14 cursor-pointer text-white ${currentUser?.id === item.id ? 'bg-indigo-200' : 'bg-indigo-50'}`}>
                {getFirstChar(item.username)}
              </div>
            ))
          : null}
      </div>
      <div>
        <div className="w-full px-4 py-3 border-2 mb-4 rounded-md outline-none flex items-center">
          <svg
            className="icon mr-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20">
            <path
              d="M950.238554 836.217173c-40.186258-103.071494-108.157325-127.170354-162.897044-136.676869-45.675272-7.995091-90.363054-24.527626-110.522186-35.33681 0-47.343261-0.652869-62.574151-0.826831-73.02313 51.570539-61.052494 84.068697-144.510278 84.068697-219.309868 0-169.745009-83.45676-307.356157-249.843278-307.356157-166.268838 0-249.841232 137.612171-249.841232 307.356157 0 74.658374 32.0653 157.468404 83.033112 218.304981 0.091074 26.748201 0.13917 67.886133-0.390903 74.107835-20.277836 10.689457-64.789609 27.279297-110.428042 35.236526-54.738695 9.488095-122.710786 33.608445-162.874531 136.641053-6.811126 17.520025-4.386914 36.536125 6.674003 52.116985 41.2331 58.154491 258.555707 70.358441 433.57586 70.358441 175.042665 0 392.363226-12.20395 433.596326-70.338998C954.621375 872.697015 957.028191 853.699336 950.238554 836.217173zM315.697637 371.869472c0-138.89335 65.060785-251.474428 194.521299-251.474428 129.540332 0 194.541765 112.581078 194.541765 251.474428 0 113.52866-87.1028 251.470335-194.541765 251.470335C402.780994 623.339808 315.697637 485.961974 315.697637 371.869472zM509.967202 902.811894c-338.711282 0-385.163243-45.017286-386.67569-46.822398 31.16172-79.96217 77.945233-94.339622 119.389134-101.519138 48.938596-8.519024 100.143814-26.584472 127.639029-41.11542l27.243481-14.397918c0 0 0.805342-34.779108 1.322112-57.290821 33.523511 23.440875 71.331605 37.556361 111.334691 37.556361 39.753399 0 77.336366-13.994736 110.703311-37.236066 0.397043 22.526039 1.004887 56.520271 1.004887 56.520271l27.28032 14.612813c27.166733 14.554484 78.527494 32.714076 128.063701 41.3692 41.427528 7.196912 88.228437 21.577434 119.682823 101.403504C895.131469 857.815073 848.679507 902.811894 509.967202 902.811894z"
              fill="#808080"></path>
          </svg>
          <span>{currentUser?.username || '--'}</span>
        </div>
        <div className="w-full px-4 py-3 border-2 mb-4 rounded-md outline-none flex items-center">
          <svg
            className="icon mr-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20">
            <path
              d="M858.656 192 165.344 192C109.472 192 64 237.44 64 293.312l0 469.376C64 818.56 109.472 864 165.344 864l693.312 0C914.528 864 960 818.56 960 762.688L960 293.312C960 237.44 914.528 192 858.656 192zM858.656 800 165.344 800C144.736 800 128 783.264 128 762.688L128 293.312C128 272.736 144.736 256 165.344 256l684.544 0-307.488 279.808c-14.592 14.56-38.272 14.528-54.752-1.792l-244.256-206.752C229.856 315.84 209.664 317.504 198.272 331.008c-11.424 13.472-9.76 33.664 3.744 45.088l242.304 204.96c19.904 19.904 46.048 29.792 72.032 29.792 25.632 0 51.136-9.632 70.176-28.736L896 300.544l0 462.144C896 783.264 879.264 800 858.656 800z"
              fill="#5D646F"></path>
          </svg>
          <span>{currentUser?.email || '--'}</span>
        </div>
        <div className="w-full px-4 py-3 border-2 mb-4 rounded-md outline-none flex items-center">
          <svg
            className="icon mr-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20">
            <path
              d="M496.115756 914.261583m-39.980478 0a39.980478 39.980478 0 1 0 79.960956 0 39.980478 39.980478 0 1 0-79.960956 0Z"
              fill="#999999"></path>
            <path
              d="M845.94694 804.183332l-0.001-603.174481V80.460713c0-44.161437-35.79852-79.960957-79.960956-79.960957h-539.736457c-44.161437 0-79.960957 35.79952-79.960956 79.960957v70.57354h-0.001v49.975598h0.001v603.174481h-0.001v49.975598h0.001V944.039043c0 44.161437 35.79952 79.960957 79.960956 79.960957h539.736457c44.162436 0 79.960957-35.79952 79.960956-79.960957v-89.880113h0.001v-49.975598zM196.263168 80.460713c0-16.533927 13.451432-29.985359 29.985359-29.985359h539.736457c16.533927 0 29.985359 13.451432 29.985359 29.985359v70.57354h-599.707175V80.460713z m0 120.548138h599.707175v603.174481h-599.707175V201.008851z m599.707175 743.030192c0 16.533927-13.451432 29.985359-29.985359 29.985359h-539.736457c-16.533927 0-29.985359-13.451432-29.985359-29.985359v-89.880113h599.707175V944.039043z"
              fill="#999999"></path>
          </svg>
          <span>{currentUser?.phone || '--'}</span>
        </div>
        <button
          type="button"
          onClick={handleGoAdd}
          className="w-full py-4 font-semibold text-white transition-colors border-2 rounded-md bg-gray-400 hover:bg-gray-800 px-7 dark:bg-white dark:text-black ">
          Add new profile
        </button>
      </div>
    </div>
  );
}

export default ProfileDetail;
