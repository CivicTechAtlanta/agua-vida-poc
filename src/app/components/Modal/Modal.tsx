import { useState } from 'react';
import './Modal.scss';
import { IMAGES } from './Images'
import { useTranslation } from "react-i18next";

type ImageKey = 'CHLORINE_WEIGHT' // | 'NEXT_KEY_NAME' -  add more keys as they are created

type PageData = {
    headerText: string,
    modalText: string,
    imageKey: ImageKey | null,
}

type ModalPageData = {
    pages: PageData[]
}

type imageData = {
    data: string,
    height: number,
    width: number,
}

type ModalProps = {
    show: boolean,
    closeModal: () => void,
    modalPageData: ModalPageData,
}

export default function Modal(props: ModalProps) {

    const { t } = useTranslation();
    const { modalPageData, show, closeModal } = props;
    const { pages } = modalPageData;


    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex - 1);
    }
    // Add this before goToNext
    // This doesn't need to be placed here specifically, but I'm putting it where the placeholder is
    // The actual change will be in the className or style of the header element
    const goToNext = () => {
        setCurrentIndex(currentIndex + 1);
    }

    if (show) {
        return (
            <div className='modal'>
                <div className='modal-content' style={{ borderRadius: '8px' }}>
                    <div className='close-modal' onClick={closeModal} style={{ marginBottom: '15px' }}>X</div>

                    <p className='modal-header' style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '1.2em', marginBottom: '0' }}>{t(pages[currentIndex]?.headerText)}</p>

                    <div style={{ textAlign: 'left', marginBottom: '10px', fontSize: '0.9em', color: '#666' }}>
                        {currentIndex + 1} / {pages.length}
                    </div>

                    <div className="carousel">
                        {currentIndex !== 0 &&
                            <div className='btn-container prev' onClick={goToPrevious}>
                                <span className='btn-prev'>&lt;</span>
                            </div>
                        }

                        {(pages.length - 1) !== currentIndex &&
                            <div className='btn-container next' onClick={goToNext}>
                                <span className='btn-next'>&gt;</span>
                            </div>
                        }

                        {addImage()}

                        {addText()}
                    </div>
                </div >

                <div className='modal-backdrop'></div>
            </div >
        );
    } else {
        return ('');
    }

    function addImage() {
        const currentPage = pages[currentIndex];
        
        if (currentPage?.imageKey && currentPage.imageKey !== null) {
            const image = IMAGES[currentPage.imageKey];
            console.log('Image data', image);
            return (
                <div className="carousel-item image-item" style={{ textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
                    <img 
                        src={image.data} 
                        alt={`${t(currentPage.imageKey)}`} 
                        style={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                            marginLeft: '0',
                            marginRight: 'auto'
                        }}
                    />
                </div>
            );
        }

        return null;
    }


    function addText() {
        const currentPage = pages[currentIndex];
        
        if (currentPage?.modalText) {
            return <div className="carousel-item text-item" style={{ textAlign: 'left' }}>{(t(currentPage.modalText))}</div>;
        }

        return null;
    }
}