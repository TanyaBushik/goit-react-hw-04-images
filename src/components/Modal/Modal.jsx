import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};
// export class Modal extends Component {
// componentDidMount() {
//   window.addEventListener('keydown', this.handleKeyDown);
// document.body.style.overflow = 'hidden';
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.handleKeyDown);
// document.body.style.overflow = 'auto';
// }

// handleKeyDown = event => {
//   if (event.code === 'Escape') {
//     this.props.onClose();
//   }
// };

// handleBackdropClick = event => {
//   if (event.currentTarget === event.target) {
//     this.props.onClose();
//   }
// };

// render() {
//   return createPortal(
//     <ModalBackdrop onClick={this.handleBackdropClick}>
//       <ModalContent>{this.props.children}</ModalContent>
//     </ModalBackdrop>,
//     modalRoot
//   );
// }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
