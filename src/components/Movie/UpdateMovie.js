import { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById, updateMovie } from '../../redux/slices/movieSlice';
import { useNavigate, useParams } from 'react-router';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateMovie = () => {
    const [droppedImage, setDroppedImage] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { t } = useTranslation();

    const getMovie = useSelector((state) => state.movie)
    const [file, setFile] = useState(null)
    const [initialValues, setInitialValues] = useState({})

    const onDrop = useCallback(acceptedFiles => {
        // Handle the dropped files here
        const tempFile = acceptedFiles[0];
        if (tempFile.type.startsWith("image/")) {
            setFile(tempFile);
            setDroppedImage(URL.createObjectURL(tempFile));
          } else {
            toast.error("Invalid file type. Please select an image.", {
              position: "top-right",
            });
          }
    }, []);

    useEffect(() => {
        if (getMovie && getMovie.getMovieData && getMovie.getMovieData.data) {
            const tempobj = {
                movieId: id,
                title: getMovie.getMovieData.data.title || '',
                publishingYear: getMovie.getMovieData.data.publishingYear || ''
            };
            setInitialValues(tempobj);
            setFile(getMovie.getMovieData.data.poster)
        }
    }, [getMovie, id])

    useEffect(() => {
        if (id) {
            let obj = {
                movieId: id
            }
            dispatch(getMovieById(obj))
        }
    }, [dispatch, id])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    if(!Object.keys(initialValues).length){
        return (
            <Loader />
        )
    }

    return (
        <>
        <ToastContainer />
        <div className='top-container container py-5'>
            <h2>{t('edit')}</h2>
            <div className='inner-div py-5'>
                < div className='w-100'>
                    <div className='insert-image' {...getRootProps()}>
                        {droppedImage ? (
                            <img src={droppedImage} alt='dropped' className='preview-image'
                            />
                        ) : (
                            <img src={file} alt='drop' className='preview-image text-light' />
                        )}
                        <input {...getInputProps()} accept="image/*"/>
                        {/* <p className='text-light' >Drop the image here</p> */}
                    </div>
                </div>
                <div className='w-100'>
                    <Formik
                        initialValues={initialValues}
                        validate={(values) => {
                            const errors = {};
                            if (!values.title) {
                                errors.title = 'Title is Required';
                            }

                            if (!values.publishingYear) {
                                errors.publishingYear = 'Publishing Year is Required';
                            } else if (!/^\d+$/.test(values.publishingYear)) {
                                errors.publishingYear = 'Publishing Year must be a number';
                            }

                            return errors;
                        }}
                        onSubmit={async (values) => {
                            values.movieId = id
                            const formData = new FormData();
                            Object.keys(values).forEach((key) => {
                                if (key !== 'file') {
                                    formData.append(key, values[key]);
                                }
                            });

                            if (droppedImage) {
                                formData.append('file', file);
                            }
                            // Append the file to FormData
                            //   formData.append('file', file);
                            await dispatch(updateMovie(formData))
                            navigate('/movieList')
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Title" className='mb-4'>
                                    <Form.Control onChange={handleChange} name='title' value={values.title} type="text" placeholder={t('Title')} className='custom-input text-light' style={{ backgroundColor: '#224957', borderColor: '#224957' }} />
                                </Form.Group>

                                <Form.Group controlId="year" className='mb-3 custom-width-216'>
                                    <input type="text" onChange={handleChange} name="publishingYear" value={values.publishingYear} placeholder={t("publishing-year")} className='text-light custom-width-216-input ' />
                                </Form.Group>

                                <div className='d-flex justify-content-center align-items-center mt-5 inner2-div'>
                                    <button
                                        className="custom-btn"
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#FFFFFF',
                                            border: '1px solid #FFFFFF',
                                            marginRight: '10px',
                                        }}
                                    >
                                        {t('cancel')}
                                    </button>
                                    <button
                                        className="custom-btn"
                                        type="submit"
                                    >
                                        {t('update')}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>
        </>
     
    );
};

export default UpdateMovie;