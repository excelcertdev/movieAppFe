import { useEffect, useState } from "react";
import { images } from "../../constants/image.constant";
import EmptyList from "./EmptyList";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { deleteMovie, getMovieList } from "../../redux/slices/movieSlice";
import { useTranslation } from "react-i18next";

import { logout } from "../../redux/slices/userSlices";
import Loader from "../Loader/Loader";
import DeleteModal from "../Modal/DeleteModal";

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(2);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [selectedId, setSelectedId] = useState('')
  const userData = localStorage.getItem('userData')
  const movie = useSelector((state) => state.movie);

  let limit = 8;
  const { t } = useTranslation();

  useEffect(()=>{
    if(!userData){
      navigate('/')
    }
  },[userData])

  useEffect(() => {
    const movieObj = {
      limit,
      offset,
      query: search,
    };

    dispatch(getMovieList(movieObj))
      .then(() => setLoading(false)) // Set loading to false after receiving the response
      .catch(() => setLoading(false)); // Handle any errors and set loading to false
  }, [dispatch, limit, offset, (search.length > 3 || search.length === 0)]);

  useEffect(() => {
    if (movie && movie.movieList && movie.movieList.movies) {
      setMovieList(movie.movieList.movies);
      setPageCount(movie.movieList.pages);
    }
  }, [movie]);

  const handleAddMovie = () => {
    navigate("/createMovie");
  };

  const handlePageClick = (page) => {
    setOffset(page.selected + 1);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleUpdate = (id) => {
    navigate("/updateMovie/" + id);
  };

  const calculateMinHeight = (titleLength) => {
    return titleLength * 2 + 100; // Example formula: 20px per character plus 200px base height
  }

  const handleDelete = () => {
    let deleteObj = {
      movieId: movieId,
    };

    // Dispatch the deleteMovie action
    dispatch(deleteMovie(deleteObj))
      .then(() => {
        // After successful deletion, fetch the updated movie list
        const movieObj = {
          limit,
          offset: 1,
          query: search,
        };

        // Dispatch the getMovieList action
        dispatch(getMovieList(movieObj))
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      })
      .catch((error) => {
        // Handle deletion error if needed
        console.error("Error deleting movie:", error);
      });
  };

  const handleDotesClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (search.length > 0 || movieList.length) ? (
        <div className={`${movieList.length > 4 ? 'h-auto' : 'h-100vh'} container-lg p-5-md`} style={{height:"100vh"}}>
          <div className="d-flex justify-content-between align-items-center py-4">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <h2>{t("my-movies")}</h2>
              </div>
              <div onClick={handleAddMovie}>
                <img
                  src={images.GROUP24}
                  alt="images-group28"
                  className="addIcon"
                />
              </div>
            </div>
            <div className="d-flex align-items-center" onClick={handleLogout}>
              <div className="text-light px-2 text-center logout">
                {t("logout")}
              </div>
              <div>
                <img src={images.LOGOUT} alt="logout" className="logout-icon" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-lg-4 col-sm-3 col-md-3">
              <div className="input-group">
                <input
                  type="text"
                  className="custom-input-search text-light form-control"
                  style={{
                    backgroundColor: "#224957",
                    borderColor: "#224957",
                    border: "none",
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {movieList.map((data, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-6 mt-2"
              >
                <div
                  className="cards position-relative"
                  style={{ minHeight: calculateMinHeight(data.title.length) }}
                >
                  <div className="card-head text-center">
                    <img
                      src={data.poster}
                      alt="preview"
                      className="preview-image-list"
                    />
                    <div
                      className=" shadow rounded  text-white position-absolute end-0 top-0  flex flex-col z-50 "
                      style={{
                        backgroundColor: "#092C39",
                        marginRight: "10px",
                        marginTop: "28px",
                      }}
                     
                    >
                     { selectedId === data._id ? <>
                        <div
                          className="edit px-2 py-1"
                          onClick={() => handleUpdate(data._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </div>
                        <div
                          className="delete px-2 py-1 text-danger"
                          onClick={() => {
                            setMovieId(data._id);
                            setShow(!show);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </div>
                      </> : <></>}
                    </div>

                    <div
                      className="bg-dark position-absolute top-0 end-0  z-1 rounded-pill text-center text-light "
                      style={{ width: "26px", height: "26px" }}
                      onClick={() => handleDotesClick(data._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="px-2 mt-3">
                    <p className="text-light">{data.title}</p>
                    <p className="text-light">{data.publishingYear}</p>
                  </div>
                </div>
              </div>
            ))}
            <DeleteModal
              show={show}
              setShow={setShow}
              handleDelete={handleDelete}
            />
          </div>
          {pageCount > 1 && (
            <div className="w-100 py-4 mt-5">
              <ReactPaginate
                previousLabel={t("prev")}
                nextLabel={t("next")}
                pageClassName=" page rounded"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination d-flex justify-content-center align-items-center"
                activeClassName="pageActive rounded text-light"
                initialPage={0}
              />
            </div>
          )}
        </div>
      ) : (!loading && search.length === 0 && movieList.length === 0) ? (
        <EmptyList handleAddMovie={handleAddMovie} />
      ) : null}
    </>
  );
};

export default MovieList;
