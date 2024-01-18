import { t } from 'i18next';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const EmptyList = ({ handleAddMovie }) => {
    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row>
                <Col md={12} className="mx-auto">
                    <h2 className='text-light'>{t("your-movie-list-is-empty")}</h2>
                    <button className="custom-btn mt-3" type="submit" onClick={handleAddMovie}>
                        {t("add-new-movie")}
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

EmptyList.propTypes = {
    handleAddMovie: PropTypes.func.isRequired,
};

export default EmptyList;
