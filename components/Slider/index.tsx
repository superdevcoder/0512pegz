import Link from "next/link";
import { Slide } from "../../types";
import styles from "./Slider.module.scss";

const Slider: React.FC<{ slides: Slide[] }> = ({ slides }) => {
    if (!slides.length) {
        return null;
    }

    const slide = slides[0];
    return (
        <div className={styles.sliderContainer}>
            <Link href={`${slide.url}`}>
                <a>
                    <div className={styles.slider}>
                        <div
                            className={styles.bg}
                            style={{
                                backgroundImage: `url(${slide.imageUrl})`,
                            }}
                        />
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default Slider;
