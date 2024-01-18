import PropTypes from 'prop-types';
import { images } from '../../constants/image.constant.js';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='login'>
        {children}
        <img className='w-100' src={images.VECTOR2_IMAGE} alt='Vector2' />
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
