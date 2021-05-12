/* eslint-disable */ //Sorry
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import styles from "./VideoPlayer.module.scss";

const VideoPlayer: React.FC<{ playbackId: string; display?: boolean }> = ({
    playbackId,
    display,
}) => {
    const src = `https://stream.mux.com/${playbackId}.m3u8`;
    const poster = `https://image.mux.com/${playbackId}/thumbnail.png`;

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!display) {
            video.controls = true;
        }

        let hls;

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // This will run in safari, where HLS is supported natively
            video.src = src;
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            console.error(
                "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API",
            );
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, videoRef]);

    return (
        <div className={styles.container}>
            {display ? (
                <video
                    className={styles.display}
                    autoPlay
                    loop
                    muted
                    ref={videoRef}
                    poster={poster}
                    playsInline
                />
            ) : (
                <video
                    autoPlay
                    loop
                    muted
                    ref={videoRef}
                    poster={poster}
                    playsInline
                />
            )}
        </div>
    );
};

export default VideoPlayer;
