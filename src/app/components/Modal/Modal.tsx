import { useState } from 'react';
import './Modal.scss';
import { IMAGES } from './Images'

type ImageKey = 'CHLORINE_WEIGHT' // | 'NEXT_KEY_NAME' -  add more keys as they are created

type imageData = {
    data: string,
    height: number,
    width: number,
}

type ModalProps = {
    show: boolean,
    closeModal: () => void,
    headerText: string,
    imageKey: ImageKey,
}

export default function Modal(props: ModalProps) {
    const { headerText, imageKey, show, closeModal } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex - 1);
    }

    const goToNext = () => {
        setCurrentIndex(currentIndex + 1);
    }

    if (show) {
        return (
            <div className='modal'>
                <div className='modal-content'>
                    <div className='close-modal' onClick={closeModal}>X</div>

                    <p className='modal-header'>{headerText}</p>

                    <div className="carousel">
                        {currentIndex !== 0 &&
                            <div className='btn-container prev' onClick={goToPrevious}>
                                <span className='btn-prev'>&lt;</span>
                            </div>
                        }

                        {(IMAGES[imageKey].length - 1) !== currentIndex &&
                            <div className='btn-container next' onClick={goToNext}>
                                <span className='btn-next'>&gt;</span>
                            </div>
                        }

                        {addImage()}
                    </div>
                </div >

                <div className='modal-backdrop'></div>
            </div >
        );
    } else {
        return ('');
    }


    function addImage() {
        let image;

        IMAGES[imageKey].forEach((imageData: imageData, index: number) => {

            const imageStyles = {
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageData.data})`,
            }

            if (currentIndex === index) {
                image = <div className="carousel-item" style={imageStyles}></div>
            }
        });

        return image;

    }
}