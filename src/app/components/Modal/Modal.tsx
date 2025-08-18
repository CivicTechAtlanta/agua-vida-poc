import { useEffect, useState } from 'react';
import './Modal.scss';
import { IMAGES } from './Images'
import { useTranslation } from "react-i18next";

type PageData = {
    imageKey: string | null;
    headerText: string;
    modalText?: string;
}

type IncludedPages = {
    pages : PageData[]
}

type ModalProps = {
    show: boolean,
    closeModal: () => void,
    modalPageData: IncludedPages,
}

export default function Modal(props: ModalProps) {

    const { t } = useTranslation();
    const { modalPageData, show, closeModal } = props;
    const { pages } = modalPageData;


    const [currentIndex, setCurrentIndex] = useState(0);
    const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

    // Helper to enforce black strokes inside SVG markup
    function ensureBlackStroke(svg: string): string {
        if (!svg || typeof svg !== 'string') return svg;
        // Replace explicit stroke attributes (avoid matching stroke-width)
        const replacedStrokes = svg.replace(/(\bstroke\s*=\s*")([^"]*)(")/gi, (m, p1, _p2, p3) => `${p1}black${p3}`);
        // Inject style to force stroke black (with !important) which overrides presentation attributes
        const injectedStyle = replacedStrokes.replace(/(<svg[^>]*>)/i, `$1<style>*{stroke:black !important;}</style>`);
        return injectedStyle;
    }

    // When the page/image changes, if the source is an SVG URL or inline SVG, produce white-stroked markup
    useEffect(() => {
        setSvgMarkup(null);
        const currentPage = pages[currentIndex];
        if (!currentPage?.imageKey) return;
    const image = IMAGES[currentPage.imageKey as keyof typeof IMAGES] as { data?: string | { src?: string } } | undefined;
        const data = image?.data;
        if (!data) return;

        // Normalize to a string URL or inline SVG string
        const srcOrString: string = typeof data === 'string' ? data : (data?.src ?? '');
        if (!srcOrString) return;

        const looksInlineSvg = srcOrString.trim().startsWith('<svg');
        if (looksInlineSvg) {
            setSvgMarkup(ensureBlackStroke(srcOrString));
            return;
        }
        const isSvgUrl = srcOrString.toLowerCase().endsWith('.svg');
        if (isSvgUrl) {
            // Fetch and inline to control stroke color
            fetch(srcOrString)
                .then(r => r.text())
                .then(markup => setSvgMarkup(ensureBlackStroke(markup)))
                .catch(() => setSvgMarkup(null));
        }
    }, [currentIndex, pages]);

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

                    <p className='modal-header' style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '1.2em', marginBottom: '0' }}>{t(pages[currentIndex]?.headerText || '')}</p>

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

            const image = IMAGES[currentPage.imageKey as keyof typeof IMAGES] as { data?: string | { src?: string } } | undefined;
            if (!image || !image.data) return null;
            const dataAny = image.data as string | { src?: string };
            const srcOrString: string = typeof dataAny === 'string' ? dataAny : (dataAny?.src ?? '');
            const isInlineSvg = typeof srcOrString === 'string' && srcOrString.trim().startsWith('<svg');

            return (
                <div className="carousel-item image-item" style={{ textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
                    {svgMarkup ? (
                        <div
                            aria-hidden
                            className="svg-circle"
                            dangerouslySetInnerHTML={{ __html: svgMarkup }}
                        />
                    ) : isInlineSvg ? (
                        <div
                            aria-hidden
                            className="svg-circle"
                            dangerouslySetInnerHTML={{ __html: srcOrString }}
                        />
                    ) : (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={srcOrString} 
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
                        </>
                    )}
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